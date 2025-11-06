CREATE TYPE "public"."culinary_type" AS ENUM('food', 'drink', 'beverage');--> statement-breakpoint
CREATE TABLE "category" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "culinary" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"description" text NOT NULL,
	"type" "culinary_type" NOT NULL,
	"province_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "culinary_category" (
	"culinary_id" text NOT NULL,
	"category_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "culinary_category_culinary_id_category_id_pk" PRIMARY KEY("culinary_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "province" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recipe" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"ingredients" text NOT NULL,
	"steps" text NOT NULL,
	"culinary_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "culinary" ADD CONSTRAINT "culinary_province_id_province_id_fk" FOREIGN KEY ("province_id") REFERENCES "public"."province"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "culinary_category" ADD CONSTRAINT "culinary_category_culinary_id_culinary_id_fk" FOREIGN KEY ("culinary_id") REFERENCES "public"."culinary"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "culinary_category" ADD CONSTRAINT "culinary_category_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_culinary_id_culinary_id_fk" FOREIGN KEY ("culinary_id") REFERENCES "public"."culinary"("id") ON DELETE cascade ON UPDATE no action;