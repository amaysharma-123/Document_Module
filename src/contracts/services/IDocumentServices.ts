import type {
  CreateDocumentCommand,
  DeleteDocumentCommand,
  Document,
  GetDocumentCommand,
  SearchDocumentCommand,
  UpdateDocumentCommand,
} from "../states/document";

export interface IDocumentServices {
  createDocument(command: CreateDocumentCommand): Promise<Document>;
  getDocument(command: GetDocumentCommand): Promise<Document | null>;
  searchDocument(command: SearchDocumentCommand): Promise<Document[]>;
  deleteDocument(command:DeleteDocumentCommand): Promise<void>;
  updateDocument(command:UpdateDocumentCommand): Promise<Document>;
}
