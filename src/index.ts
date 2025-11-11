import { Hono } from 'hono';
import { openAPIRouteHandler } from 'hono-openapi';
import api from '@/api';

const port = process.env.APP_PORT || 3000;

const app = new Hono();

app.get('/health', async (c) =>
    c.json({
        status: 'ok',
        message: 'API healthy',
    }),
);

app.route('/', api);

app.get(
    '/openapi.json',
    openAPIRouteHandler(api, {
        documentation: {
            info: {
                title: 'Chinook',
                version: '1.0.0',
                description: 'An API for Chinook sample database.',
            },
            servers: [
                {
                    url: `http://localhost:${port}`,
                    description: 'Local Server',
                },
            ],
        },
    }),
);

export default {
    port,
    fetch: app.fetch,
};
