import { Request, Response } from "express";
import { schemaUser, typeUser } from "../schemas/schemaUser";
import { prismaClient } from "../../lib/prisma";
import { hash } from "bcryptjs";

export default {
  async createUser(request: Request, response: Response) {
    const body = request.body as typeUser;

    // Check se as roles existe
    const existsRoles = await prismaClient.roles.findMany({
      where: { id: { in: body.roles } },
    });

    const onlyRoleId = existsRoles.map((role) => {
      return { role_id: role.id };
    });

    const isValid = schemaUser.safeParse(body);

    if (isValid.success) {
      try {
        await prismaClient.users.create({
          data: {
            name: body.name,
            password: await hash(body.password, 8),
            username: body.username,
            users_roles: {
              create: onlyRoleId,
            },
          },
        });
      } catch (error) {
        return response.json({
          message: "Erro ao incluir usuário já existente",
        });
      }
    } else {
      return response.json(isValid.error.issues);
    }

    return response.json({ message: "Usuário criado com sucesso" });
  },
  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const resp = (await prismaClient.users.delete({ where: { id } })).name;

      return response.json({ message: `usuário '${resp}' excluido.` });
    } catch (error) {
      return response.json({ message: "Erro ao excluir o usuário" });
    }
  },
  async show(request: Request, response: Response) {
    const data = await prismaClient.users.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        createAt: true,
        users_roles: {
          select: {
            role: {
              select: {
                type: true,
                permission: {
                  select: {
                    permission: { select: { id: true, type: true } },
                  },
                },
                _count: true,
              },
            },
          },
        },
      },
    });
    return response.json(data);
  },
};
