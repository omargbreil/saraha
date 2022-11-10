import mongoose from "mongoose";

 const userSchema = new mongoose.Schema(
    {
        first_name :String,
        last_name :String,
        user_name :
        {
            type : String,
            required: true
        },
        email :
        {
            type : String,
            required: true
        },
        password :
        {
            type : String,
            required: true
        },
        gender:
        {
            type : String,
            default:"male",
            enums:['female' ,'male'],
            
        },
        confirm_email:
        {
            type:Boolean,
            default:false
        },
        profile_pic : String,
        cover_pic : Array,
        last_seen : Date,
        birth_date :String,
        code:String
    }, 
    {
        timestamps:true
    })

export const userModel = mongoose.model( "user",userSchema);