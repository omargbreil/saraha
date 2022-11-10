import mongoose from "mongoose";

 const messageSchema = new mongoose.Schema(
    {
        text:
        {
            type:String,
            required:true
        },    
        reciever_id : 
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    }, 
    {
        timestamps:true
    })

export const messageModel = mongoose.model("message",messageSchema);    