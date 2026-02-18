"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDocumentService = void 0;
const document_1 = require("../../contracts/states/document");
const InMemoryDocumentRepo_1 = require("../repos/InMemoryDocumentRepo");
const crypto_1 = __importDefault(require("crypto"));
class InMemoryDocumentService {
    repo; // here readonly means once assigned cannot be changed. 
    constructor() {
        // In-memory service ALWAYS uses in-memory repo
        this.repo = new InMemoryDocumentRepo_1.InMemoryDocumentRepo();
    }
    async createDocument(command) {
        if (!command.title) {
            throw new Error("title is required");
        }
        const now = new Date();
        const document = {
            id: crypto_1.default.randomUUID(),
            title: command.title,
            type: command.type,
            status: document_1.DocStatusType.DRAFT,
            active: true,
            createdAt: now,
            updatedAt: now,
        };
        await this.repo.save(document);
        return document;
    }
    async getDocument(command) {
        if (!command.id) {
            throw new Error("id is required");
        }
        return this.repo.findById(command.id);
    }
    async searchDocument(command) {
        return this.repo.searchByTitle(command.title);
    }
    async deleteDocument(id) {
        const document = await this.repo.findById(id);
        if (!document) {
            throw new Error("Document not found");
        }
        document.active = false;
        await this.repo.save(document);
    }
    async updateDocument(id, title) {
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
exports.InMemoryDocumentService = InMemoryDocumentService;
//# sourceMappingURL=InMemoryDocumentService.js.map