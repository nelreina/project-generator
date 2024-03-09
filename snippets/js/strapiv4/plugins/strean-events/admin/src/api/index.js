import { request } from "@strapi/helper-plugin";

const pluginId = "strean-events";

export const getAllMapping = async () => {
  return await request(`/${pluginId}/mapping`, {
    method: "GET",
  });
};

export const addMapping = async (data) => {
  return await request(`/${pluginId}/mapping`, {
    method: "POST",
    body: { data },
  });
};
export const editMapping = async (id, data) => {
  return await request(`/${pluginId}/mapping/${id}`, {
    method: "PUT",
    body: { data },
  });
};
export const deleteMapping = async (id) => {
  return await request(`/${pluginId}/mapping/${id}`, {
    method: "DELETE",
  });
};
