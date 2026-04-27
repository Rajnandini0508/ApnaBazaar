import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendOtpMail=async(to,otp)=> {
    await transporter.sendMail({
        from:process.env.EMAIL,
        to,
        subject:"Reset Your Password",
        html:`<p>Your OTP for password reset is <b>${otp}<b>. It expires in 5 minutes.</p>`
    })
}

export const sendOrderOtpMail=async(email,otp)=> {
    await transporter.sendMail({
        from:process.env.EMAIL,
        to:email,
        subject:"Order OTP Confirmation",
        html:`<p>Your OTP for your order is <b>${otp}<b>. Please share this with the delivery partner upon arrival.</p>`
    })
}

export const sendDeliveryOtpMail=async(user,otp)=> {
    await transporter.sendMail({
        from:process.env.EMAIL,
        to:user.email,
        subject:"Delivery OTP",
        html:`<p>Your OTP for delivery is <b>${otp}<b>. It expires in 5 minutes.</p>`
    })
}