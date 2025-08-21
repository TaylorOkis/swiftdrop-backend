import { Router } from "express";
import { AuthController } from "./auth.controller.js";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/login", authController.login);
authRouter.get("/logout", authController.logOut);

export default authRouter;
