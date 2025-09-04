import { Hono } from 'hono';
import db from '../db';

const app = new Hono();

app.get('/', async (c) => {
    const albums = await db.query.album.findMany({
        with: {
            artist: true,
        },
    });

    return c.json(albums);
});

export default app;
