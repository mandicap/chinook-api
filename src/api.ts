import { Hono } from 'hono';
import snakeCaseKeysMiddleware from '@/middleware/snakeCaseKeysMiddleware';
import albums from '@/routes/albums';
import artists from '@/routes/artists';
import genres from '@/routes/genres';
import mediaTypes from '@/routes/mediaTypes';
import playlists from '@/routes/playlists';
import tracks from '@/routes/tracks';

const api = new Hono().basePath('/api');

api.use(snakeCaseKeysMiddleware);

api.route('/albums', albums);
api.route('/artists', artists);
api.route('/genres', genres);
api.route('/media-types', mediaTypes);
api.route('/playlists', playlists);
api.route('/tracks', tracks);

export default api;
