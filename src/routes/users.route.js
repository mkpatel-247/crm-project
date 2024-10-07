import Router from "router";
import {
    addUser,
    deleteUser,
    getUsers,
    updateUser,
} from "../controllers/users.js";
import { userMessages } from "../messages/user.message.js";

const router = Router();

/**
 * Get all user list.
 */
router.get("/", (req, res, next) => {
    try {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(
            JSON.stringify({
                status: 200,
                message: userMessages.U06,
                data: getUsers(),
            })
        );
    } catch (error) {
        return next(new Error(error.message));
    }
});

/**
 * Add user route.
 */
router.post("/add-user", (req, res, next) => {
    try {
        const { message, status, statusCode } = addUser(req.body);
        if (!status) {
            res.statusCode = statusCode;
            throw new Error(message);
        }
        res.setHeader("Content-Type", "application/json");
        return res.end(
            JSON.stringify({
                status: statusCode,
                message: message,
            })
        );
    } catch (error) {
        return next(new Error(error.message));
    }
});

/**
 * Update user detail route.
 */
router.put("/update-user/:id", (req, res, next) => {
    try {
        const { id } = req.params;
        if (id && req.body) {
            const { status, message, statusCode } = updateUser(req.body, id);
            if (!status) {
                res.statusCode = statusCode;
                throw new Error(message);
            }
            res.setHeader("Content-Type", "application/json");
            return res.end(
                JSON.stringify({
                    status: statusCode,
                    message: message,
                })
            );
        }
        throw new Error(userMessages.U09);
    } catch (error) {
        return next(new Error(error.message));
    }
});

/**
 * Delete user api route.
 */
router.delete("/delete-user/:id", (req, res, next) => {
    try {
        const { id } = req.params;
        if (id) {
            const { status, message, statusCode } = deleteUser(id);
            if (!status) {
                res.statusCode = statusCode;
                throw new Error(message);
            }
            res.writeHead(statusCode, { "Content-Type": "application/json" });
            return res.end(
                JSON.stringify({
                    status: statusCode,
                    message: message,
                })
            );
        }
        throw new Error(userMessages.U09);
    } catch (error) {
        return next(new Error(error.message));
    }
});

export default router;
