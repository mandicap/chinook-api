import { Hono } from 'hono';
import { validator } from 'hono-openapi';
import db from '@/db';
import { media_type } from '@/db/schema';
import paginationMiddleware from '@/middleware/pagination';
import { querySchema } from '@/utils/schema';

const mediaTypes = new Hono();

mediaTypes.get('/', validator('query', querySchema), paginationMiddleware(media_type), async (c) => {
    const { offset, ...pagination } = c.get('pagination');

    const mediaTypes = await db.query.media_type.findMany({
        limit: pagination.perPage,
        offset,
    });

    return c.json({
        data: mediaTypes,
        pagination,
    });
});

export default mediaTypes;
