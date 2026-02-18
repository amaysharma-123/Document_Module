"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmDocumentRepo = void 0;
const datasource_1 = require("../persistence/datasource");
const DocumentEntity_1 = require("../persistence/entities/DocumentEntity");
class TypeOrmDocumentRepo {
    async save(document) {
        const repo = datasource_1.AppDataSource.getRepository(DocumentEntity_1.DocumentEntity);
        const entity = repo.create({
            id: document.id,
            title: document.title,
            type: document.type,
            status: document.status,
            active: document.active,
        });
        await repo.save(entity);
    }
    async findById(id) {
        const repo = datasource_1.AppDataSource.getRepository(DocumentEntity_1.DocumentEntity);
        const entity = await repo.findOneBy({ id, active: true });
        if (!entity) {
            return null;
        }
        return {
            id: entity.id,
            title: entity.title,
            type: entity.type,
            status: entity.status,
            active: entity.active,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
    async searchByTitle(title) {
        const repo = datasource_1.AppDataSource.getRepository(DocumentEntity_1.DocumentEntity);
        const entities = title
            ? await repo
                .createQueryBuilder("d")
                .where("d.active = true AND d.title ILIKE :title", {
                title: `%${title}%`,
            })
                .getMany()
            : await repo.findBy({ active: true });
        return entities.map(entity => ({
            id: entity.id,
            title: entity.title,
            type: entity.type,
            status: entity.status,
            active: entity.active,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        }));
    }
}
exports.TypeOrmDocumentRepo = TypeOrmDocumentRepo;
//# sourceMappingURL=TypeOrmDocumentRepo.js.map