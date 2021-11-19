import {RequestHandler} from 'express';
import {getConnection} from "typeorm";
import transporter from "../utils/mailer";
import {User} from "@tnrdpractice/utils";

export const getMessage: RequestHandler = (req, res, next) => {
  res.status(201).json({
    message: "Hey!"
  })
}

export const register: RequestHandler = (req, res, next) => {
  const username = (req.body as { username: string }).username;
  const password = (req.body as { password: string }).password;

  const user = new User(username, password, 'inactive');

  getConnection().manager.save(user).then((user) => {
    const mailOptions = {
      from : 'tnrdpractice@practice.com',
      to : username,
      subject : 'Hello',
      text: 'Aici urmeaza un token'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(`error: ${error}`);
      }
      console.log(`Message Sent ${info.response}`);
    })

    res.status(201).json({message: 'User registered: ' + user.username})

  }).catch((error) => {
    console.log(error)
  })
}


