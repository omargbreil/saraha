import {userModel} from "../../../DB/models/user/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { sendEmail } from "../../../service/sendEmail.js";
import { nanoid } from "nanoid";

const signup = async(req,res)=>
{
    try 
    {

        let {user_name,email , password , cpassword}= req.body; 
        if(password===cpassword)
       {
           
           const foundUser = await userModel.findOne({email});

        if (foundUser) 
        {
            res.json({message:`${email} already register`});    
            
        }else
        {
            
            const hashed = bcrypt.hashSync(password,5);
            const savedUser = await userModel({user_name , email , password:hashed});
            const addedUser = await savedUser.save();
            let token = jwt.sign({
                user_name:addedUser.user_name,
                email:email,
                id : addedUser._id
            },process.env.tokenEmailKey ,
            {
                expiresIn:60
            })
            let refreshToken = jwt.sign(
                {
                user_name:addedUser.user_name,
                email:email,
                id : addedUser._id
                },process.env.tokenEmailKey,
                {
                    expiresIn:60*60
                })
                
            let Url = `${req.protocol}://${req.headers.host}/v1/auth`
            let confirmEmail = `<a href=${Url}/confirmemail/${token}> 
                                    click here to verify your email
                                </a> 
                                <br>
                                <a href=${Url}/refreshtoken/${refreshToken}> 
                                    click here to get new one 
                                </a>`

            sendEmail(email , confirmEmail);
            
            res.json({message:"success" , addedUser});
        }

        
       }else
       {
        res.json({message:"password not matched"})
       }
    } catch (error) 
    {
        res.json({message:"error" , error})
    }

}


const signin = async(req,res)=>
{
    try 
    {
        let {email , password} = req.body;
        
        const foundUser = await userModel.findOne({email});
        if (foundUser) 
        {
            const matched = bcrypt.compareSync(password,foundUser.password);
            if (matched) 
            {
                if (foundUser.confirm_email===true) 
                {
                    const token = jwt.sign(
                        {
                            email:email,
                            id : foundUser._id
                        },process.env.tokenKey,{expiresIn:60*60});
                        
                        res.json({message:"success" , token});
                        
                }else
                {
                    res.json({message:"confirm your email first"})
                }
              
                
            }else
            {
                res.json({message:"incorrect password"});
            }    
        }else
        {
            res.json({message:"you have to register"})
        }
        
    } catch (error) 
    {
        res.json({message:"error" , error})   
    } 
}

const confirmEmail = async (req,res)=>
{
    try 
    {
        let {token} = req.params;
        let decoded = jwt.verify(token,process.env.tokenEmailKey);

        if (decoded) 
        {
           let user = await userModel.findOne({_id:decoded.id , confirm_email:false});

           if (user) 
           {
            let updateduser = await userModel.findByIdAndUpdate(decoded.id,
                {
                    confirm_email:true,
                },
                {
                    new:true

                });

                res.json({message:"success",updateduser})

           }else
           {
             res.json({message:"email already confirmed"})
           }

        }else
        {
            res.json({message:"invalid token"})
        }
            

    } catch (error) 
    {
        res.json({message:"error" , error})
    }

}

const refreshToken = async(req,res)=>
{
    try 
    {
        let{token}=req.params;

        let decoded = jwt.verify(token , process.env.tokenEmailKey);
        if (decoded) 
        {
            const user = await userModel.findOne({_id:decoded.id , confirm_email:false});
            if (user) 
            {   
                let updateduser = await userModel.findByIdAndUpdate(decoded.id , {confirm_email:true} , {new:true})
                res.json({message:"success" , updateduser})      
            }else
            {
                res.json({message:"already confirmed"});
            }

        }else
        {
            res.json({message:"invalid token"});
        }
        
    } catch (error) 
    {
        res.json({message:"error" , error})    
    }
}

const sendCode = async(req,res)=>
{
    try 
    {
        let {email} = req.body;
        let user = await userModel.findOne({email});
        if (!user) 
        {
            res.json({message:"user didnt register yet"})
        }else
        {
            // let otp = Math.floor(Math.random() * (1999 - 1940 + 1)+1940);
            let otp =nanoid();
            let message = `your otp code .. ${otp}`;
            sendEmail(email, message);
           let updateduser = await userModel.findByIdAndUpdate(user._id,
            {
                code:otp
            },{new:true});
            res.json({message:"success",updateduser})
            
        }   
    } catch (error) 
    {
        res.json({message:"error" , error});
    }
}

const forgetPassword = async(req,res)=>
{
    try 
    {
        let {code , email , password}=req.body;


      
        
            let user = await userModel.findOne({email,code});

            if (!user) 
        {
            res.json({message:"email or code is incorrect"});    
        }else
        {
            let hashed = bcrypt.hashSync(password,5);

            let updateduser= await userModel.findByIdAndUpdate(user._id , 
                {
                    password:hashed,
                    code:null
                },{new:true});
                res.json({message:"success" , updateduser});
        
        }
        
    } catch (error) 
    {
        res.json({message:"error" , error})   
    }
}

export {signup , signin,  confirmEmail , refreshToken ,sendCode , forgetPassword}