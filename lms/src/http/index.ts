import axios from "axios";

// point to be NOTED:  we just create a instance of axios which is here is API
const API = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default API;
