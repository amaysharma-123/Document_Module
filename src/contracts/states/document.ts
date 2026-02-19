export enum DocType {
  // enum = A fixed set of allowed values.
  PDF = "PDF",
  TXT = "TXT",
  PNG = "PNG",
  JPG = "JPG",
}

export enum DocStatusType {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export interface Document {
  // Shape of an object.
  id: string;
  title: string;
  type: DocType;
  status: DocStatusType;
  active: boolean; //this one is used for delete or soft delete
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDocumentCommand {
  title: string;
  type: DocType;
}

export interface GetDocumentCommand {
  id: string;
}

export interface SearchDocumentCommand {
  title?: string;
}

export interface UpdateDocumentCommand {
  id: string;
  title: string;
}

export interface DeleteDocumentCommand{
  id: string;
}