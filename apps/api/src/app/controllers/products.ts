import {RequestHandler} from 'express';
import {getRepository} from "typeorm";
import {Product, User} from "@tnrdpractice/utils";

export const addProduct: RequestHandler = async (req, res, next) => {
  const title = (req.body as { title: string }).title;
  const description = (req.body as { description: string }).description;
  const price = (req.body as { price: number }).price;
  const currency = (req.body as { currency: string }).currency;
  const ownerUsername = (req.body as { owner: string }).owner;

  const userRepository = getRepository(User);
  const owner = await userRepository.findOne({where: {username: ownerUsername}});
  if (!owner) {
    return res.status(400).json({message: 'Owner email not found.'})
  }

  const product = new Product(title, owner, price, currency, description)

  const productRepository = getRepository(Product);
  await productRepository.save(product).then(() => {
    res.status(201).json({message: 'New product added.'})
  }).catch(() => {
    res.status(400).json({message: 'Something went wrong.'})
  })
}
