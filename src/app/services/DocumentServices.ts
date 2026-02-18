import type { IDocumentServices } from "../../contracts/services/IDocumentServices";

import type {
  Document,
  CreateDocumentCommand,
  GetDocumentCommand,
  SearchDocumentCommand,
} from "../../contracts/states/document";

import { DocStatusType } from "../../contracts/states/document";

import crypto from "crypto";
import { TypeOrmDocumentRepo } from "../repos/TypeOrmDocumentRepo";

import { PerformanceTracker } from "../decorators/PerformanceTracker";
import { CacheGet } from "../decorators/CacheGet";
import { CachePurge } from "../decorators/CachePurge";

export class DocumentServices implements IDocumentServices {

  private readonly repo: TypeOrmDocumentRepo;

  constructor(repo: TypeOrmDocumentRepo) {
    this.repo = repo;
  }

  
  @CachePurge()
  async createDocument(command: CreateDocumentCommand): Promise<Document> {

    const now = new Date();

    const doc: Document = {
      id: crypto.randomUUID(),
      title: command.title.trim(),
      type: command.type,
      status: DocStatusType.DRAFT,
      active: true,
      createdAt: now,
      updatedAt: now,
    };

    await this.repo.save(doc);

    return doc;
  }

  
  @PerformanceTracker()
  @CacheGet(300)
  async getDocument(command: GetDocumentCommand): Promise<Document | null> {

    if (!command?.id) {
      throw new Error("Document id is required");
    }

    return this.repo.findById(command.id);
  }

  
  @PerformanceTracker()
  @CacheGet(300)
  async searchDocument(command: SearchDocumentCommand): Promise<Document[]> {

    return this.repo.searchByTitle(command.title?.trim() ?? ""); // ?? operator if LHS is null or undefined then use empty string. 
  }

  
  @CachePurge()
  async updateDocument(id: string, title: string): Promise<Document> {

    const existing = await this.repo.findById(id);

    if (!existing) {
      throw new Error("Document not found");
    }

    const updated: Document = {
      ...existing,  // spread operator copies all things . 
      title: title.trim(), // override title 
      updatedAt: new Date(),
    };

    await this.repo.save(updated);

    return updated;
  }

  // ---------------- DELETE ----------------
  @CachePurge()
  async deleteDocument(id: string): Promise<void> {

    const existing = await this.repo.findById(id);

    if (!existing) {
      throw new Error("Document not found");
    }

    const updated: Document = {
      ...existing,
      active: false,
      status: DocStatusType.DRAFT,
      updatedAt: new Date(),
    };

    await this.repo.save(updated);
  }
}
