import type { IDocumentServices } from "../../contracts/services/IDocumentServices";
import type { Document, CreateDocumentCommand, GetDocumentCommand, SearchDocumentCommand } from "../../contracts/states/document";
import { TypeOrmDocumentRepo } from "../repos/TypeOrmDocumentRepo";
export declare class DocumentServices implements IDocumentServices {
    private readonly repo;
    constructor(repo: TypeOrmDocumentRepo);
    createDocument(command: CreateDocumentCommand): Promise<Document>;
    getDocument(command: GetDocumentCommand): Promise<Document | null>;
    searchDocument(command: SearchDocumentCommand): Promise<Document[]>;
    updateDocument(id: string, title: string): Promise<Document>;
    deleteDocument(id: string): Promise<void>;
}
//# sourceMappingURL=DocumentServices.d.ts.map