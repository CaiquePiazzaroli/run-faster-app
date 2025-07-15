CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"longest_race" double precision,
	"created_at" timestamp DEFAULT now() NOT NULL
);
