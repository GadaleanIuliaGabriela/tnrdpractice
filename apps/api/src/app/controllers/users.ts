import {RequestHandler} from 'express';
import {getConnection} from "typeorm";
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
    res.status(201).json({message: 'User registered: ' + user.username})
  }).catch((error) => {
    console.log(error)
  })
}


