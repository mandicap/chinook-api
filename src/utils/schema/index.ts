import { createSelectSchema } from 'drizzle-zod';
import z from 'zod';
import { album, artist, genre, media_type, playlist, track } from '@/db/schema';
import { snakeCaseSchema } from '@/utils/helpers';

export const querySchema = z.object({
    limit: z.coerce.number().optional(),
    page: z.coerce.number().optional(),
});

export const paramSchema = z.object({
    id: z.coerce.number(),
});

export const paginationSchema = snakeCaseSchema(
    z.object({
        currentPage: z.number(),
        perPage: z.number(),
        totalItems: z.number(),
        totalPages: z.number(),
        prevPageUrl: z.string().nullable(),
        nextPageUrl: z.string().nullable(),
    }),
);

export const artistSchema = createSelectSchema(artist);

export const albumSchema = createSelectSchema(album).extend({
    artist: artistSchema,
});

export const genreSchema = createSelectSchema(genre);
export const mediaTypeSchema = createSelectSchema(media_type);
export const playlistSchema = createSelectSchema(playlist);

export const trackSchema = createSelectSchema(track).extend({
    album: albumSchema,
    genre: genreSchema,
    media_type: mediaTypeSchema,
});
