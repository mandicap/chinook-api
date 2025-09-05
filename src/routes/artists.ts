import { Hono } from 'hono';
import { validator } from 'hono-openapi';
import db from '@/db';
import { artist } from '@/db/schema';
import { querySchema } from '@/utils/schema';

const artists = new Hono();

artists.get('/', validator('query', querySchema), async (c) => {
    const { limit, page } = c.req.valid('query');
    const offset = (page - 1) * limit;

    const totalItems = await db.$count(artist);
    const totalPages = Math.ceil(totalItems / limit);

    const artists = await db.query.artist.findMany({
        limit,
        offset,
    });

    return c.json({
        data: artists,
        pagination: {
            currentPage: page,
            perPage: limit,
            totalPages,
            totalItems,
        },
    });
});

export default artists;
