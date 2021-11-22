import express, {Request, Response, NextFunction} from 'express';
import {json} from 'body-parser';
import {createConnection} from "typeorm";
import cors from 'cors';
import {User} from "@tnrdpractice/utils";
import userRoutes from './app/routers/user';

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

  const allowedOrigins: string[] = ['http://localhost:3001', 'http://127.0.0.1:4200'];

  const options: cors.CorsOptions = {
    origin: allowedOrigins
  };

  app.use(cors(options));

  app.use(json());

  app.use('/api', userRoutes);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message})
  })

  app.listen(3000)
});
