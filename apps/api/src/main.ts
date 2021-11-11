import express, {RequestHandler, Request, Response, NextFunction} from 'express';
import {json} from 'body-parser';
import {concat} from 'lodash';

const app = express();

app.use(json());

const getMessage: RequestHandler = (req, res, next) => {
  res.json({
    message: "Here is your message.",
    numbers: concat([1, 2, 3], [10, 11, 12])
  })
}

app.get('/', getMessage);

console.log('Hello World!');
console.log(concat([1, 2, 3], [10, 11, 12]));

app.listen(3000)
