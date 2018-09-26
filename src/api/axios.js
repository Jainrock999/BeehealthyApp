import { URLS } from "./urls";
import Axios from "axios";
export const axios = Axios.create({
    baseURL: URLS.BASE_URL,
});