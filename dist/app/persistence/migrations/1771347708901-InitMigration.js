"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitMigration1771347708901 = void 0;
class InitMigration1771347708901 {
    name = 'InitMigration1771347708901';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "documents" ADD "description" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "description"`);
    }
}
exports.InitMigration1771347708901 = InitMigration1771347708901;
//# sourceMappingURL=1771347708901-InitMigration.js.map