import { Hono } from 'hono';
import { validator } from 'hono-openapi';
import db from '@/db';
import { track } from '@/db/schema';
import paginationMiddleware from '@/middleware/pagination';
import { querySchema } from '@/utils/schema';

const tracks = new Hono();

tracks.get('/', validator('query', querySchema), paginationMiddleware(track), async (c) => {
    const { offset, ...pagination } = c.get('pagination');

    const tracks = await db.query.track.findMany({
        orderBy: (album, { asc }) => asc(album.album_id),
        columns: {
            album_id: false,
            media_type_id: false,
            genre_id: false,
        },
        with: {
            album: {
                columns: {
                    artist_id: false,
                },
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

export default tracks;
