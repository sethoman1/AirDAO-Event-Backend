import { Router } from "express";
import user from "../../middlewares/user.middleware";
import { getLoggedInUser } from "./users.controller";

const usersRouter = Router();
usersRouter.get('/loggedin-user', user, getLoggedInUser)
export default usersRouter