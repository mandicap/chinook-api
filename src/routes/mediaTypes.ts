import { Hono } from 'hono';
import { validator } from 'hono-openapi';
import db from '@/db';
import { media_type } from '@/db/schema';
import paginationMiddleware from '@/middleware/pagination';
import { querySchema } from '@/utils/schema';

const mediaTypes = new Hono();

mediaTypes.get('/', validator('query', querySchema), paginationMiddleware(media_type), async (c) => {
    const {
        page: currentPage,
        limit: perPage,
        offset,
        totalItems,
        totalPages,
        prevPageUrl,
        nextPageUrl,
    } = c.get('pagination');

    const mediaTypes = await db.query.media_type.findMany({
        limit: perPage,
        offset,
    });

    return c.json({
        data: mediaTypes,
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

export default mediaTypes;
