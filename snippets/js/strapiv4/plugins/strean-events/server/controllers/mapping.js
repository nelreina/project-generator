"use strict";

module.exports = ({ strapi }) => ({
  async getAll(ctx) {
    return await strapi
      .plugin("strean-events")
      .service("mapping")
      .getAll(ctx.query);
  },
  async add(ctx) {
    const data = ctx.request.body;
    return await strapi.plugin("strean-events").service("mapping").add(data);
  },
  async edit(ctx) {
    const id = ctx.params.id;
    const data = ctx.request.body;
    return await strapi
      .plugin("strean-events")
      .service("mapping")
      .edit(id, data);
  },
  async delete(ctx) {
    const id = ctx.params.id;
    return await strapi.plugin("strean-events").service("mapping").delete(id);
  },
});
