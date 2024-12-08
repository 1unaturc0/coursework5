import axios from "./axios";

export const register = async data => axios.post("/clients", data);

export const login = async data => axios.post("/clients/login", data);
