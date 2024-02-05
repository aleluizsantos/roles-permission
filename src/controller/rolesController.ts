import { Request, Response } from "express";
import { prismaClient } from "../../lib/prisma";
import { schemaRoles, typeRoles } from "../schemas/schemaRoles";

export default {
  async create(request: Request, response: Response) {
    const { type, description, permissions } = request.body as typeRoles;

    const validate = schemaRoles.safeParse(request.body);

    if (!validate.success) return response.status(400).json(validate);

    //Verificar se a permission existe
    const existRoles = await prismaClient.roles.findFirst({
      where: { type },
    });

    if (existRoles)
      return response.status(400).json({ message: "Esta role já existe." });

    // Pegar todas as permissões pelo id
    const existsPermissions = await prismaClient.permissions.findMany({
      where: { id: { in: permissions } }, //Buscar no banco o array de permission
    });

    const onlyId = existsPermissions.map((perm) => {
      return { permission_id: perm.id };
    });

    const roles = await prismaClient.roles.create({
      data: {
        type,
        description,
        permission: {
          create: onlyId,
        },
      },
      select: {
        type: true,
        description: true,
        permission: {
          select: { permission: { select: { description: true } } },
        },
      },
    });

    return response.json(roles);
  },
  async show(request: Request, response: Response) {
    const roles = await prismaClient.roles.findMany({
      select: {
        id: true,
        type: true,
        description: true,
        permission: {
          select: {
            permission: true,
          },
        },
      },
    });
    return response.json(roles);
  },
};
