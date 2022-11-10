import multer from "multer";
import { nanoid } from "nanoid";
import fs from 'fs';
import path from "path";
import {fileURLToPath} from 'url';

const _dirname = path.dirname(fileURLToPath(import.meta.url));

export const  validationTypes =
{
    image : ['image/png' , 'image/jpg' , 'image/jpeg']
} 


export const handleMulter = () =>
{
   return (err,req,res,next)=>
   {
    try 
    {
        
           
    if (err) 
    {
        res.json({message:"multer message" ,err})   
    }else
    {
        next()
    }
    } catch (error) 
    {
        res.json({message:"error" , error})   
    }
   }
}

export const myMulter = ( customPath , validationTypes)=>
{
    // const fullPath = path.join(_dirname ,`../uploads/${customPath}`)

    // if (!customPath) 
    // {
    //     customPath='general'    
    // }

    // if (!fs.existsSync(fullPath)) 
    // {
    //     fs.mkdirSync(fullPath,{recursive:true})
    // }
    const storage = multer.diskStorage(
        {
            // destination:function (req,file,cb) 
            // {
            //     cb(null,`uploads/${customPath}`)   
            // }, 
            // filename:function (req,file,cb) 
            // {
            //     cb(null, nanoid()+'_'+file.originalname)   
            // }
        }
    )

    function fileFilter(req,file,cb) 
    {
        if (validationTypes.includes(file.mimetype)) 
        {
            cb(null , true)
            
        }else
        {
            cb('error' , false)
        }    
    }


    const upload = multer({dest:'uploads', fileFilter, storage});
    return upload
    
}