import { Hono } from 'hono';
import { validator } from 'hono-openapi';
import db from '@/db';
import { artist } from '@/db/schema';
import { getPageUrls, validateDynamicQueryParams } from '@/utils/helpers';
import { querySchema } from '@/utils/schema';

const artists = new Hono();

artists.get('/', validator('query', querySchema), async (c) => {
    const query = c.req.valid('query');

    const { validatedQuery, totalItems, totalPages } = await validateDynamicQueryParams(query, querySchema, artist);

    if (!validatedQuery.success) {
        return c.json({
            name: 'Validation Error',
            message: validatedQuery.error.issues,
        });
    }

    const { limit: perPage, page: currentPage } = validatedQuery.data as {
        limit: number;
        page: number;
    };
    const offset = (currentPage - 1) * perPage;

    const artists = await db.query.artist.findMany({
        limit: perPage,
        offset,
    });

    const { prevPageUrl, nextPageUrl } = getPageUrls(c.req.path, currentPage);

    return c.json({
        data: artists,
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

export default artists;
