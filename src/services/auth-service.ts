import axios from "axios";
import { LogInModel } from "../models/auth";
import { localhost } from "./user-service";

export const loginService = async (data: LogInModel) => {
    const response = await axios.post(localhost + "/login", data);
    return response
};
