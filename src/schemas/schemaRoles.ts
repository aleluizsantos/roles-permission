import { z } from "zod";

export const schemaRoles = z.object({
  id: z.string().nullish(),
  nameRol: z.string(),
  descriptionRol: z.string(),
  createAt: z.string().nullable(),
  permissions: z.string().array(),
});

export type typeRoles = z.infer<typeof schemaRoles>;
