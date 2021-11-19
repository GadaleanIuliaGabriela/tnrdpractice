import express, {Request, Response, NextFunction} from 'express';
import {json} from 'body-parser';
import userRoutes from './app/routers/user';
import {createConnection} from "typeorm";
import {User} from "@tnrdpractice/utils";

createConnection({
  name: 'default',
  type: "mysql",
  host: "db",
  port: 3306,
  username: "root",
  password: "rootpassword",
  database: "practice",
  synchronize: true,
  entities: [User]
}).then(connection => {

  const app = express();

  app.use(json());

  app.use('/api', userRoutes);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message})
  })

  app.listen(3000)
});
