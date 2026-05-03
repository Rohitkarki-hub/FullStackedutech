import nodemailer from "nodemailer";

interface ImailFormatObject {
  from: string;
  to: string;
  subject: string;
  text: string;
}

class mailService {
  static async sendMail(mailInfo: ImailFormatObject) {
    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });
      const mailFormatObject = {
        from: `Saas Mern<${process.env.NODEMAILER_EMAIL}>`,
        to: mailInfo.to,
        subject: mailInfo.subject,
        text: mailInfo.text,
      };
      await transporter.sendMail(mailFormatObject);
    } catch (error) {
      console.log(error);
    }
  }
}

export default mailService;
