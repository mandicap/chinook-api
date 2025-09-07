import z from 'zod';

export const stringOrNumberSchema = z.union([
    z.number(), // number or
    z.string().transform(
        // string transformed to number
        (str) => parseInt(str, 10),
    ),
]);

export const querySchema = z.object({
    limit: stringOrNumberSchema.optional().default(10),
    page: stringOrNumberSchema.optional().default(1),
});
