import { relations } from 'drizzle-orm/relations';
import {
    album,
    artist,
    customer,
    employee,
    genre,
    invoice,
    invoice_line,
    media_type,
    playlist,
    playlist_track,
    track,
} from './schema';

export const albumRelations = relations(album, ({ one, many }) => ({
    artist: one(artist, {
        fields: [album.artist_id],
        references: [artist.artist_id],
    }),
    tracks: many(track),
}));

export const artistRelations = relations(artist, ({ many }) => ({
    albums: many(album),
}));

export const employeeRelations = relations(employee, ({ one, many }) => ({
    employee: one(employee, {
        fields: [employee.reports_to],
        references: [employee.employee_id],
        relationName: 'employee_reports_to_employee_employee_id',
    }),
    employees: many(employee, {
        relationName: 'employee_reports_to_employee_employee_id',
    }),
    customers: many(customer),
}));

export const customerRelations = relations(customer, ({ one, many }) => ({
    employee: one(employee, {
        fields: [customer.support_rep_id],
        references: [employee.employee_id],
    }),
    invoices: many(invoice),
}));

export const invoiceRelations = relations(invoice, ({ one, many }) => ({
    customer: one(customer, {
        fields: [invoice.customer_id],
        references: [customer.customer_id],
    }),
    invoice_lines: many(invoice_line),
}));

export const invoice_lineRelations = relations(invoice_line, ({ one }) => ({
    invoice: one(invoice, {
        fields: [invoice_line.invoice_id],
        references: [invoice.invoice_id],
    }),
    track: one(track, {
        fields: [invoice_line.track_id],
        references: [track.track_id],
    }),
}));

export const trackRelations = relations(track, ({ one, many }) => ({
    invoice_lines: many(invoice_line),
    album: one(album, {
        fields: [track.album_id],
        references: [album.album_id],
    }),
    genre: one(genre, {
        fields: [track.genre_id],
        references: [genre.genre_id],
    }),
    media_type: one(media_type, {
        fields: [track.media_type_id],
        references: [media_type.media_type_id],
    }),
    playlist_tracks: many(playlist_track),
}));

export const genreRelations = relations(genre, ({ many }) => ({
    tracks: many(track),
}));

export const media_typeRelations = relations(media_type, ({ many }) => ({
    tracks: many(track),
}));

export const playlist_trackRelations = relations(playlist_track, ({ one }) => ({
    playlist: one(playlist, {
        fields: [playlist_track.playlist_id],
        references: [playlist.playlist_id],
    }),
    track: one(track, {
        fields: [playlist_track.track_id],
        references: [track.track_id],
    }),
}));

export const playlistRelations = relations(playlist, ({ many }) => ({
    playlist_tracks: many(playlist_track),
}));
