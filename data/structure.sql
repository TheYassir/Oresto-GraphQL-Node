-- Deploy o-resto:init to pg
BEGIN;

DROP TABLE IF EXISTS "manager", "cooking_style", "city", "restaurant", "restaurant_has_cooking_style";

CREATE TABLE "manager" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "cooking_style" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "city" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL UNIQUE,
    "geopos" point NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "restaurant" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "terrace" BOOLEAN NOT NULL DEFAULT FALSE,
    "manager_id" INT NOT NULL REFERENCES "manager" ("id"),
    "city_id" INT NOT NULL REFERENCES "city" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "restaurant_has_cooking_style" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "restaurant_id" INT NOT NULL REFERENCES "restaurant" ("id"),
    "cooking_style_id" INT NOT NULL REFERENCES "cooking_style" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;
