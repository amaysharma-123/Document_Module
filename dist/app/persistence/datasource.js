"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata"); // TypeORM reads that metadata. Without this import: Decorators like @Entity() will not work. 
const typeorm_1 = require("typeorm"); // DataSource represents database connection. 
const DocumentEntity_1 = require("./entities/DocumentEntity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "document_user",
    password: "document_pass",
    database: "document_db",
    synchronize: false, // IMPORTANT
    logging: false,
    entities: [DocumentEntity_1.DocumentEntity],
    migrations: ["dist/app/persistence/migrations/*.js"],
});
//# sourceMappingURL=datasource.js.map