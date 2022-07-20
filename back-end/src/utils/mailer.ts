import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

async function authMailer(email: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: process.env.MAILER_ID,
      pass: process.env.MAILER_PW,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"CFD Team" <${process.env.MAILER_ID}>`,
      to: email,
      subject: "이메일 인증번호 입니다",
      html: `<p style="font-size: 16px;">인증번호 : ${Math.floor(
        Math.random() * Math.pow(1000, 2)
      )}</p>`,
    });

    console.log(info);
  } catch (error) {
    console.log(error);
  }
}
export { authMailer };
