import {RequestHandler} from 'express';
import {getRepository} from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import randomString from "randomstring";
import {User} from "@tnrdpractice/utils";
import transporter from "../utils/mailer";

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

  const userRepository = getRepository(User);
  const user = await userRepository.findOne({where: {username: username}});
  if (user) {
    return res.status(400).json({message: 'Cannot create user. A user with the same username exists.'})
  }

  const newUser = new User(username, hashedPassword, 'inactive', activationToken);
  await userRepository.save(newUser).then(newUser => {
    const mailOptions = {
      from: process.env.TNRDPRACTICE_EMAIL,
      to: username,
      subject: 'Activate account',
      text: process.env.FRONTEND_URL + `/activate/${newUser.activation_token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(`error: ${error}`);
      }
      console.log(`Message Sent ${info.response}`);
    })

    res.status(201).json({message: 'User registered: ' + newUser.username})
  }).catch((error) => {
    console.log(error)
    res.status(400).json({message: 'Something went wrong.'})
  })
}

export const activateAccount: RequestHandler = async (req, res, next) => {
  const token = (req.query as { token: string }).token
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({where: {activation_token: token}});
  if (!user) {
    return res.status(400).json({message: 'No user found.'})
  }
  await userRepository.update(user.id, {activation_token: null, status: 'ACTIVE'})
  res.status(201).json({message: 'The account has been activated: ' + user.username})
}

export const login: RequestHandler = async (req, res, next) => {
  try {
    const username = (req.body as { username: string }).username;
    const password = (req.body as { password: string }).password;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({where: {username: username}});

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).send({message: "Wrong credentials."})
    }

    const token = jwt.sign({email: user.email}, process.env.JWT_SECRET)

    await userRepository.update(user.id, {auth_token: token})

    res.send({user, token})
  } catch (e) {
    res.status(400).send({message: "Something went wrong"})
  }
}
