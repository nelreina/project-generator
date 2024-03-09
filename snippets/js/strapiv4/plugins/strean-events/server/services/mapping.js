"use strict";

module.exports = ({ strapi }) => ({
  getAll: async (query) =>
    await strapi.entityService.findMany("plugin::strean-events.mapping", query),
  add: async (data) => {
    return await strapi.entityService.create(
      "plugin::strean-events.mapping",
      data
    );
  },
  edit: async (id, data) => {
    return await strapi.entityService.update(
      "plugin::strean-events.mapping",
      id,
      data
    );
  },
  delete: async (id) => {
    return await strapi.entityService.delete(
      "plugin::strean-events.mapping",
      id
    );
  },
});
