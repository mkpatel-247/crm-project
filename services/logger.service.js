import fs from "fs";
import moment from "moment/moment.js";
import path from "path";

export const loggerService = (req) => {
    if (!fs.existsSync("logs")) {
        fs.mkdir("logs", (err) => {
            if (err) {
                console.log("exists error :>> ", err);
            }
        });
    }
    const log = `${moment(Date.now()).format("DD/MM/YYYY HH:mm")}: Request ${
        req.method
    } ${req.url}.\n`;

    const dirName = moment(Date.now()).format("DD-MM-YYYY") + "/";
    const dirPath = path.join("logs", dirName);

    if (fs.existsSync(dirPath)) {
        fs.appendFile(`${dirPath}/logs.txt`, log, (err) => {
            if (err) console.log("append error :>> ", err);
            console.log(`Request ${req.method} ${req.url}`);
        });
    } else {
        fs.mkdir(`${dirPath}`, (err) => {
            if (err) {
                console.log("mkdir error :>> ", err);
            } else {
                fs.writeFile(`${dirPath}/logs.txt`, log, (err) => {
                    if (err) console.log("2. Error :>> ", err);
                });
            }
        });
    }
};
