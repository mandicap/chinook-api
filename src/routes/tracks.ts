import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { validator } from 'hono-openapi';
import db from '@/db';
import { track } from '@/db/schema';
import paginationMiddleware from '@/middleware/pagination';
import { paramSchema, querySchema } from '@/utils/schema';

const tracks = new Hono();

tracks.get('/', validator('query', querySchema), paginationMiddleware(track), async (c) => {
    const { offset, ...pagination } = c.get('pagination');

    const tracks = await db.query.track.findMany({
        orderBy: (album, { asc }) => asc(album.album_id),
        with: {
            album: {
                with: {
                    artist: true,
                },
            },
            genre: true,
            media_type: true,
        },
        limit: pagination.perPage,
        offset,
    });

    return c.json({
        data: tracks,
        pagination,
    });
});

tracks.get('/:id', validator('param', paramSchema), async (c) => {
    const { id } = c.req.valid('param');

    const data = await db.query.track.findFirst({
        where: eq(track.track_id, id),
        with: {
            album: {
                with: {
                    artist: true,
                },
            },
            genre: true,
            media_type: true,
        },
    });

    return c.json(data);
});

export default tracks;
