import { messageModel } from "../../../DB/models/message/message.model.js";
import {userModel} from "../../../DB/models/user/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../../../service/cloudinary.js"


const getProfile = async(req,res) =>
{
    try 
    {
        let id =req.currentId;
        
        const user = await userModel.findById(id);
        res.json({message:"success" , user})
        
    } catch (error) 
    {
      res.json({message:"error" , error})  
    }
}
const getMessages = async(req,res)=>
{
  try 
  {
    
      let id = req.currentId;
      
      let userMessages = await messageModel.find({reciever_id:id});
      res.json({message:"success" , userMessages})

  } catch (error) 
  {
      res.json({message:"error" ,error}) 
  }
}

const updatePassword = async(req,res)=>
{
  try 
  {
    
      let id = req.currentId;
      
        let{password , newpassword , cnewpassword}=req.body;
        if (newpassword===cnewpassword) 
        {
          let user = await userModel.findById(id);
          
          let matched = bcrypt.compareSync(password, user.password);
          if (matched) 
          {
            let hashed =bcrypt.hashSync(newpassword,5);
            let updatedUser = await userModel.findByIdAndUpdate(id,
              {
                 password:hashed
              },
              {new:true});
              res.json({message:"sccess", updatedUser})
          }else
          {
            res.json({message:"wrong password"})
          }


        }else
        {
          res.json({message:"password not matched "})
        }
         
      
  } catch (error) 
  {
    res.json({message:"error" , error}) 
  }
}

const profilePic = async(req,res)=>
{
  try 
  {

    if (!req.file)
    {
      res.json({message:"upload pic"}); 
    }else
    {
      let id = req.currentId;
      let user = await userModel.findById(id);
      if (!user) 
      {
          res.json({message:"invalid id"})  
      }else
      {
        let photo = await cloudinary.uploader.upload(req.file.path ,{folder:'user'})
        let updatedUser = await userModel.findByIdAndUpdate(id,
          {
            profile_pic:photo.secure_url
          },{new:true});  

          res.json({message:"success",updatedUser})
      }
    }

    
  } catch (error) 
  {
    res.json({message:"error" ,error}) 
  }
}



export {getProfile , getMessages , updatePassword , profilePic};