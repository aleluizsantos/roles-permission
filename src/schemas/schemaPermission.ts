import { z } from "zod";

export const schemaPermission = z.object({
  id: z.string().nullish(),
  namePer: z.string(),
  descriptionPer: z.string(),
  createAt: z.string().nullable(),
});

export type typePermission = z.infer<typeof schemaPermission>;
