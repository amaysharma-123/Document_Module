import type { IDocumentServices } from "../../contracts/services/IDocumentServices";

import {
  CreateDocumentCommand,
  Document,
  DocStatusType,
  GetDocumentCommand,
  SearchDocumentCommand,
} from "../../contracts/states/document";

import { InMemoryDocumentRepo } from "../repos/InMemoryDocumentRepo";
import crypto from "crypto";

export class InMemoryDocumentService implements IDocumentServices {
  private readonly repo: InMemoryDocumentRepo;  // here readonly means once assigned cannot be changed. 

  constructor() {
    // In-memory service ALWAYS uses in-memory repo
    this.repo = new InMemoryDocumentRepo();
  }

  async createDocument(command: CreateDocumentCommand): Promise<Document> {
    if (!command.title) {
      throw new Error("title is required");
    }

    const now = new Date();

    const document: Document = {
      id: crypto.randomUUID(),
      title: command.title,
      type: command.type,
      status: DocStatusType.DRAFT,
      active: true,
      createdAt: now,
      updatedAt: now,
    };

    await this.repo.save(document);
    return document;
  }

  async getDocument(command: GetDocumentCommand): Promise<Document | null> {
    if (!command.id) {
      throw new Error("id is required");
    }

    return this.repo.findById(command.id);
  }

  async searchDocument(command: SearchDocumentCommand): Promise<Document[]> {
    return this.repo.searchByTitle(command.title);
  }
  async deleteDocument(id: string): Promise<void> {
    const document = await this.repo.findById(id);

    if (!document) {
      throw new Error("Document not found");
    }

    document.active = false;

    await this.repo.save(document);
  }
  async updateDocument(
  id: string,
  title: string
): Promise<Document> {

  console.log("Executing InMemory updateDocument");

  const document = await this.repo.findById(id);

  if (!document) {
    throw new Error("Document not found");
  }

  document.title = title;
  document.updatedAt = new Date();

  await this.repo.save(document);

  return document;
}

}
