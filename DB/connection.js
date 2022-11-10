import mongoose from "mongoose";

export const connection = async()=>
{
    return await mongoose.connect(process.env.dbUrl).then(()=>
    {
        console.log("database connected");
    }).catch((error)=>
    {
        console.log("connection error" , error);
    });
}