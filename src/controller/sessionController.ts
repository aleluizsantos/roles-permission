import { Request, Response } from "express";
import { typeCreateSession } from "../schemas/schemaUser";
import { prismaClient } from "../../lib/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export default {
  async create(request: Request, response: Response) {
    const { username, password } = request.body as typeCreateSession;
    // Verificar se o usuário existe
    const user = await prismaClient.users.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        password: true,
        username: true,
        createAt: true,
        users_roles: {
          select: {
            role: {
              select: {
                type: true,
                permission: {
                  select: {
                    permission: { select: { type: true } },
                  },
                },
                _count: true,
              },
            },
          },
        },
      },
    });

    if (!user)
      return response.status(400).json({ message: "Usuário não existe." });

    // comparar as senhas
    const matchPassword = await compare(password, user.password);

    if (!matchPassword)
      return response
        .status(400)
        .json({ message: "Usuário ou senha incorreta." });

    const [roles_permision] = user.users_roles.map((userRoles) => {
      const roles: string[] = [];
      roles.push(userRoles.role.type);
      const permission = userRoles.role.permission.map(
        (per) => per.permission.type
      );
      return { roles, permission };
    });

    // Criar token
    const token = sign(roles_permision, "24aade0de22398dcf52edd2649b013ee", {
      subject: user.id,
      expiresIn: "1d",
    });

    return response.status(200).json({
      id: user.id,
      name: user.name,
      username: user.username,
      createAt: user.createAt,
      token,
      roles_permision,
    });
  },
};
