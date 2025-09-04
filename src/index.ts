import { Hono } from 'hono';
import albums from './routes/albums';

const app = new Hono();

app.get('/', (c) => {
    return c.text('Hello Hono!');
});

app.route('/albums', albums);

export default {
    port: process.env.PORT || 3000,
    fetch: app.fetch,
};
