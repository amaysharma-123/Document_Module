import type { Document } from "../../contracts/states/document";
export declare class TypeOrmDocumentRepo {
    save(document: Document): Promise<void>;
    findById(id: string): Promise<Document | null>;
    searchByTitle(title?: string): Promise<Document[]>;
}
//# sourceMappingURL=TypeOrmDocumentRepo.d.ts.map