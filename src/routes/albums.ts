import { Hono } from 'hono';
import { validator } from 'hono-openapi';
import db from '@/db';
import { album } from '@/db/schema';
import paginationMiddleware from '@/middleware/pagination';
import { querySchema } from '@/utils/schema';

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

export default albums;
