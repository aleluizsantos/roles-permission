import { Request, Response } from "express";
import { typePermission } from "../schemas/schemaPermission";
import { prismaClient } from "../../lib/prisma";

export default {
  async create(request: Request, response: Response) {
    const { namePer, descriptionPer } = request.body as typePermission;
    //Verificar se a permission existe
    const existPermission = await prismaClient.permissions.findFirst({
      where: { namePer },
    });

    if (existPermission)
      return response
        .status(400)
        .json({ message: "Erro permissão já existe." });

    const permission = await prismaClient.permissions.create({
      data: {
        namePer,
        descriptionPer,
      },
    });

    return response.json(permission);
  },
};
