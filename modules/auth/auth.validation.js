import joi from "joi";

export const signUpSchema =
{
    body:joi.object().required().keys(
        {
            user_name:joi.string().min(2).max(10).required(),
            email:joi.string().email({minDomainSegments:2 , tlds :{allow:['com' , 'net']}}),
            password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            cpassword:joi.valid(joi.ref("password")).required()
        }
    )
}