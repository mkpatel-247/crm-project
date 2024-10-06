import path from "path";
import fs from "fs";
import getDataFromFile from "../helpers/fileOperations.js";
import apiResponse from "../helpers/fileOperations.js";
// import v4 from "uuid";

export const getUsers = () => {
    const file = path.join("data", "user-data.json");
    const users = helpers.getDataFromFile(file);
    return users;
}

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
        return apiResponse("Please check the field!", false, 400);
    }

    const file = path.join("data", "user-data.json");
    const userData = helpers.getDataFromFile(file);
    const duplicate = userData.find((element) => {
        return element.username == username || element.phoneNumber == phoneNumber;
    });
    if (duplicate) {
        return apiResponse("Duplicate record found!", false, 400);
    }
    body["id"] = uuid.v4();

    userData.push(body);
    fs.writeFileSync(file, JSON.stringify(userData));
}