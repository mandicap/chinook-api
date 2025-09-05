import { Hono } from 'hono';
import albums from '@/routes/albums';

const app = new Hono();

app.get('/health', (c) => {
    return c.json({ status: 'ok', message: 'API is healthy' });
});

app.route('/albums', albums);

export default {
    port: process.env.PORT || 3000,
    fetch: app.fetch,
};
