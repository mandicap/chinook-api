import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { type DescribeRouteOptions, describeRoute, resolver, validator } from 'hono-openapi';
import z from 'zod';
import db from '@/db';
import { genre } from '@/db/schema';
import paginationMiddleware from '@/middleware/paginationMiddleware';
import { genreSchema, paginationSchema, paramSchema, querySchema } from '@/utils/schema';

const genres = new Hono();

const paginatedResponseSchema = z.object({
    data: z.array(genreSchema),
    pagination: paginationSchema,
});

const getGenres: DescribeRouteOptions = {
    operationId: 'getGenres',
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

genres.get('/', describeRoute(getGenres), validator('query', querySchema), paginationMiddleware(genre), async (c) => {
    const { offset, ...pagination } = c.get('pagination');

    const genres = await db.query.genre.findMany({
        limit: pagination.perPage,
        offset,
    });

    return c.json({
        data: genres,
        pagination,
    });
});

const getGenreByID: DescribeRouteOptions = {
    operationId: 'getGenreByID',
    responses: {
        200: {
            description: 'Successful response',
            content: {
                'application/json': {
                    schema: resolver(genreSchema),
                },
            },
        },
    },
};

genres.get('/:id', describeRoute(getGenreByID), validator('param', paramSchema), async (c) => {
    const { id } = c.req.valid('param');

    const data = await db.query.genre.findFirst({
        where: eq(genre.genre_id, id),
    });

    return c.json({ data });
});

export default genres;
