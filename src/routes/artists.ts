import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { validator } from 'hono-openapi';
import db from '@/db';
import { artist } from '@/db/schema';
import paginationMiddleware from '@/middleware/pagination';
import { paramSchema, querySchema } from '@/utils/schema';

const artists = new Hono();

artists.get('/', validator('query', querySchema), paginationMiddleware(artist), async (c) => {
    const { offset, ...pagination } = c.get('pagination');

    const artists = await db.query.artist.findMany({
        limit: pagination.perPage,
        offset,
    });

    return c.json({
        data: artists,
        pagination,
    });
});

artists.get('/:id', validator('param', paramSchema), async (c) => {
    const { id } = c.req.valid('param');

    const data = await db.query.artist.findFirst({
        where: eq(artist.artist_id, id),
    });

    return c.json({ data });
});

export default artists;
