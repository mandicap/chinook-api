import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { validator } from 'hono-openapi';
import db from '@/db';
import { genre } from '@/db/schema';
import paginationMiddleware from '@/middleware/pagination';
import { paramSchema, querySchema } from '@/utils/schema';

const genres = new Hono();

genres.get('/', validator('query', querySchema), paginationMiddleware(genre), async (c) => {
    const { offset, ...pagination } = c.get('pagination');

    const genres = await db.query.genre.findMany({
        limit: pagination.perPage,
        offset,
    });

    return c.json({
        data: genres,
        pagination,
    });
});

genres.get('/:id', validator('param', paramSchema), async (c) => {
    const { id } = c.req.valid('param');

    const data = await db.query.genre.findFirst({
        where: eq(genre.genre_id, id),
    });

    return c.json({ data });
});

export default genres;
