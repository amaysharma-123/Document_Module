import type {
  CreateDocumentCommand,
  Document,
  GetDocumentCommand,
  SearchDocumentCommand,
} from "../states/document";

export interface IDocumentServices {
  createDocument(command: CreateDocumentCommand): Promise<Document>;
  getDocument(command: GetDocumentCommand): Promise<Document | null>;
  searchDocument(command: SearchDocumentCommand): Promise<Document[]>;
  deleteDocument(id: string): Promise<void>;
  updateDocument(id: string, title: string): Promise<Document>;
}
