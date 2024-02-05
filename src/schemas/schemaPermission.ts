import { z } from "zod";

export const schemaPermission = z.object({
  id: z.string().nullish(),
  type: z.string(),
  description: z.string(),
  createAt: z.string().nullish(),
});

export type typePermission = z.infer<typeof schemaPermission>;
