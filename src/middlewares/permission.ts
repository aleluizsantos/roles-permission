import { Response, Request, NextFunction, RequestHandler } from "express";
import { prismaClient } from "../../lib/prisma";
import { decode } from "jsonwebtoken";

async function decoder(request: Request) {
  const authheader = request.headers.authorization || "";

  const [, token] = authheader?.split(" ");

  const payload = decode(token);

  console.log(typeof payload?.sub);

  const idUser: string = String(payload?.sub);

  const user = await prismaClient.users.findUnique({
    where: { id: idUser },
    include: {
      users_roles: {
        select: {
          role: {
            select: {
              nameRol: true,
              descriptionRol: true,
              permission: {
                select: {
                  permission: { select: { id: true, namePer: true } },
                },
              },
            },
          },
        },
      },
    },
  });

  return user;
}

function is(roles: String[], permissions: String[]): RequestHandler {
  return async (request: Request, response: Response, next: NextFunction) => {
    const user = await decoder(request);

    if (!user)
      return response
        .status(401)
        .json({ message: "Usuário não autorizado, falta do acesso token" });

    const { users_roles } = user;
    const [roles_permision] = users_roles.map((userRoles) => {
      const roles: string[] = [];
      roles.push(userRoles.role.nameRol);
      const permission = userRoles.role.permission.map(
        (per) => per.permission.namePer
      );
      return { roles, permission };
    });

    const existsRoles = roles_permision.roles.some((r) => roles.includes(r));
    const existPermission = roles_permision.permission.some((p) =>
      permissions.includes(p)
    );

    if (existsRoles && existPermission) {
      next();
    } else {
      return response.status(401).json({ message: "Uauário não autorizado." });
    }
  };
}

export { is };
