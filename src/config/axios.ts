import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SITE_URL + "/";


export const api = axios.create({
  baseURL,
});