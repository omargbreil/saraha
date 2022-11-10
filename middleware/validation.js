

export const validation = (Schema)=>
{
    return (req,res,next)=>
    {
        try 
        {   
            let validationType = ["body" , "query" , "params" , "headers"];
            let validationError = [];
            validationType.forEach(key => 
            {
                if (Schema[key]) 
                {
                    let valid = Schema[key].validate(req[key],{abortEarly:false});
                    if (valid.error) 
                    {
                           validationError.push(valid.error);
                           

                    }
                      
                }
                
            });

            if (validationError.length) 
            {
                res.json({message:"error", validationError});
   
            }else
            {
                next()

            }
            
      
            
        } catch (error) 
        {
            res.json({message:"middleware error" , error})    
        }
    }
}