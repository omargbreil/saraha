import { Router } from "express";
import { auth } from "../../middleware/auth.middleware.js";
import * as controller from "./controller/user.controller.js";
import {validation} from "../../middleware/validation.js"
import { updatePasswordSchema } from "./user.validation.js";
import { handleMulter, myMulter, validationTypes } from "../../service/multer.js";

export const userRouter = Router();

userRouter.get("/profile" ,auth() ,controller.getProfile);
userRouter.get("/messages" ,auth() ,controller.getMessages);
userRouter.patch("/updatepassword", auth(),validation(updatePasswordSchema),controller.updatePassword);
userRouter.get("/profilepic" ,auth(),
myMulter('user/profilepic',validationTypes.image).single("image"),handleMulter() ,controller.profilePic);

