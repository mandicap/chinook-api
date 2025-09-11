import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { type DescribeRouteOptions, describeRoute, resolver, validator } from 'hono-openapi';
import z from 'zod';
import db from '@/db';
import { artist } from '@/db/schema';
import paginationMiddleware from '@/middleware/paginationMiddleware';
import { artistSchema, paginationSchema, paramSchema, querySchema } from '@/utils/schema';

const artists = new Hono();

const paginatedResponseSchema = z.object({
    data: z.array(artistSchema),
    pagination: paginationSchema,
});

const getArtists: DescribeRouteOptions = {
    operationId: 'getArtists',
    responses: {
        200: {
            description: 'Successful response',
            content: {
                'application/json': {
                    schema: resolver(paginatedResponseSchema),
                },
            },
        },
    },
};

artists.get(
    '/',
    describeRoute(getArtists),
    validator('query', querySchema),
    paginationMiddleware(artist),
    async (c) => {
        const { offset, ...pagination } = c.get('pagination');

        const artists = await db.query.artist.findMany({
            limit: pagination.perPage,
            offset,
        });

        return c.json({
            data: artists,
            pagination,
        });
    },
);

const getArtistByID: DescribeRouteOptions = {
    operationId: 'getArtistByID',
    responses: {
        200: {
            description: 'Successful response',
            content: {
                'application/json': {
                    schema: resolver(artistSchema),
                },
            },
        },
    },
};

artists.get('/:id', describeRoute(getArtistByID), validator('param', paramSchema), async (c) => {
    const { id } = c.req.valid('param');

    const data = await db.query.artist.findFirst({
        where: eq(artist.artist_id, id),
    });

    return c.json({ data });
});

export default artists;
