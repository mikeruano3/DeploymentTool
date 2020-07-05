import axios from "axios";
import httpcommon from "./http-common"

const API_URL = `${httpcommon.baseURL}/api/auth/`;

/*const register = async(username, password) => {
  return axios.post(API_URL + "signup", {
    username,
    password,
  });
};*/

const login = async(username, password) => {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.status === "true") {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }
        return response.data;
      }).catch(e => {
        console.log(e);
      });
};
  
const logout = async() => {
    localStorage.removeItem("user");
};
  
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};
  
export default {
    login,
    logout,
    getCurrentUser,
};