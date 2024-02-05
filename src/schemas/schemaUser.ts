import { z } from "zod";

export const schemaUser = z.object({
  id: z.string().nullish(),
  name: z.string(),
  username: z.string(),
  password: z.string(),
  roles: z.string().array(),
  createAt: z.date().nullish(),
});

export const schemaCreateSession = z.object({
  username: z.string(),
  password: z.string(),
});

export type typeUser = z.infer<typeof schemaUser>;
export type typeCreateSession = z.infer<typeof schemaCreateSession>;
