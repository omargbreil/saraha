import nodemailer from "nodemailer";

export const sendEmail = async(dest,message)=>
{
    let transporter = nodemailer.createTransport(
        {
            service:"gmail",
            port:587,
            secure:false,
            auth:
            {
                user:process.env.senderEmail,
                pass:process.env.senderPass
            }
        }
    );

    let info = await transporter.sendMail(
        {
            from:process.env.senderEmail,
            to: dest,
            html:message,
            text:"hello",
            subject:"hi"
        }
    );
};

 /* -------------------------------------------------------------------------- */
 /*                              nodemailer google                             */
 /* -------------------------------------------------------------------------- */


// import nodeoutlook from'nodejs-nodemailer-outlook';

// export function sendEmail(dest,message) 
// {
//     nodeoutlook.sendEmail({
//         auth: {
//             // user:"omargbreil1@gmail.com",
//             // pass:"on134431125"
//             user:"route38alex@hotmail.com",
//             pass:"Route@alex"
//         },
//         from:"route38alex@hotmail.com",
//         to: dest,
//         subject: 'Hey you, awesome!',
//         html:message,
//         onError: (e) => console.log(e),
//         onSuccess: (i) => console.log(i)
//     }
    
    
//     );    
// }
