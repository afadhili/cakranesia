import nodemailer from "nodemailer";
import { google } from "googleapis";
import verificationHtml from "./verificationHtml";
import resetPasswordHtml from "./resetPasswordHtml";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_MAIL_REFRESH as string;
const GOOGLE_ACCOUNT = process.env.GOOGLE_ACCOUNT as string;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground",
);
oauth2Client.setCredentials({
  refresh_token: GOOGLE_REFRESH_TOKEN,
});

interface SendMailProps {
  to: string;
  subject?: string;
  html?: string;
  type?: "verify" | "reset";
  url?: string;
}

async function sendMail({
  to,
  subject,
  html,
  type = "verify",
  url,
}: SendMailProps) {
  try {
    const accessToken = await oauth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: GOOGLE_ACCOUNT,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken.token as string,
      },
    });

    let sendHtml = "";
    let sendSubject = "";

    if (html && subject) {
      sendHtml = html;
      sendSubject = subject;
    }

    if (type === "verify" && url) {
      sendHtml = verificationHtml(url);
      sendSubject = "Verify Your Email Address";
    }

    if (type === "reset" && url) {
      sendHtml = resetPasswordHtml(url);
      sendSubject = "Reset Your Password";
    }

    const mailOptions = {
      from: "CAKRANESIA ✉️ <" + GOOGLE_ACCOUNT + ">",
      to: to,
      subject: sendSubject,
      html: sendHtml,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

export default sendMail;
