import axios from "axios";
require('dotenv').config();

export default axios.create({
  baseURL: `http://localhost:${process.env.BACKEND_PORT}/`,
  headers: {
    "Content-type": "application/json"
  }
});