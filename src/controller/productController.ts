import { Request, Response } from "express";
import { TypeProduct } from "../schemas/schemaProduct";
import { prismaClient } from "../../lib/prisma";

export default {
  async create(request: Request, response: Response) {
    const { name, description } = request.body as TypeProduct;

    const product = await prismaClient.product.create({
      data: { name, description },
    });

    return response
      .status(201)
      .json({ messge: "Produto criado com sucesso.", data: product });
  },
  async show(request: Request, response: Response) {
    const products = await prismaClient.product.findMany();

    return response.json(products);
  },
};
