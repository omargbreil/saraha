import dotenv from "dotenv";
dotenv.config();
import  express  from "express";
import cors from "cors";
import * as routers from "./modules/routers.js"
import {connection} from "./DB/connection.js"
const server = express();
server.use(express.json());
server.use(cors());
server.use(`/v1/uploads` , express.static('./uploads'))



server.use("/v1/user" , routers.userRouter);
server.use("/v1/message" , routers.messageRouter);
server.use("/v1/auth" , routers.authRouter);
server.get("*" , (req,res)=>
{
    res.json({message:"invalid api"})
})
server.listen(process.env.port, ()=>console.log("server running"));
connection();