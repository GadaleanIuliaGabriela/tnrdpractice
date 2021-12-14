import express, {Request, Response, NextFunction} from 'express';
import {json} from 'body-parser';
import {ConnectionOptions, createConnection} from "typeorm";
import cors from 'cors';
import config from "@tnrdpractice/config";
import securityRoutes from './app/routes/security';
import productRoutes from './app/routes/product';

const mysqlConfig = config.mysql as ConnectionOptions
createConnection(mysqlConfig).then(connection => {

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
