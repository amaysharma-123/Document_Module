export declare enum DocType {
    PDF = "PDF",
    TXT = "TXT",
    PNG = "PNG",
    JPG = "JPG"
}
export declare enum DocStatusType {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED"
}
export interface Document {
    id: string;
    title: string;
    type: DocType;
    status: DocStatusType;
    active: boolean;
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
//# sourceMappingURL=document.d.ts.map