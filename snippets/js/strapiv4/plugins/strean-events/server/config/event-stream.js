"use strict";

const {
  newEventStreamService: EventStream,
} = require("@nelreina/redis-stream-consumer-commonjs");

const { client } = require("./redis");

const STREAM = process.env["STREAM"];
const SNAME = process.env["SERVICE_NAME"];

module.exports = () => {
  const stream = {};
  let mapping = [];

  const createHandler = (mapping) => async (streamData) => {
    const { streamId, event, ack } = streamData;
    strapi.log.info(JSON.stringify({ SNAME, event }));
    let ok = false;
    mapping.forEach(async (m) => {
      try {
        if (m.event === event) {
          ok = await strapi.services[m.service][m.method](streamData);
          if (ok) {
            await ack(streamId);
          }
        }
      } catch (error) {
        strapi.log.error(error.message);
      }
    });
  };

  stream.init = async () => {
    try {
      // get Events Mapping
      mapping = await strapi.entityService.findMany(
        "plugin::strean-events.mapping"
      );
      const EVENTS = mapping.map((e) => e.event); // All events

      if (!client.isOpen) await client.connect();
      if (client.isOpen) {
        strapi.log.info("Successfully connected to redis");
        const msg = await EventStream(
          client,
          STREAM,
          SNAME,
          EVENTS,
          createHandler(mapping),
          "$"
        );
        strapi.log.info(msg);
      } else {
        strapi.log.error("Could not connect to Redis client!");
      }
    } catch (error) {
      strapi.log.error(error.message);
    }
  };

  return stream;
};
