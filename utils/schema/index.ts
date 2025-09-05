import z from 'zod';

export const querySchema = z.object({
    limit: z
        .union([
            z.number(), // number or
            z
                .string()
                .transform((str) => parseInt(str, 10)), // string transformed to number
        ])
        .optional()
        .default(10),
    page: z
        .union([
            z.number(), // number or
            z
                .string()
                .transform((str) => parseInt(str, 10)), // string transformed to number
        ])
        .optional()
        .default(1),
});
