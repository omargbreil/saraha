import joi from "joi";

export const updatePasswordSchema = 
{
    body:joi.object().required().keys(
        {
            password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            newpassword:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            cnewpassword:joi.string().valid(joi.ref('newpassword')).required()
        }
    ),
    headers:joi.object().required().keys(
        {
            authorization:joi.string().required()
        }
    ).unknown(true)
}