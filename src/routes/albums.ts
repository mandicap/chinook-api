import { Hono } from 'hono';
import { validator } from 'hono-openapi';
import db from '@/db';
import { querySchema } from '@/utils/schema';

const app = new Hono();

app.get('/', validator('query', querySchema), async (c) => {
    const { limit, page } = c.req.valid('query');
    const offset = (page - 1) * limit;

    const albums = await db.query.album.findMany({
        with: {
            artist: true,
        },
        limit,
        offset,
    });

    return c.json(albums);
});

export default app;
