import { MigrationInterface, QueryRunner } from "typeorm"; // MigrationInterface It forces your class to implement: up() and down(). 

export class InitMigration1771347708901 implements MigrationInterface {
    name = 'InitMigration1771347708901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "description"`);
    }

}
