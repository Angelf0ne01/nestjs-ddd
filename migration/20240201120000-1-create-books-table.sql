--liquibase formatted sql
--changeset firstname.lastname:7 labels: books-table context: create books table

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "books" (
  "id" UUID DEFAULT uuid_generate_v4() NOT NULL, 
  "title" VARCHAR NOT NULL,
  "created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  "deleted_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
  CONSTRAINT "PK_Books" PRIMARY KEY ("id")
);

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO "skeleton_service";