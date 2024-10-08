import Router from "router";
import userRouter from "./users.route.js";

const router = Router();

const routes = [
    {
        path: "/user",
        route: userRouter,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
