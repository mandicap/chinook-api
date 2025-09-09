import { Hono } from 'hono';
import snakeCasePropsMiddleware from '@/middleware/snakeCaseProps';
import albums from '@/routes/albums';
import artists from '@/routes/artists';
import genres from '@/routes/genres';
import mediaTypes from '@/routes/mediaTypes';

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
api.route('/genres', genres);
api.route('/media-types', mediaTypes);

export default {
    port: process.env.PORT || 3000,
    fetch: api.fetch,
};
