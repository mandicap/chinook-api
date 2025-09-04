CREATE TABLE "album" (
	"album_id" integer PRIMARY KEY NOT NULL,
	"title" varchar(160) NOT NULL,
	"artist_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "artist" (
	"artist_id" integer PRIMARY KEY NOT NULL,
	"name" varchar(120)
);
--> statement-breakpoint
CREATE TABLE "customer" (
	"customer_id" integer PRIMARY KEY NOT NULL,
	"first_name" varchar(40) NOT NULL,
	"last_name" varchar(20) NOT NULL,
	"company" varchar(80),
	"address" varchar(70),
	"city" varchar(40),
	"state" varchar(40),
	"country" varchar(40),
	"postal_code" varchar(10),
	"phone" varchar(24),
	"fax" varchar(24),
	"email" varchar(60) NOT NULL,
	"support_rep_id" integer
);
--> statement-breakpoint
CREATE TABLE "employee" (
	"employee_id" integer PRIMARY KEY NOT NULL,
	"last_name" varchar(20) NOT NULL,
	"first_name" varchar(20) NOT NULL,
	"title" varchar(30),
	"reports_to" integer,
	"birth_date" timestamp,
	"hire_date" timestamp,
	"address" varchar(70),
	"city" varchar(40),
	"state" varchar(40),
	"country" varchar(40),
	"postal_code" varchar(10),
	"phone" varchar(24),
	"fax" varchar(24),
	"email" varchar(60)
);
--> statement-breakpoint
CREATE TABLE "genre" (
	"genre_id" integer PRIMARY KEY NOT NULL,
	"name" varchar(120)
);
--> statement-breakpoint
CREATE TABLE "invoice" (
	"invoice_id" integer PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"invoice_date" timestamp NOT NULL,
	"billing_address" varchar(70),
	"billing_city" varchar(40),
	"billing_state" varchar(40),
	"billing_country" varchar(40),
	"billing_postal_code" varchar(10),
	"total" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoice_line" (
	"invoice_line_id" integer PRIMARY KEY NOT NULL,
	"invoice_id" integer NOT NULL,
	"track_id" integer NOT NULL,
	"unit_price" numeric(10, 2) NOT NULL,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_type" (
	"media_type_id" integer PRIMARY KEY NOT NULL,
	"name" varchar(120)
);
--> statement-breakpoint
CREATE TABLE "playlist" (
	"playlist_id" integer PRIMARY KEY NOT NULL,
	"name" varchar(120)
);
--> statement-breakpoint
CREATE TABLE "playlist_track" (
	"playlist_id" integer NOT NULL,
	"track_id" integer NOT NULL,
	CONSTRAINT "playlist_track_pkey" PRIMARY KEY("playlist_id","track_id")
);
--> statement-breakpoint
CREATE TABLE "track" (
	"track_id" integer PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"album_id" integer,
	"media_type_id" integer NOT NULL,
	"genre_id" integer,
	"composer" varchar(220),
	"milliseconds" integer NOT NULL,
	"bytes" integer,
	"unit_price" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "album" ADD CONSTRAINT "album_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "public"."artist"("artist_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer" ADD CONSTRAINT "customer_support_rep_id_fkey" FOREIGN KEY ("support_rep_id") REFERENCES "public"."employee"("employee_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee" ADD CONSTRAINT "employee_reports_to_fkey" FOREIGN KEY ("reports_to") REFERENCES "public"."employee"("employee_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("customer_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice_line" ADD CONSTRAINT "invoice_line_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoice"("invoice_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice_line" ADD CONSTRAINT "invoice_line_track_id_fkey" FOREIGN KEY ("track_id") REFERENCES "public"."track"("track_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "playlist_track" ADD CONSTRAINT "playlist_track_playlist_id_fkey" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlist"("playlist_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "playlist_track" ADD CONSTRAINT "playlist_track_track_id_fkey" FOREIGN KEY ("track_id") REFERENCES "public"."track"("track_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "track" ADD CONSTRAINT "track_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "public"."album"("album_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "track" ADD CONSTRAINT "track_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "public"."genre"("genre_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "track" ADD CONSTRAINT "track_media_type_id_fkey" FOREIGN KEY ("media_type_id") REFERENCES "public"."media_type"("media_type_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "album_artist_id_idx" ON "album" USING btree ("artist_id" int4_ops);--> statement-breakpoint
CREATE INDEX "customer_support_rep_id_idx" ON "customer" USING btree ("support_rep_id" int4_ops);--> statement-breakpoint
CREATE INDEX "employee_reports_to_idx" ON "employee" USING btree ("reports_to" int4_ops);--> statement-breakpoint
CREATE INDEX "invoice_customer_id_idx" ON "invoice" USING btree ("customer_id" int4_ops);--> statement-breakpoint
CREATE INDEX "invoice_line_invoice_id_idx" ON "invoice_line" USING btree ("invoice_id" int4_ops);--> statement-breakpoint
CREATE INDEX "invoice_line_track_id_idx" ON "invoice_line" USING btree ("track_id" int4_ops);--> statement-breakpoint
CREATE INDEX "playlist_track_playlist_id_idx" ON "playlist_track" USING btree ("playlist_id" int4_ops);--> statement-breakpoint
CREATE INDEX "playlist_track_track_id_idx" ON "playlist_track" USING btree ("track_id" int4_ops);--> statement-breakpoint
CREATE INDEX "track_album_id_idx" ON "track" USING btree ("album_id" int4_ops);--> statement-breakpoint
CREATE INDEX "track_genre_id_idx" ON "track" USING btree ("genre_id" int4_ops);--> statement-breakpoint
CREATE INDEX "track_media_type_id_idx" ON "track" USING btree ("media_type_id" int4_ops);