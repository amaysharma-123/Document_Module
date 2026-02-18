import type { DocStatusType, DocType, Document } from "../../contracts/states/document";
import { AppDataSource } from "../persistence/datasource";
import { DocumentEntity } from "../persistence/entities/DocumentEntity";

export class TypeOrmDocumentRepo  {

  async save(document: Document): Promise<void> {
    const repo = AppDataSource.getRepository(DocumentEntity);

    const entity = repo.create({
      id: document.id,
      title: document.title,
      type: document.type,
      status: document.status,
      active: document.active,
    });

    await repo.save(entity);
  }

  async findById(id: string): Promise<Document | null> {
    const repo = AppDataSource.getRepository(DocumentEntity);

    const entity = await repo.findOneBy({ id, active: true });

    if (!entity) {
      return null;
    }

    return {
      id: entity.id,
      title: entity.title,
      type: entity.type as DocType,
      status: entity.status as DocStatusType,
      active: entity.active,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async searchByTitle(title?: string): Promise<Document[]> {
    const repo = AppDataSource.getRepository(DocumentEntity);

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
      type: entity.type as DocType,
      status: entity.status as DocStatusType,
      active: entity.active,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    }));
  }
}
