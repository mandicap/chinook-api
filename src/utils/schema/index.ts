import z from 'zod';

export const querySchema = z.object({
    limit: z.coerce.number().optional(),
    page: z.coerce.number().optional(),
});

export const paramSchema = z.object({
    id: z.coerce.number(),
});
