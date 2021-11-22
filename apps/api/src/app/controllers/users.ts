import {RequestHandler} from 'express';
import {getConnection, getRepository} from "typeorm";
import bcrypt from "bcrypt";
import randomString from "randomstring";
import transporter from "../utils/mailer";
import {User} from "@tnrdpractice/utils";

export const getMessage: RequestHandler = (req, res, next) => {
  res.status(201).json({
    message: "Hey!"
  })
}

export const register: RequestHandler = async (req, res, next) => {
  const username = (req.body as { username: string }).username;
  const password = (req.body as { password: string }).password;
  const hashedPassword = await bcrypt.hash(password, 8);
  const activationToken = randomString.generate({length: 50, charset: 'alphabetic'});

  const user = new User(username, hashedPassword, 'inactive', activationToken);

  getConnection().manager.save(user).then((user) => {
    const mailOptions = {
      from: 'tnrdpractice@practice.com',
      to: username,
      subject: 'Hello',
      text: `http://127.0.0.1:4200/activate/${user.activation_token}`
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

export const activateAccount: RequestHandler = async (req, res, next) => {
  const token = (req.query as { token: string }).token
  console.log(token);
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({where: {activation_token: token}});
  if (!user) {
    res.status(400).json({message: 'No user found.'})
  }
  await userRepository.update(user.id, {activation_token: null, status: 'ACTIVE'})
  res.status(201).json({message: 'The account has been activated: ' + user.username})
}
