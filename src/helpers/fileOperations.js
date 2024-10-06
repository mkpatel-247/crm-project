import fs from "fs";

/**
 * Returns the data from file.
 * @returns
 */
export default function getDataFromFile(filePath) {
    const bufferData = fs.readFileSync(filePath);
    const data = JSON.parse(bufferData.toString());
    return data;
}

// module.exports = { getDataFromFile }