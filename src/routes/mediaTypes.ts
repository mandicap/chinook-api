import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { validator } from 'hono-openapi';
import db from '@/db';
import { media_type } from '@/db/schema';
import paginationMiddleware from '@/middleware/pagination';
import { paramSchema, querySchema } from '@/utils/schema';

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

mediaTypes.get('/:id', validator('param', paramSchema), async (c) => {
    const { id } = c.req.valid('param');

    const data = await db.query.media_type.findFirst({
        where: eq(media_type.media_type_id, id),
    });

    return c.json({ data });
});

export default mediaTypes;
