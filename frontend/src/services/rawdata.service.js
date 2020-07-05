import axios from "axios";
import authHeader from "./auth-header";
import httpcommon from "./http-common";

let API_URL;

const setTable = tablename => {
    API_URL = `${httpcommon.baseURL}/api/data/${tablename}`
} 

const findOne = query => {
    return axios.post(API_URL+`/findone`, query, { headers: authHeader() });
};
  
const findMany = query => {
    return axios.post(API_URL+`/findmany`, query, { headers: authHeader() });
};
  
const insertOne = data => {
    return axios.post(API_URL+`/`, data, { headers: authHeader() });
};

const getOrdered = (orderby) => {
    return axios.get(API_URL+`/orderby/${orderby}`, { headers: authHeader() });
};

const getAll = () => {
    return axios.get(API_URL+`/`, { headers: authHeader() });
};

const update = (queryAndData) => {
    return axios.put(API_URL+`/`, queryAndData, { headers: authHeader() });
};
  
const remove = query => {
    return axios.delete(API_URL+`/`, { headers: authHeader(), data: query});
};
    
// return http.get(`/tutorials?title=${title}`);
  
export default {
    setTable,
    getAll,
    findOne,
    findMany,
    update,
    remove,
    insertOne,
    getOrdered
};