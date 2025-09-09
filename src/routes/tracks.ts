import { Hono } from 'hono';
import { validator } from 'hono-openapi';
import db from '@/db';
import { track } from '@/db/schema';
import paginationMiddleware from '@/middleware/pagination';
import { querySchema } from '@/utils/schema';

const tracks = new Hono();

tracks.get('/', validator('query', querySchema), paginationMiddleware(track), async (c) => {
    const {
        page: currentPage,
        limit: perPage,
        offset,
        totalItems,
        totalPages,
        prevPageUrl,
        nextPageUrl,
    } = c.get('pagination');

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
        limit: perPage,
        offset,
    });

    return c.json({
        data: tracks,
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

export default tracks;
