import http from "http";
import Router from "router";
import bodyParser from "body-parser";
import mainRoutes from "./routes/main.routes.js";
import { loggerService } from "./services/logger.service.js";
const router = Router();
const port = 9000;

router.use(bodyParser.json());
router.use("/", mainRoutes);

/**
 * Server.
 */
http.createServer((req, res) => {
    loggerService(req);
    router(req, res, () => {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                status: 400,
                message: "Please check api route.",
            })
        );
    });
}).listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

/**
 * Error Handling
 */
router.use((error, req, res, next) => {
    res.writeHead(res.statusCode, { "Content-Type": "application/json" });
    return res.end(
        JSON.stringify({ status: res.statusCode, message: error.message })
    );
});