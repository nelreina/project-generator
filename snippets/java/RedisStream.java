package tech.nelreina;

import java.net.InetAddress;
import java.util.List;
import java.util.Map;

import org.apache.camel.CamelContext;
import org.apache.camel.EndpointInject;
import org.apache.camel.ProducerTemplate;
import org.apache.camel.builder.RouteBuilder;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import io.lettuce.core.Consumer;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.StreamMessage;
import io.lettuce.core.XReadArgs;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.api.sync.RedisCommands;
import io.quarkus.logging.Log;
import io.quarkus.runtime.Shutdown;
import io.quarkus.runtime.Startup;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class RedisStream extends RouteBuilder {
  private StatefulRedisConnection<String, String> connection;
  private RedisCommands<String, String> redisCommands;

  private String routeNameStream = "redis-stream-scheduler";

  public final String ROUTE_PROCESS_EVENT = "redis-stream-process-event";

  // #######################################################################
  // Configuration properties
  // #######################################################################

  @ConfigProperty(name = "redis.host")
  String redisHost;

  @ConfigProperty(name = "stream")
  String STREAM_NAME;

  @ConfigProperty(name = "service_name")
  String GROUP_NAME;

  @ConfigProperty(name = "rsc.events")
  String RCV_EVENTS;

  // #######################################################################
  // Injected properties
  // #######################################################################

  @Inject
  CamelContext camelContext;

  @EndpointInject("direct:" + ROUTE_PROCESS_EVENT)
  ProducerTemplate producerTemplate;

  // #######################################################################
  // Public methods
  // #######################################################################

  public record StreamEvent(
      String streamId,
      String event,
      String aggregateId,
      long timestamp,
      String payload

  ) {
  }

  @Override
  public void configure() throws Exception {

    // Mi ta kuminsa ariba di un timer
    from("scheduler:" + routeNameStream + "?delay=10")
        .routeId(routeNameStream)
        .autoStartup(false)
        .process(
            exchange -> {
              int size = consume();
              exchange.getMessage().setBody(size);
            })
        .filter().simple("${body} > 1")
        .log("Handled ${body} messages");
  }

  @Startup
  public void init() {
    Log.info("##### Init Redis Stream Consumer : " + redisHost);
    boolean connectedToRedis = connect();
    if (connectedToRedis) {
      Log.info("Connected to Redis");
      Log.info("Watching for events: " + RCV_EVENTS);
      try {
        camelContext.getRouteController().startRoute(routeNameStream);
      } catch (Exception e) {
        Log.error("Error starting timer route");
      }
    } else {
      Log.error("Error connecting to Redis");
      // Exit the application
    }

  }

  @Shutdown
  public void shutdown() {
    Log.info("##### Closing Redis Stream Consumer connection : " + redisHost);
    // running = false;
    connection.close();
  }

  public void acknowledgeMessage(String streamId) {
    redisCommands.xack(STREAM_NAME, GROUP_NAME, streamId);
  }

  public void produceMessage(String event, String aggregateId, String payload) {
    StreamEvent streamEvent = new StreamEvent(null, event, aggregateId, System.currentTimeMillis(), payload);
    Map<String, String> message = mapFromStreamEvent(streamEvent);
    redisCommands.xadd(STREAM_NAME, message);
    // redisCommands.xadd(STREAM_NAME, message);
  }

  // #######################################################################
  // Private methods
  // #######################################################################
  private int consume() {
    try {
      InetAddress localHost = InetAddress.getLocalHost();

      @SuppressWarnings("unchecked")
      List<StreamMessage<String, String>> messages = redisCommands.xreadgroup(
          Consumer.from(GROUP_NAME, localHost.getHostName()),
          XReadArgs.StreamOffset.from(STREAM_NAME, ">"));

      if (!messages.isEmpty()) {
        for (StreamMessage<String, String> message : messages) {
          // Log count message
          // Log.info("Message count: " + messages.size());
          // System.out.println(message);
          Map<String, String> field = message.getBody();
          StreamEvent streamEvent = mapToStreamEvent(field, message.getId());
          // Check if the event is one of the events we are interested in
          if (!RCV_EVENTS.contains(streamEvent.event())) {
            // Log.info("Skipping event: " + streamEvent.event());
            acknowledgeMessage(message.getId());
            continue;
          }
          producerTemplate.sendBody(streamEvent);

        }
      }

      return messages.size();
    } catch (Exception e) {
      Log.error("Error processing stream events", e);
      return -1;
    }

  }

  private void ensureConsumerGroupAndStream() {

    // Check if stream key exists
    boolean streamKeyExists = redisCommands.exists(STREAM_NAME) == 1;

    if (!streamKeyExists) {
      // Create the stream key if it doesn't exist
      // throw an error
      throw new RuntimeException("Stream key: \" " + STREAM_NAME + "\" does not exist!  ");
    }
    try {
      redisCommands.xgroupCreate(XReadArgs.StreamOffset.from(STREAM_NAME, "0-0"), GROUP_NAME);

    } catch (Exception e) {
      Log.info("Group already exists");
    }
  }

  private StreamEvent mapToStreamEvent(Map<String, String> field, String streamId) {
    StreamEvent streamEvent = new StreamEvent(streamId, field.get("event"), field.get("aggregateId"),
        System.currentTimeMillis(), field.get("payload"));

    return streamEvent;
  }

  private Map<String, String> mapFromStreamEvent(StreamEvent streamEvent) {
    return Map.of("event", streamEvent.event(), "aggregateId", streamEvent.aggregateId(),
        "timestamp", String.valueOf(streamEvent.timestamp()), "payload", streamEvent.payload());
  }

  private boolean connect() {
    // Consume from Redis Stream
    Log.info("Connecting to Redis : " + redisHost);
    try {
      RedisClient redisClient = RedisClient.create(
          RedisURI.builder()
              .withHost(redisHost) // Provide your Redis server details
              .withPort(6379)
              .build());

      // Create connection
      connection = redisClient.connect();

      // Create Redis commands
      redisCommands = connection.sync();
      ensureConsumerGroupAndStream();
      return true;

    } catch (Exception e) {
      Log.error("Error connecting to Redis : " + e.getMessage());
      return false;
    }

  }

}
