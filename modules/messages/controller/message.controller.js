import {messageModel} from "../../../DB/models/message/message.model.js";
import { userModel } from "../../../DB/models/user/user.model.js";

const post = async(req,res)=>
{
    try 
    {
        let {text} = req.body;
        let {reciever_id} = req.params;
        let foundedEmail = await userModel.findById(reciever_id);
        if (foundedEmail) 
        {
            let saveMessage = await messageModel({text , reciever_id});
            let addedMessage = await saveMessage.save();
            res.json({message:"success" , addedMessage});
        }else
        {
            res.json({message:"email not found"})
        }

      
    } catch (error) 
    {
            res.json({message:"error" , error})   
    }
}



export{post}  