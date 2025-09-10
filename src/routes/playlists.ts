import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { validator } from 'hono-openapi';
import db from '@/db';
import { playlist } from '@/db/schema';
import paginationMiddleware from '@/middleware/pagination';
import { paramSchema, querySchema } from '@/utils/schema';

const playlists = new Hono();

playlists.get('/', validator('query', querySchema), paginationMiddleware(playlist), async (c) => {
    const { offset, ...pagination } = c.get('pagination');

    const playlists = await db.query.playlist.findMany({
        limit: pagination.perPage,
        offset,
    });

    return c.json({
        data: playlists,
        pagination,
    });
});

playlists.get('/:id', validator('param', paramSchema), async (c) => {
    const { id } = c.req.valid('param');

    const data = await db.query.playlist.findFirst({
        where: eq(playlist.playlist_id, id),
    });

    return c.json({ data });
});

export default playlists;
