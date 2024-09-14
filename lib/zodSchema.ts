import {z} from "zod";

export const siteSchema = z.object({
    name: z.string().min(3).max(35),
    subdirectory: z.string().min(3).max(35),
    description: z.string().min(3).max(150),
});