import { Router } from "express";
import * as controller from "./controller/message.controller.js"

export const messageRouter = Router();

messageRouter.post("/post/:reciever_id" , controller.post);

