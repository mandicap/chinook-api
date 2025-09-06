import { sql } from 'drizzle-orm';
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
    artist_id: integer().primaryKey().notNull(),
    name: varchar({ length: 120 }),
});

export const album = pgTable(
    'album',
    {
        album_id: integer().primaryKey().notNull(),
        title: varchar({ length: 160 }).notNull(),
        artist_id: integer().notNull(),
    },
    (table) => [
        index('album_artist_id_idx').using(
            'btree',
            table.artist_id.asc().nullsLast().op('int4_ops'),
        ),
        foreignKey({
            columns: [table.artist_id],
            foreignColumns: [artist.artist_id],
            name: 'album_artist_id_fkey',
        }),
    ],
);

export const employee = pgTable(
    'employee',
    {
        employee_id: integer().primaryKey().notNull(),
        last_name: varchar({ length: 20 }).notNull(),
        first_name: varchar({ length: 20 }).notNull(),
        title: varchar({ length: 30 }),
        reports_to: integer(),
        birth_date: timestamp({ mode: 'string' }),
        hire_date: timestamp({ mode: 'string' }),
        address: varchar({ length: 70 }),
        city: varchar({ length: 40 }),
        state: varchar({ length: 40 }),
        country: varchar({ length: 40 }),
        postal_code: varchar({ length: 10 }),
        phone: varchar({ length: 24 }),
        fax: varchar({ length: 24 }),
        email: varchar({ length: 60 }),
    },
    (table) => [
        index('employee_reports_to_idx').using(
            'btree',
            table.reports_to.asc().nullsLast().op('int4_ops'),
        ),
        foreignKey({
            columns: [table.reports_to],
            foreignColumns: [table.employee_id],
            name: 'employee_reports_to_fkey',
        }),
    ],
);

export const customer = pgTable(
    'customer',
    {
        customer_id: integer().primaryKey().notNull(),
        first_name: varchar({ length: 40 }).notNull(),
        last_name: varchar({ length: 20 }).notNull(),
        company: varchar({ length: 80 }),
        address: varchar({ length: 70 }),
        city: varchar({ length: 40 }),
        state: varchar({ length: 40 }),
        country: varchar({ length: 40 }),
        postal_code: varchar({ length: 10 }),
        phone: varchar({ length: 24 }),
        fax: varchar({ length: 24 }),
        email: varchar({ length: 60 }).notNull(),
        support_rep_id: integer(),
    },
    (table) => [
        index('customer_support_rep_id_idx').using(
            'btree',
            table.support_rep_id.asc().nullsLast().op('int4_ops'),
        ),
        foreignKey({
            columns: [table.support_rep_id],
            foreignColumns: [employee.employee_id],
            name: 'customer_support_rep_id_fkey',
        }),
    ],
);

export const invoice = pgTable(
    'invoice',
    {
        invoice_id: integer().primaryKey().notNull(),
        customer_id: integer().notNull(),
        invoice_date: timestamp({ mode: 'string' }).notNull(),
        billing_address: varchar({ length: 70 }),
        billing_city: varchar({ length: 40 }),
        billing_state: varchar({ length: 40 }),
        billing_country: varchar({ length: 40 }),
        billing_postal_code: varchar({ length: 10 }),
        total: numeric({ precision: 10, scale: 2 }).notNull(),
    },
    (table) => [
        index('invoice_customer_id_idx').using(
            'btree',
            table.customer_id.asc().nullsLast().op('int4_ops'),
        ),
        foreignKey({
            columns: [table.customer_id],
            foreignColumns: [customer.customer_id],
            name: 'invoice_customer_id_fkey',
        }),
    ],
);

export const invoice_line = pgTable(
    'invoice_line',
    {
        invoice_line_id: integer().primaryKey().notNull(),
        invoice_id: integer().notNull(),
        track_id: integer().notNull(),
        unit_price: numeric({ precision: 10, scale: 2 }).notNull(),
        quantity: integer().notNull(),
    },
    (table) => [
        index('invoice_line_invoice_id_idx').using(
            'btree',
            table.invoice_id.asc().nullsLast().op('int4_ops'),
        ),
        index('invoice_line_track_id_idx').using(
            'btree',
            table.track_id.asc().nullsLast().op('int4_ops'),
        ),
        foreignKey({
            columns: [table.invoice_id],
            foreignColumns: [invoice.invoice_id],
            name: 'invoice_line_invoice_id_fkey',
        }),
        foreignKey({
            columns: [table.track_id],
            foreignColumns: [track.track_id],
            name: 'invoice_line_track_id_fkey',
        }),
    ],
);

export const track = pgTable(
    'track',
    {
        track_id: integer().primaryKey().notNull(),
        name: varchar({ length: 200 }).notNull(),
        album_id: integer(),
        media_type_id: integer().notNull(),
        genre_id: integer(),
        composer: varchar({ length: 220 }),
        milliseconds: integer().notNull(),
        bytes: integer(),
        unit_price: numeric({ precision: 10, scale: 2 }).notNull(),
    },
    (table) => [
        index('track_album_id_idx').using(
            'btree',
            table.album_id.asc().nullsLast().op('int4_ops'),
        ),
        index('track_genre_id_idx').using(
            'btree',
            table.genre_id.asc().nullsLast().op('int4_ops'),
        ),
        index('track_media_type_id_idx').using(
            'btree',
            table.media_type_id.asc().nullsLast().op('int4_ops'),
        ),
        foreignKey({
            columns: [table.album_id],
            foreignColumns: [album.album_id],
            name: 'track_album_id_fkey',
        }),
        foreignKey({
            columns: [table.genre_id],
            foreignColumns: [genre.genre_id],
            name: 'track_genre_id_fkey',
        }),
        foreignKey({
            columns: [table.media_type_id],
            foreignColumns: [media_type.media_type_id],
            name: 'track_media_type_id_fkey',
        }),
    ],
);

export const playlist = pgTable('playlist', {
    playlist_id: integer().primaryKey().notNull(),
    name: varchar({ length: 120 }),
});

export const genre = pgTable('genre', {
    genre_id: integer().primaryKey().notNull(),
    name: varchar({ length: 120 }),
});

export const media_type = pgTable('media_type', {
    media_type_id: integer().primaryKey().notNull(),
    name: varchar({ length: 120 }),
});

export const playlist_track = pgTable(
    'playlist_track',
    {
        playlist_id: integer().notNull(),
        track_id: integer().notNull(),
    },
    (table) => [
        index('playlist_track_playlist_id_idx').using(
            'btree',
            table.playlist_id.asc().nullsLast().op('int4_ops'),
        ),
        index('playlist_track_track_id_idx').using(
            'btree',
            table.track_id.asc().nullsLast().op('int4_ops'),
        ),
        foreignKey({
            columns: [table.playlist_id],
            foreignColumns: [playlist.playlist_id],
            name: 'playlist_track_playlist_id_fkey',
        }),
        foreignKey({
            columns: [table.track_id],
            foreignColumns: [track.track_id],
            name: 'playlist_track_track_id_fkey',
        }),
        primaryKey({
            columns: [table.playlist_id, table.track_id],
            name: 'playlist_track_pkey',
        }),
    ],
);
