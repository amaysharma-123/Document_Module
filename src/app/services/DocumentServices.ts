import type { IDocumentServices } from "../../contracts/services/IDocumentServices";

import type {
  Document,
  CreateDocumentCommand,
  GetDocumentCommand,
  SearchDocumentCommand,
  UpdateDocumentCommand,
  DeleteDocumentCommand,
} from "../../contracts/states/document";

import { DocStatusType } from "../../contracts/states/document";

import crypto from "crypto";
import { TypeOrmDocumentRepo } from "../repos/TypeOrmDocumentRepo";

import { PerformanceTracker } from "../decorators/PerformanceTracker";
import { CacheGet } from "../decorators/CacheGet";
import { CachePurge } from "../decorators/CachePurge";

import { sendDocumentEvent } from "../kafka/producer/documentProducer";
import { DocumentEvents } from "../kafka/events/documentEvents";

export class DocumentServices implements IDocumentServices {
  private readonly repo: TypeOrmDocumentRepo;

  constructor(repo: TypeOrmDocumentRepo) {
    this.repo = repo;
  }

  // ---------------- CREATE ----------------

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

    await sendDocumentEvent(DocumentEvents.CREATED, {
      eventId: crypto.randomUUID(),
      eventType: "DOCUMENT_CREATED",
      occurredAt: new Date().toISOString(),
      data: {
        id: doc.id,
        title: doc.title,
        type: doc.type,
        status: doc.status,
      },
    });

    return doc;
  }

  // ---------------- GET ----------------
  @PerformanceTracker()
  @CacheGet('document',['id'],300)
  async getDocument(command: GetDocumentCommand): Promise<Document | null> {
    return this.repo.findById(command.id);
  }
  /* 
  document:1 => Document
  document:2 => Document 
  documents: 
  */

  // ---------------- SEARCH ----------------
  @PerformanceTracker()
  @CacheGet('documents',['title'],300)
  async searchDocument(command: SearchDocumentCommand): Promise<Document[]> {
    return this.repo.searchByTitle(command.title?.trim() ?? "");
  }

  // ---------------- UPDATE ----------------
  @CachePurge('document',['id'])
  async updateDocument(command: UpdateDocumentCommand): Promise<Document> {
    const existing = await this.repo.findById(command.id);

    if (!existing) {
      throw new Error("Document not found");
    } 

    const updated: Document = {
      ...existing,
      title: command.title.trim(),
      updatedAt: new Date(),
    };

    await this.repo.save(updated);

    await sendDocumentEvent(DocumentEvents.UPDATED, {
      id: updated.id,
      title: updated.title,
      updatedAt: updated.updatedAt,
    });

    return updated;
  }

  // ---------------- DELETE ----------------
  @CachePurge('document',['id'])
  async deleteDocument(command: DeleteDocumentCommand): Promise<void> {
    const existing = await this.repo.findById(command.id);

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

    await sendDocumentEvent(DocumentEvents.DELETED, {
      id: updated.id,
      deletedAt: updated.updatedAt,
    });
  }
}
