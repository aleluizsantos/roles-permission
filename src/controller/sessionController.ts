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
    });

    if (!user)
      return response.status(400).json({ message: "Usuário não existe." });

    // Verificar a senha
    const matchPassword = await compare(password, user.password);

    if (!matchPassword)
      return response
        .status(400)
        .json({ message: "Usuário ou senha incorreta." });

    // Criar token
    const token = sign({}, "24aade0de22398dcf52edd2649b013ee", {
      subject: user.id,
      expiresIn: "1d",
    });

    return response.status(200).json({ user, token });
  },
};
