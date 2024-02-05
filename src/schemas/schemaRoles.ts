import { z } from "zod";

export const schemaRoles = z.object({
  id: z.string().nullish(),
  type: z.string(),
  description: z.string(),
  createAt: z.string().nullish(),
  permissions: z
    .string()
    .array()
    .nonempty({ message: "Deve ter pelo menos uma permissão" }),
});

export type typeRoles = z.infer<typeof schemaRoles>;
