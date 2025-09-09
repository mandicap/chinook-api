import z from 'zod';

export const querySchema = z.object({
    limit: z.coerce.number().optional(),
    page: z.coerce.number().optional(),
});
