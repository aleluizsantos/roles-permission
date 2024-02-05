import { Request, Response } from "express";
import { prismaClient } from "../../lib/prisma";
import { typeRoles } from "../schemas/schemaRoles";

export default {
  async create(request: Request, response: Response) {
    const { nameRol, descriptionRol, permissions } = request.body as typeRoles;
    //Verificar se a permission existe
    const existRoles = await prismaClient.roles.findFirst({
      where: { nameRol },
    });

    if (existRoles)
      return response.status(400).json({ message: "Erro roles já existe." });

    // Pegar todas as permissões pelo id
    const existsPermissions = await prismaClient.permissions.findMany({
      where: { id: { in: permissions } }, //Buscar no banco o array de permission
    });

    const onlyId = existsPermissions.map((perm) => {
      return { permission_id: perm.id };
    });

    const roles = await prismaClient.roles.create({
      data: {
        nameRol,
        descriptionRol,
        permission: {
          create: onlyId,
        },
      },
      select: {
        nameRol: true,
        descriptionRol: true,
        permission: {
          select: { permission: { select: { descriptionPer: true } } },
        },
      },
    });

    return response.json(roles);
  },
};
