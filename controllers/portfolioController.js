const nodemailer=require('nodemailer');
const BrevoTransport=require('nodemailer-brevo-transport');

//transport  ""
const transporter= nodemailer.createTransport(new BrevoTransport({auth:{apiKey:process.env.API_BREVO}}))

const sendEmailController =(req,res)=>{
    
    try {
        const{name ,email, msg} =req.body
        //validation
        if(!name || !email ||!msg)
        {
            return res.status(500).send({
                success:false,
                message: "Please Provide All filed"
            });
        }
        //email matter
       transporter.sendMail({
            to:"chhotu8676@gmail.com",
            from:"chhotu8676@gmail.com",
            subject: 'Regarding Mern Portfolio App',
            html:
            `
                <h5>Detail Information</h5>
                <ul>
                    <li><p>Name:${name}</p></li>
                    <li><p>Email:${email}</p></li>
                    <li><p>Message:${msg}</p></li>
                </ul>
            `
        });
      return res.status(200).send({
            success:true,
            message:'Your Message Send Successfuly'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'send Email Api Error',
            error
        });
    }
};
module.exports={sendEmailController};