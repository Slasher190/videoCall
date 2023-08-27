import express from "express";
import { register, login, record } from "../controller/userController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/record").post(isAuthenticatedUser, record);

export default router;
