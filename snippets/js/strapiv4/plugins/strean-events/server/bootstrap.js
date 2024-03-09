"use strict";

const eventStream = require("./config/event-stream");

module.exports = async ({ strapi }) => {
  strapi.log.info("Starting event stream");
  await eventStream().init();
};
