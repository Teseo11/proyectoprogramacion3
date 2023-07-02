import axios from "./axios";

export const getEntitiesRequest = (route) => axios.get(`${route}`);

export const getEntityRequest = (route, id) => axios.get(`${route}${id}`);

export const createEntityRequest = (route, element) =>
  axios.post(`${route}`, element);

export const updateEntityRequest = (route, element) =>
  axios.patch(`${route}`, element);

export const deleteEntityRequest = (route, id) => axios.delete(`${route}${id}`);
