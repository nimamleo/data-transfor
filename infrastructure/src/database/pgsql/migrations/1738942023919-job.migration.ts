import { MigrationInterface, QueryRunner } from "typeorm";

export class Job1738942023919 implements MigrationInterface {
    name = 'Job1738942023919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jobs" ("id" BIGSERIAL NOT NULL, "customId" bigint NOT NULL, "title" character varying(255) NOT NULL, "minSalary" integer NOT NULL, "maxSalary" integer NOT NULL, "currency" character varying NOT NULL, "experience" integer, "position" character varying NOT NULL, "companyId" bigint NOT NULL, "requirements" character varying array NOT NULL, "postedDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7c61b7636bb04cdcc654b561e75" UNIQUE ("customId"), CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_00f1309a74e7cc6d028d3f63e8" ON "jobs" ("title") `);
        await queryRunner.query(`CREATE TABLE "companies" ("id" BIGSERIAL NOT NULL, "name" character varying(255) NOT NULL, "website" character varying(255), "industry" character varying(255) NOT NULL, "city" character varying(100) NOT NULL, "state" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3dacbb3eb4f095e29372ff8e131" UNIQUE ("name"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_00f1309a74e7cc6d028d3f63e8"`);
        await queryRunner.query(`DROP TABLE "jobs"`);
    }

}
