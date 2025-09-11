import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { type DescribeRouteOptions, describeRoute, resolver, validator } from 'hono-openapi';
import z from 'zod';
import db from '@/db';
import { album } from '@/db/schema';
import paginationMiddleware from '@/middleware/paginationMiddleware';
import {
    artistSchema,
    albumSchema as baseAlbumSchema,
    paginationSchema,
    paramSchema,
    querySchema,
} from '@/utils/schema';

const albums = new Hono();

const albumSchema = baseAlbumSchema.extend({
    artist: artistSchema,
});

const paginatedResponseSchema = z.object({
    data: albumSchema,
    pagination: paginationSchema,
});

const getAlbums: DescribeRouteOptions = {
    operationId: 'getAlbums',
    responses: {
        200: {
            description: 'Successful rseponse',
            content: {
                'application/json': {
                    schema: resolver(paginatedResponseSchema),
                },
            },
        },
    },
};

albums.get('/', describeRoute(getAlbums), validator('query', querySchema), paginationMiddleware(album), async (c) => {
    const { offset, ...pagination } = c.get('pagination');

    const albums = await db.query.album.findMany({
        with: {
            artist: true,
        },
        limit: pagination.perPage,
        offset,
    });

    return c.json({
        data: albums,
        pagination,
    });
});

const getAlbumByID: DescribeRouteOptions = {
    operationId: 'getAlbumByID',
    responses: {
        200: {
            description: 'Successful response',
            content: {
                'application/json': {
                    schema: resolver(albumSchema),
                },
            },
        },
    },
};

albums.get('/:id', describeRoute(getAlbumByID), validator('param', paramSchema), async (c) => {
    const { id } = c.req.valid('param');

    const data = await db.query.album.findFirst({
        where: eq(album.album_id, id),
        with: {
            artist: true,
        },
    });

    return c.json({ data });
});

export default albums;
