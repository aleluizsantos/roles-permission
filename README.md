
# 🚀 Projeto Roles e Permissões

Criado um projeto criado node como permissões.

## 🌟 Features

- express
- typescript
- ts-node-dev - forma abrevida de usar 'tsnd'
- prisma
- jsonWebToken
- zod


## 🧾 Esquemas

- Cadastro de Users
- Autenticação de Users
- Cadastro de Permissões
- Cadastro de Roles
- Cadastro de Produtos
- Conexão Users Roles
- Conexão Permissões Roles


## 🛠️ Instalando o PRISMA

`npm init -y`

`npm install prisma typescript ts-node @types/node --save-dev`

`npx tsc --init` - inicializar o typescript

`npx prisma init`

#### Este comando faz duas coisas:

- cria um novo diretório chamado `prisma` que contém um arquivo chamado `schema.prisma`, que contém o esquema Prisma com sua variável de conexão de banco de dados e modelos de esquema.

- cria o `.env` arquivo no diretório raiz do projeto, que é usado para definir variáveis ​​de ambiente (como sua conexão com o banco de dados)

#### Conecte seu banco de dados

Para conectar seu banco de dados, você precisa definir o url campo do `datasource` bloco em seu esquema Prisma para o URL de conexão do seu banco de dados :

criado na pasta `Libs` a conexão com o banco de dados
```javascript
import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENVV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) global.cachedPrisma = new PrismaClient();

  prisma = global.cachedPrisma;
}

export const prismaClient = prisma;
```

