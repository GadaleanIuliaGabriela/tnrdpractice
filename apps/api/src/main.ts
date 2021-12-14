import express, {Request, Response, NextFunction} from 'express';
import {json} from 'body-parser';
import {createConnection} from "typeorm";
import cors from 'cors';
import {User} from "@tnrdpractice/utils";
import {Product} from "@tnrdpractice/utils";
import {config} from "@tnrdpractice/config";
import securityRoutes from './app/routes/security';
import productRoutes from './app/routes/product';

createConnection({
  name: config.mysql.connectionName ? config.mysql.connectionName : process.env.DB_CONN_NAME,
  type: "mysql",
  host: config.mysql.host ? config.mysql.host : process.env.DB_HOST,
  port: config.mysql.port ? +config.mysql.port : +process.env.DB_PORT,
  username: config.mysql.username ? config.mysql.username : process.env.DB_USERNAME,
  password: config.mysql.password ? config.mysql.password : process.env.DB_PASSWORD,
  database: config.mysql.name ? config.mysql.name : process.env.DB_NAME,
  entities: [User, Product]
}).then(connection => {

  const app = express();

  const allowedOrigins: string[] = [process.env.API_URL, process.env.FRONTEND_URL];

  const options: cors.CorsOptions = {
    origin: allowedOrigins
  };

  app.use(cors(options));

  app.use(json());

  app.use('/api/v1', securityRoutes);

  app.use('/api/v1', productRoutes);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message})
  })

  app.listen(3000)
}).catch(e => {
  console.log("Eroare la conectarea la db")
});
