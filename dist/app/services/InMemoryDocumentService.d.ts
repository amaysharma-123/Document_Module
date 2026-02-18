import type { IDocumentServices } from "../../contracts/services/IDocumentServices";
import { CreateDocumentCommand, Document, GetDocumentCommand, SearchDocumentCommand } from "../../contracts/states/document";
export declare class InMemoryDocumentService implements IDocumentServices {
    private readonly repo;
    constructor();
    createDocument(command: CreateDocumentCommand): Promise<Document>;
    getDocument(command: GetDocumentCommand): Promise<Document | null>;
    searchDocument(command: SearchDocumentCommand): Promise<Document[]>;
    deleteDocument(id: string): Promise<void>;
    updateDocument(id: string, title: string): Promise<Document>;
}
//# sourceMappingURL=InMemoryDocumentService.d.ts.map