import {RequestHandler} from 'express';
import {getRepository} from "typeorm";
import {Product, User} from "@tnrdpractice/utils";
import {CacheService} from "../utils/cacheService";

const redis = new CacheService();

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
  await productRepository.save(product).then(async () => {
    res.status(201).json({message: 'New product added.'})
    await redis.delete(`${owner.email}:/api/v1/users/${owner.id}/products`);
  }).catch(() => {
    res.status(400).json({message: 'Something went wrong.'})
  })
}

export const getUserProducts: RequestHandler = async (req, res, next) => {
  const userId = req.params.id;

  const userRepository = getRepository(User);
  const owner = await userRepository.findOne({where: {id: userId}});
  if (!owner) {
    return res.status(400).json({message: 'Owner not found.'})
  }

  const exists = await redis.exists(`${owner.email}:${req.originalUrl}`)
  if (exists) {
    const products = await redis.get(`${owner.email}:${req.originalUrl}`);
    return res.status(201).json(JSON.parse(products));
  }

  const productRepository = getRepository(Product);
  await productRepository.find({where: {owner: owner}}).then(async (products: Product[]) => {
    await redis.set(`${owner.email}:${req.originalUrl}`, products);
    res.status(201).json(products)
  }).catch(() => {
    res.status(400).json({message: 'Something went wrong.'})
  })
}
