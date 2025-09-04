import { relations } from 'drizzle-orm/relations';
import {
    album,
    artist,
    customer,
    employee,
    genre,
    invoice,
    invoiceLine,
    mediaType,
    playlist,
    playlistTrack,
    track,
} from './schema';

export const albumRelations = relations(album, ({ one, many }) => ({
    artist: one(artist, {
        fields: [album.artistId],
        references: [artist.artistId],
    }),
    tracks: many(track),
}));

export const artistRelations = relations(artist, ({ many }) => ({
    albums: many(album),
}));

export const employeeRelations = relations(employee, ({ one, many }) => ({
    employee: one(employee, {
        fields: [employee.reportsTo],
        references: [employee.employeeId],
        relationName: 'employee_reportsTo_employee_employeeId',
    }),
    employees: many(employee, {
        relationName: 'employee_reportsTo_employee_employeeId',
    }),
    customers: many(customer),
}));

export const customerRelations = relations(customer, ({ one, many }) => ({
    employee: one(employee, {
        fields: [customer.supportRepId],
        references: [employee.employeeId],
    }),
    invoices: many(invoice),
}));

export const invoiceRelations = relations(invoice, ({ one, many }) => ({
    customer: one(customer, {
        fields: [invoice.customerId],
        references: [customer.customerId],
    }),
    invoiceLines: many(invoiceLine),
}));

export const invoiceLineRelations = relations(invoiceLine, ({ one }) => ({
    invoice: one(invoice, {
        fields: [invoiceLine.invoiceId],
        references: [invoice.invoiceId],
    }),
    track: one(track, {
        fields: [invoiceLine.trackId],
        references: [track.trackId],
    }),
}));

export const trackRelations = relations(track, ({ one, many }) => ({
    invoiceLines: many(invoiceLine),
    album: one(album, {
        fields: [track.albumId],
        references: [album.albumId],
    }),
    genre: one(genre, {
        fields: [track.genreId],
        references: [genre.genreId],
    }),
    mediaType: one(mediaType, {
        fields: [track.mediaTypeId],
        references: [mediaType.mediaTypeId],
    }),
    playlistTracks: many(playlistTrack),
}));

export const genreRelations = relations(genre, ({ many }) => ({
    tracks: many(track),
}));

export const mediaTypeRelations = relations(mediaType, ({ many }) => ({
    tracks: many(track),
}));

export const playlistTrackRelations = relations(playlistTrack, ({ one }) => ({
    playlist: one(playlist, {
        fields: [playlistTrack.playlistId],
        references: [playlist.playlistId],
    }),
    track: one(track, {
        fields: [playlistTrack.trackId],
        references: [track.trackId],
    }),
}));

export const playlistRelations = relations(playlist, ({ many }) => ({
    playlistTracks: many(playlistTrack),
}));
