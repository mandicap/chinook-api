import { Hono } from 'hono';
import { validator } from 'hono-openapi';
import z from 'zod';
import db from '@/db';
import { album } from '@/db/schema';
import { getDynamicLimits, getPageUrls } from '@/utils/helpers';
import { querySchema } from '@/utils/schema';

const albums = new Hono();

albums.get('/', validator('query', querySchema), async (c) => {
    const query = c.req.valid('query');
    const { limit } = query;

    const { totalItems, totalPages } = await getDynamicLimits(album, limit);

    const dynamicQuerySchema = querySchema.extend({
        limit: z.number().max(totalItems).optional().default(10),
        page: z.number().max(totalPages).optional().default(1),
    });

    const validatedQuery = dynamicQuerySchema.safeParse(query);
    if (!validatedQuery.success) {
        return c.json({
            name: 'Validation Error',
            message: validatedQuery.error.issues,
        });
    }

    const { limit: perPage, page: currentPage } = validatedQuery.data;
    const offset = (currentPage - 1) * perPage;

    const albums = await db.query.album.findMany({
        with: {
            artist: true,
        },
        limit: perPage,
        offset,
    });

    const { prevPageUrl, nextPageUrl } = getPageUrls(c.req.path, currentPage);

    return c.json({
        data: albums,
        pagination: {
            currentPage,
            perPage,
            totalPages,
            totalItems,
            nextPageUrl,
            prevPageUrl,
        },
    });
});

export default albums;
