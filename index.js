const http = require("http");
const router = require("router")();
const bodyParser = require("body-parser");
const port = 9000;

const userControllers = require("./controllers/users");

router.use(bodyParser.json());

router.get("/users", (req, res, next) => {
    try {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(
            JSON.stringify({
                status: 200,
                message: "Cart Details",
                data: userControllers.getUsers(),
            })
        );
    } catch (error) {
        return next(new Error(error.message));
    }
})

router.post("/add-user", (req, res) => {
    try {
        const { message, status, code } = userControllers.addUser(req.body);
        if (!status) {
            res.statusCode = code;
            throw new Error(message);
        }
        res.setHeader("Content-Type", "application/json");
        return res.end(
            JSON.stringify({
                status: code,
                message: message,
            })
        );
    } catch (error) {
        return next(new Error(error.message));
    }
})

http.createServer((req, res) => {
    router(req, res, () => {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                status: 400,
                message: "Please check api route.",
            })
        );
    })
}).listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

/**
 * Error Handling
 */
router.use((error, req, res, next) => {
    response.writeHead(res.statusCode, { "Content-Type": "application/json" });
    return res.end(
        JSON.stringify({ status: res.statusCode, message: error.message })
    );
});