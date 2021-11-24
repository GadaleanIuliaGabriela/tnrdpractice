import express, {Request, Response, NextFunction} from 'express';
import {json} from 'body-parser';
import {createConnection} from "typeorm";
import cors from 'cors';
import {User} from "@tnrdpractice/utils";
import userRoutes from './app/routers/user';

createConnection({
  name: process.env.DB_CONN_NAME,
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User]
}).then(connection => {

  const app = express();

  const allowedOrigins: string[] = [process.env.API_URL, process.env.FRONTEND_URL];

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
}).catch(e => {
  console.log("Eroare la conectarea la db")
});
