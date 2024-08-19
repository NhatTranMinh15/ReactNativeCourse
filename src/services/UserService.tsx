import axios from "axios";
import { getValueFor } from "./ApiService";
import * as SQLite from 'expo-sqlite';
import { LoginResponseUserModel } from "../models/AuthModel";
import { ToastAndroid } from "react-native";
import { UserUpdateModel } from "../models/UserModel";

export const localhost = "http://10.0.2.2:3000"
export const getUserUrl = () => localhost + "/user/";
export const getAllUserUrl = () => localhost + "/user/all";

export const UserFetcher = async (url: string) => {
    const token = await getValueFor("token");
    const response = await axios.get(url, {
        headers: {
            Authorization: "Bearer " + token
        }
    });
    const user = await response.data.data;
    return user;
}

export const updateUser = async (body: UserUpdateModel) => {
    const token = await getValueFor("token");
    await axios.patch(localhost + "/user/", body, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
};

export const saveUserProfile = async (user: LoginResponseUserModel) => {
    const db = await SQLite.openDatabaseAsync('UserProfile.db');
    const firstRow = await db.getFirstAsync('SELECT * FROM Users WHERE id = ?', user.id);
    if (firstRow === null) {
        const result = await db.runAsync('INSERT INTO Users (id, username, email, firstName, lastName, age, role) VALUES (?, ?, ?, ?, ?, ?, ?)', user.id, user.username, user.email, user.firstName, user.lastName, user.age, user.role);
        console.log("SaveResult ", result);
        ToastAndroid.show("Save User Profile to Local Storage", ToastAndroid.SHORT);
    } else {
        const result = await db.runAsync('UPDATE Users SET username = ?, email = ?, firstName = ?, lastName = ?, age = ?, role = ? WHERE id = ?', user.username, user.email, user.firstName, user.lastName, user.age, user.role, user.id);
        console.log("SaveResult ", result);
        ToastAndroid.show("update Local User Profile", ToastAndroid.SHORT);
    }
    await db.closeAsync()
};
