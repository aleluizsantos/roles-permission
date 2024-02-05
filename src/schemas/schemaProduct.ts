import { z } from "zod";

const schemaProduct = z.object({
  id: z.number().nullable(),
  name: z.string(),
  description: z.string(),
});

export type TypeProduct = z.infer<typeof schemaProduct>;
