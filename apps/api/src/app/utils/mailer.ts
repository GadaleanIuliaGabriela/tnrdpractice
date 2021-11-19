import * as nodemailer from 'nodemailer';

export default nodemailer.createTransport({
  host: "mailer",
  port: 25,
  secure: false
});

