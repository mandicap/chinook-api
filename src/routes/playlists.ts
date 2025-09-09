import { Hono } from 'hono';
import { validator } from 'hono-openapi';
import db from '@/db';
import { playlist } from '@/db/schema';
import paginationMiddleware from '@/middleware/pagination';
import { querySchema } from '@/utils/schema';

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

export default playlists;
