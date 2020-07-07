import configs from "../config.json";

export default {
  baseURL: `${configs.BACKEND_HOST}:${configs.BACKEND_PORT}`,
  headers: {
    "Content-type": "application/json"
  }
};
