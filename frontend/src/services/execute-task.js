import axios from "axios";
import authHeader from "./auth-header";
import httpcommon from "./http-common"

const API_URL = httpcommon.baseURL;

const handleRequest = async(request_type, request_url, request_body_param) => {
    let request_body = request_body_param;
    if(request_body_param !== ""){
        request_body = JSON.parse(request_body_param);
    }
    if(request_type === "POST"){
        return axios.post(API_URL + request_url, 
            request_body, 
            { headers: authHeader() })
        .then((response) => {
            return response.data;
         }).catch(e => {
            return { status: "false", message : e.message, data: e.data }
        });
    }else if (request_type === "GET"){
        return axios.get(API_URL + request_url, 
            { headers: authHeader() })
        .then((response) => {
            return response.data;
         }).catch(e => {
            return { status: "false", message : e.message, data: e.data }
        });
    }
    return { status: "false", message : "Request type unknown", data: request_type }
};

export default handleRequest;