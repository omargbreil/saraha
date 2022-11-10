import { Router } from "express";
import { validation } from "../../middleware/validation.js";
import { signUpSchema } from "./auth.validation.js";
import * as controller from "./controller/auth.controller.js"

export const authRouter = Router();

authRouter.post("/signup", validation(signUpSchema) ,controller.signup);
authRouter.post("/signin" , controller.signin);
authRouter.get("/confirmemail/:token" ,controller.confirmEmail);
authRouter.get("/refreshtoken/:token" ,controller.refreshToken);
authRouter.patch("/sendcode" , controller.sendCode);
authRouter.patch("/forgetpassword" , controller.forgetPassword);

