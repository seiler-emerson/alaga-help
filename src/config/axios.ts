import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_APP_URL + "/api";


export const api = axios.create({
  baseURL,
});