import { Hono } from 'hono';
import albums from '@/routes/albums';
import artists from '@/routes/artists';
import snakeCasePropsMiddleware from './middleware/snakeCaseProps';

const app = new Hono();

app.use(snakeCasePropsMiddleware);

app.get('/health', (c) => {
    return c.json({ status: 'ok', message: 'API is healthy' });
});

app.route('/albums', albums);
app.route('/artists', artists);

export default {
    port: process.env.PORT || 3000,
    fetch: app.fetch,
};
