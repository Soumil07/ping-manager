import type {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1611046992900 implements MigrationInterface {
    name = 'InitialMigration1611046992900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role_entity" ("id" character varying(19) NOT NULL, "cooldown" integer NOT NULL, "guild_id" character varying(19) NOT NULL, CONSTRAINT "PK_7bc1bd2364b6e9bf7c84b1e52e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."schedule" ("id" SERIAL NOT NULL, "task_id" character varying NOT NULL, "time" TIMESTAMP NOT NULL, "recurring" character varying DEFAULT null, "catch_up" boolean NOT NULL DEFAULT true, "data" jsonb NOT NULL, CONSTRAINT "PK_7ae10507a97b3a77d13d1a2bdd2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public"."schedule"`);
        await queryRunner.query(`DROP TABLE "role_entity"`);
    }

}
