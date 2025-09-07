import { Hono } from 'hono';
import snakeCasePropsMiddleware from '@/middleware/snakeCaseProps';
import albums from '@/routes/albums';
import artists from '@/routes/artists';

const api = new Hono();

api.use(snakeCasePropsMiddleware);

api.get('/health', (c) => {
    return c.json({
        status: 'ok',
        message: 'API is healthy',
    });
});

api.route('/albums', albums);
api.route('/artists', artists);

export default {
    port: process.env.PORT || 3000,
    fetch: api.fetch,
};
