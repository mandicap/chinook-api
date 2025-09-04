import {
    foreignKey,
    index,
    integer,
    numeric,
    pgTable,
    primaryKey,
    timestamp,
    varchar,
} from 'drizzle-orm/pg-core';

export const artist = pgTable('artist', {
    artistId: integer('artist_id').primaryKey().notNull(),
    name: varchar({ length: 120 }),
});

export const album = pgTable(
    'album',
    {
        albumId: integer('album_id').primaryKey().notNull(),
        title: varchar({ length: 160 }).notNull(),
        artistId: integer('artist_id').notNull(),
    },
    (table) => [
        index('album_artist_id_idx').using(
            'btree',
            table.artistId.asc().nullsLast().op('int4_ops'),
        ),
        foreignKey({
            columns: [table.artistId],
            foreignColumns: [artist.artistId],
            name: 'album_artist_id_fkey',
        }),
    ],
);

export const employee = pgTable(
    'employee',
    {
        employeeId: integer('employee_id').primaryKey().notNull(),
        lastName: varchar('last_name', { length: 20 }).notNull(),
        firstName: varchar('first_name', { length: 20 }).notNull(),
        title: varchar({ length: 30 }),
        reportsTo: integer('reports_to'),
        birthDate: timestamp('birth_date', { mode: 'string' }),
        hireDate: timestamp('hire_date', { mode: 'string' }),
        address: varchar({ length: 70 }),
        city: varchar({ length: 40 }),
        state: varchar({ length: 40 }),
        country: varchar({ length: 40 }),
        postalCode: varchar('postal_code', { length: 10 }),
        phone: varchar({ length: 24 }),
        fax: varchar({ length: 24 }),
        email: varchar({ length: 60 }),
    },
    (table) => [
        index('employee_reports_to_idx').using(
            'btree',
            table.reportsTo.asc().nullsLast().op('int4_ops'),
        ),
        foreignKey({
            columns: [table.reportsTo],
            foreignColumns: [table.employeeId],
            name: 'employee_reports_to_fkey',
        }),
    ],
);

export const customer = pgTable(
    'customer',
    {
        customerId: integer('customer_id').primaryKey().notNull(),
        firstName: varchar('first_name', { length: 40 }).notNull(),
        lastName: varchar('last_name', { length: 20 }).notNull(),
        company: varchar({ length: 80 }),
        address: varchar({ length: 70 }),
        city: varchar({ length: 40 }),
        state: varchar({ length: 40 }),
        country: varchar({ length: 40 }),
        postalCode: varchar('postal_code', { length: 10 }),
        phone: varchar({ length: 24 }),
        fax: varchar({ length: 24 }),
        email: varchar({ length: 60 }).notNull(),
        supportRepId: integer('support_rep_id'),
    },
    (table) => [
        index('customer_support_rep_id_idx').using(
            'btree',
            table.supportRepId.asc().nullsLast().op('int4_ops'),
        ),
        foreignKey({
            columns: [table.supportRepId],
            foreignColumns: [employee.employeeId],
            name: 'customer_support_rep_id_fkey',
        }),
    ],
);

export const invoice = pgTable(
    'invoice',
    {
        invoiceId: integer('invoice_id').primaryKey().notNull(),
        customerId: integer('customer_id').notNull(),
        invoiceDate: timestamp('invoice_date', { mode: 'string' }).notNull(),
        billingAddress: varchar('billing_address', { length: 70 }),
        billingCity: varchar('billing_city', { length: 40 }),
        billingState: varchar('billing_state', { length: 40 }),
        billingCountry: varchar('billing_country', { length: 40 }),
        billingPostalCode: varchar('billing_postal_code', { length: 10 }),
        total: numeric({ precision: 10, scale: 2 }).notNull(),
    },
    (table) => [
        index('invoice_customer_id_idx').using(
            'btree',
            table.customerId.asc().nullsLast().op('int4_ops'),
        ),
        foreignKey({
            columns: [table.customerId],
            foreignColumns: [customer.customerId],
            name: 'invoice_customer_id_fkey',
        }),
    ],
);

export const invoiceLine = pgTable(
    'invoice_line',
    {
        invoiceLineId: integer('invoice_line_id').primaryKey().notNull(),
        invoiceId: integer('invoice_id').notNull(),
        trackId: integer('track_id').notNull(),
        unitPrice: numeric('unit_price', { precision: 10, scale: 2 }).notNull(),
        quantity: integer().notNull(),
    },
    (table) => [
        index('invoice_line_invoice_id_idx').using(
            'btree',
            table.invoiceId.asc().nullsLast().op('int4_ops'),
        ),
        index('invoice_line_track_id_idx').using(
            'btree',
            table.trackId.asc().nullsLast().op('int4_ops'),
        ),
        foreignKey({
            columns: [table.invoiceId],
            foreignColumns: [invoice.invoiceId],
            name: 'invoice_line_invoice_id_fkey',
        }),
        foreignKey({
            columns: [table.trackId],
            foreignColumns: [track.trackId],
            name: 'invoice_line_track_id_fkey',
        }),
    ],
);

export const track = pgTable(
    'track',
    {
        trackId: integer('track_id').primaryKey().notNull(),
        name: varchar({ length: 200 }).notNull(),
        albumId: integer('album_id'),
        mediaTypeId: integer('media_type_id').notNull(),
        genreId: integer('genre_id'),
        composer: varchar({ length: 220 }),
        milliseconds: integer().notNull(),
        bytes: integer(),
        unitPrice: numeric('unit_price', { precision: 10, scale: 2 }).notNull(),
    },
    (table) => [
        index('track_album_id_idx').using(
            'btree',
            table.albumId.asc().nullsLast().op('int4_ops'),
        ),
        index('track_genre_id_idx').using(
            'btree',
            table.genreId.asc().nullsLast().op('int4_ops'),
        ),
        index('track_media_type_id_idx').using(
            'btree',
            table.mediaTypeId.asc().nullsLast().op('int4_ops'),
        ),
        foreignKey({
            columns: [table.albumId],
            foreignColumns: [album.albumId],
            name: 'track_album_id_fkey',
        }),
        foreignKey({
            columns: [table.genreId],
            foreignColumns: [genre.genreId],
            name: 'track_genre_id_fkey',
        }),
        foreignKey({
            columns: [table.mediaTypeId],
            foreignColumns: [mediaType.mediaTypeId],
            name: 'track_media_type_id_fkey',
        }),
    ],
);

export const playlist = pgTable('playlist', {
    playlistId: integer('playlist_id').primaryKey().notNull(),
    name: varchar({ length: 120 }),
});

export const genre = pgTable('genre', {
    genreId: integer('genre_id').primaryKey().notNull(),
    name: varchar({ length: 120 }),
});

export const mediaType = pgTable('media_type', {
    mediaTypeId: integer('media_type_id').primaryKey().notNull(),
    name: varchar({ length: 120 }),
});

export const playlistTrack = pgTable(
    'playlist_track',
    {
        playlistId: integer('playlist_id').notNull(),
        trackId: integer('track_id').notNull(),
    },
    (table) => [
        index('playlist_track_playlist_id_idx').using(
            'btree',
            table.playlistId.asc().nullsLast().op('int4_ops'),
        ),
        index('playlist_track_track_id_idx').using(
            'btree',
            table.trackId.asc().nullsLast().op('int4_ops'),
        ),
        foreignKey({
            columns: [table.playlistId],
            foreignColumns: [playlist.playlistId],
            name: 'playlist_track_playlist_id_fkey',
        }),
        foreignKey({
            columns: [table.trackId],
            foreignColumns: [track.trackId],
            name: 'playlist_track_track_id_fkey',
        }),
        primaryKey({
            columns: [table.playlistId, table.trackId],
            name: 'playlist_track_pkey',
        }),
    ],
);
