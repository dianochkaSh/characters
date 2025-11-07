import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long." }),
    species: z.string().min(3, { message: "Species must be at least 3 characters long." }),
    image: z.string().url(),
});

export type ProductFormData = z.infer<typeof productSchema>;