import { userMon } from "../models/user.js";
import createHttpError from 'http-errors';
import bcrypt from "bcrypt";

export async function registerUser(payload) {
    const user = await userMon.findOne({ email: payload.email });
    
    if (user !== null) {
        throw createHttpError(409, "Email in use");
    }

    payload.password = await bcrypt.hash(payload.password, 10);

    return userMon.create(payload);
}


export async function loginUser(email, password) {
    const user = await userMon.findOne({ email });
    
    if (user === null) {
        throw createHttpError(401, "Email or password is incorrect");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch !== true) {
    throw createHttpError(401, "Email or password is incorrect");
}

}