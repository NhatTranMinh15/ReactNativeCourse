import axios from "axios";
import { LogInModel } from "../models/AuthModel";
import { localhost } from "./UserService";

export const loginService = async (data: LogInModel) => {
    const response = await axios.post(localhost + "/login", data);
    return response
};
