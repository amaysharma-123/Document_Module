import "reflect-metadata"; // TypeORM reads that metadata. Without this import: Decorators like @Entity() will not work. 
import { DataSource } from "typeorm"; // DataSource represents database connection. 
import { DocumentEntity } from "./entities/DocumentEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "document_user",
  password: "document_pass",
  database: "document_db",
  synchronize: false, // IMPORTANT
  logging: false,
  entities: [DocumentEntity],
  migrations: ["dist/app/persistence/migrations/*.js"],
});

