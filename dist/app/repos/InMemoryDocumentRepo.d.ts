import type { Document } from "../../contracts/states/document";
export declare class InMemoryDocumentRepo {
    private documents;
    save(document: Document): Promise<void>;
    findById(id: string): Promise<Document | null>;
    searchByTitle(title?: string): Promise<Document[]>;
}
//# sourceMappingURL=InMemoryDocumentRepo.d.ts.map