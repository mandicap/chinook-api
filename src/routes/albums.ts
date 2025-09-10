import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { validator } from 'hono-openapi';
import db from '@/db';
import { album } from '@/db/schema';
import paginationMiddleware from '@/middleware/pagination';
import { paramSchema, querySchema } from '@/utils/schema';

const albums = new Hono();

albums.get('/', validator('query', querySchema), paginationMiddleware(album), async (c) => {
    const { offset, ...pagination } = c.get('pagination');

    const albums = await db.query.album.findMany({
        with: {
            artist: true,
        },
        limit: pagination.perPage,
        offset,
    });

    return c.json({
        data: albums,
        pagination,
    });
});

albums.get('/:id', validator('param', paramSchema), async (c) => {
    const { id } = c.req.valid('param');

    const data = await db.query.album.findFirst({
        where: eq(album.album_id, id),
        with: {
            artist: true,
        },
    });

    return c.json({ data });
});

export default albums;
