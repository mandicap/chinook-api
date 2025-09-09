import { Hono } from 'hono';
import { validator } from 'hono-openapi';
import db from '@/db';
import { genre } from '@/db/schema';
import paginationMiddleware from '@/middleware/pagination';
import { querySchema } from '@/utils/schema';

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

export default genres;
