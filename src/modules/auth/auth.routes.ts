import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { authenticateUser } from "@/core/middlewares/auth.middleware.js";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/login", authController.login);
authRouter.get("/logout", authenticateUser, authController.logOut);

export default authRouter;
