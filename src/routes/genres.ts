import { Hono } from 'hono';
import { validator } from 'hono-openapi';
import db from '@/db';
import { genre } from '@/db/schema';
import paginationMiddleware from '@/middleware/pagination';
import { querySchema } from '@/utils/schema';

const genres = new Hono();

genres.get('/', validator('query', querySchema), paginationMiddleware(genre), async (c) => {
    const {
        page: currentPage,
        limit: perPage,
        offset,
        totalItems,
        totalPages,
        prevPageUrl,
        nextPageUrl,
    } = c.get('pagination');

    const genres = await db.query.genre.findMany({
        limit: perPage,
        offset,
    });

    return c.json({
        data: genres,
        pagination: {
            currentPage,
            perPage,
            totalPages,
            totalItems,
            nextPageUrl,
            prevPageUrl,
        },
    });
});

export default genres;
