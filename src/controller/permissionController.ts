import {
  schemaPermission,
  typePermission,
} from "./../schemas/schemaPermission";
import { Request, Response } from "express";
import { prismaClient } from "../../lib/prisma";

export default {
  async create(request: Request, response: Response) {
    const { type, description } = request.body as typePermission;

    const validate = schemaPermission.safeParse(request.body);

    if (!validate.success) return response.status(400).json(validate);

    //Verificar se a permission existe
    const existPermission = await prismaClient.permissions.findFirst({
      where: { type },
    });

    if (existPermission)
      return response
        .status(400)
        .json({ message: "Erro permissão já existe." });

    const permission = await prismaClient.permissions.create({
      data: {
        type,
        description,
      },
    });

    return response.json(permission);
  },
  async show(request: Request, response: Response) {
    const permission = await prismaClient.permissions.findMany();
    return response.json(permission);
  },
};
