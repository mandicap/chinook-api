import { Hono } from 'hono';
import { validator } from 'hono-openapi';
import db from '@/db';
import { album } from '@/db/schema';
import { getPageUrls, validateDynamicQueryParams } from '@/utils/helpers';
import { querySchema } from '@/utils/schema';

const albums = new Hono();

albums.get('/', validator('query', querySchema), async (c) => {
    const query = c.req.valid('query');

    const { validatedQuery, totalItems, totalPages } = await validateDynamicQueryParams(query, querySchema, album);

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
