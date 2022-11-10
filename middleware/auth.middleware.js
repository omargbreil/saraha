import  jwt  from "jsonwebtoken"



export const auth = ()=>
{
    return async(req,res,next)=>
    {
        try 
        {
            let {authorization} = req.headers;
            let token = authorization.split(" ")[1];
            const decoded = jwt.verify(token , process.env.tokenKey);

        if (authorization.startsWith("Bearer")) 
        {
            if (decoded) 
            {
                req.currentId=decoded.id;
                next()
            }else
            {
                res.json({message:"invalid token"})
            }   
        }else
        {
            res.json({message:"invalid token"})
        }
        
            
        } catch (error) 
        {
            res.json({message:"middleware error" , error})    
        }
    }
}
