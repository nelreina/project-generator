module.exports = [
  {
    method: "GET",
    path: "/mapping",
    handler: "mapping.getAll",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/mapping",
    handler: "mapping.add",
    config: {
      policies: [],
    },
  },
  {
    method: "PUT",
    path: "/mapping/:id",
    handler: "mapping.edit",
    config: {
      policies: [],
    },
  },
  {
    method: "DELETE",
    path: "/mapping/:id",
    handler: "mapping.delete",
    config: {
      policies: [],
    },
  },
];
