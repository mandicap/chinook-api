import z from 'zod';

export const stringOrNumberSchema = z.union([
    z.number(), // number or
    z
        .string()
        .transform((str) => parseInt(str, 10)), // string transformed to number
]);

export const querySchema = z.object({
    limit: stringOrNumberSchema.optional().default(10),
    page: stringOrNumberSchema.optional().default(1),
});
