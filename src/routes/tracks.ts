import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { type DescribeRouteOptions, describeRoute, resolver, validator } from 'hono-openapi';
import z from 'zod';
import db from '@/db';
import { track } from '@/db/schema';
import paginationMiddleware from '@/middleware/paginationMiddleware';
import { paginationSchema, paramSchema, querySchema, trackSchema } from '@/utils/schema';

const tracks = new Hono();

const paginatedResponseSchema = z.object({
    data: z.array(trackSchema),
    pagination: paginationSchema,
});

const getTracks: DescribeRouteOptions = {
    operationId: 'getTracks',
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

tracks.get('/', describeRoute(getTracks), validator('query', querySchema), paginationMiddleware(track), async (c) => {
    const { offset, ...pagination } = c.get('pagination');

    const tracks = await db.query.track.findMany({
        orderBy: (album, { asc }) => asc(album.album_id),
        with: {
            album: {
                with: {
                    artist: true,
                },
            },
            genre: true,
            media_type: true,
        },
        limit: pagination.perPage,
        offset,
    });

    return c.json({
        data: tracks,
        pagination,
    });
});

const getTrackByID: DescribeRouteOptions = {
    operationId: 'getTrackByID',
    responses: {
        200: {
            description: 'Successful response',
            content: {
                'application/json': {
                    schema: resolver(trackSchema),
                },
            },
        },
    },
};

tracks.get('/:id', describeRoute(getTrackByID), validator('param', paramSchema), async (c) => {
    const { id } = c.req.valid('param');

    const data = await db.query.track.findFirst({
        where: eq(track.track_id, id),
        with: {
            album: {
                with: {
                    artist: true,
                },
            },
            genre: true,
            media_type: true,
        },
    });

    return c.json(data);
});

export default tracks;
