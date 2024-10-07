import path from "path";
import fs from "fs";
import getDataFromFile from "../utils/fileOperations.js";
import apiResponse from "../utils/apiResponse.js";
import { userMessages } from "../messages/user.message.js";
import { v4 as uuidV4 } from "uuid";
import { findIndexAndDetails } from "../utils/commonFunction.js";

const file = path.join("data", "user-data.json");
const userData = getDataFromFile(file);

/**
 * Get all user expect deleted.
 */
export const getUsers = () => {
    return userData.filter((element) => !element?.deleted);
};

/**
 * Add user controller.
 */
export const addUser = (body) => {
    const { phoneNumber, status, name, username, password, ...rest } = body;
    if (
        Object.keys(rest).length ||
        !phoneNumber ||
        !status ||
        !name ||
        !username ||
        !password
    ) {
        return apiResponse(userMessages.U03, false, 400);
    }

    const duplicate = userData.find((element) => {
        return (
            element.username == username || element.phoneNumber == phoneNumber
        );
    });
    if (duplicate) {
        return apiResponse(userMessages.U07, false, 400);
    }
    body["id"] = uuidV4();

    userData.push(body);
    fs.writeFileSync(file, JSON.stringify(userData));
    return apiResponse(userMessages.U01, true, 201);
};

/**
 * Update user controller.
 */
export const updateUser = (newData, id) => {
    const { phoneNumber, status, name, username, password, ...rest } = newData;
    if (
        Object.keys(rest).length ||
        !phoneNumber ||
        !status ||
        !name ||
        !username ||
        !password
    ) {
        return apiResponse(userMessages.U03, false, 400);
    }

    const duplicate = userData.find((element) => {
        return (
            element.id != id &&
            (element.username == username || element.phoneNumber == phoneNumber)
        );
    });
    if (duplicate) {
        return apiResponse(userMessages.U07, false, 400);
    }
    newData["id"] = id;
    const index = findIndexAndDetails(userData, id).index;
    userData[index] = newData;
    fs.writeFileSync(file, JSON.stringify(userData));
    return apiResponse(userMessages.U04, true, 200);
};

/**
 * Delete user controller.
 */
export const deleteUser = (id) => {
    const { index, detail } = findIndexAndDetails(userData, id).index;
    if (index >= 0 && Object.keys(detail).length) {
        userData[index] = { ...detail, deleted: true };
        fs.writeFileSync(file, JSON.stringify(userData));
        return apiResponse(userMessages.U08, true, 200);
    }
    return apiResponse(userMessages.U02, false, 400);
};
