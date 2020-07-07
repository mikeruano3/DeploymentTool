import axios from "axios";
import authHeader from "./auth-header";
import httpcommon from "./http-common";

export default class dataService {
    constructor(tablename) {
        this.API_URL = `${httpcommon.baseURL}/api/${tablename}`;
    }

    findOne = query => {
        return axios.post(this.API_URL+`/findone`, query, { headers: authHeader() });
    };
      
    findMany = query => {
        return axios.post(this.API_URL+`/findmany`, query, { headers: authHeader() });
    };
      
    insertOne = data => {
        return axios.post(this.API_URL+`/`, data, { headers: authHeader() });
    };
    
    getOrdered = (orderby) => {
        return axios.get(this.API_URL+`/orderby/${orderby}`, { headers: authHeader() });
    };
    
    getAll = () => {
        return axios.get(this.API_URL+`/`, { headers: authHeader() });
    };
    
    update = (query, data) => {
        let queryAndData = { query: query, data: data }
        return axios.put(this.API_URL+`/`, queryAndData, { headers: authHeader() });
    };
      
    remove = query => {
        return axios.delete(this.API_URL+`/`, { headers: authHeader(), data: query});
    };
}
    
// return http.get(`/tutorials?title=${title}`);

/*
export default {
    setTable
};
*/