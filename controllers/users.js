const path = require("path");
const helpers = require("../helpers/fileOperations");
const api = require("../helpers/apiResponse");

const getUsers = () => {
    const file = path.join("data", "user-data.json");
    const users = helpers.getDataFromFile(file);
    return users;
}

const addUser = (body) => {
    const { phoneNumber, status, name, username, password, ...rest } = body;
    if (
        !Object.keys(rest).length ||
        !phoneNumber ||
        !status ||
        !name ||
        !username ||
        !password
    ) {
        return api.apiResponse("Please check the field!", false, 400);
    }

    const file = path.join("data", "user-data.json");
    const userData = getDataFromFile(file);
    const duplicate = userData.find((element) => {
        return element.username == username || element.phoneNumber == phoneNumber;
    });
    if (duplicate) {
        return api.apiResponse("Duplicate record found!", false, 400);
    }
    body["id"] = uuid.v4();

    userData.push(body);
    fs.writeFileSync(file, JSON.stringify(userData));
}



module.exports = { getUsers, addUser }