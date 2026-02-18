"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentServices = void 0;
const document_1 = require("../../contracts/states/document");
const crypto_1 = __importDefault(require("crypto"));
const PerformanceTracker_1 = require("../decorators/PerformanceTracker");
const CacheGet_1 = require("../decorators/CacheGet");
const CachePurge_1 = require("../decorators/CachePurge");
class DocumentServices {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async createDocument(command) {
        const now = new Date();
        const doc = {
            id: crypto_1.default.randomUUID(),
            title: command.title.trim(),
            type: command.type,
            status: document_1.DocStatusType.DRAFT,
            active: true,
            createdAt: now,
            updatedAt: now,
        };
        await this.repo.save(doc);
        return doc;
    }
    async getDocument(command) {
        if (!command?.id) {
            throw new Error("Document id is required");
        }
        return this.repo.findById(command.id);
    }
    async searchDocument(command) {
        return this.repo.searchByTitle(command.title?.trim() ?? ""); // ?? operator if LHS is null or undefined then use empty string. 
    }
    async updateDocument(id, title) {
        const existing = await this.repo.findById(id);
        if (!existing) {
            throw new Error("Document not found");
        }
        const updated = {
            ...existing, // spread operator copies all things . 
            title: title.trim(), // override title 
            updatedAt: new Date(),
        };
        await this.repo.save(updated);
        return updated;
    }
    // ---------------- DELETE ----------------
    async deleteDocument(id) {
        const existing = await this.repo.findById(id);
        if (!existing) {
            throw new Error("Document not found");
        }
        const updated = {
            ...existing,
            active: false,
            status: document_1.DocStatusType.DRAFT,
            updatedAt: new Date(),
        };
        await this.repo.save(updated);
    }
}
exports.DocumentServices = DocumentServices;
__decorate([
    (0, CachePurge_1.CachePurge)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentServices.prototype, "createDocument", null);
__decorate([
    (0, PerformanceTracker_1.PerformanceTracker)(),
    (0, CacheGet_1.CacheGet)(300),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentServices.prototype, "getDocument", null);
__decorate([
    (0, PerformanceTracker_1.PerformanceTracker)(),
    (0, CacheGet_1.CacheGet)(300),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentServices.prototype, "searchDocument", null);
__decorate([
    (0, CachePurge_1.CachePurge)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DocumentServices.prototype, "updateDocument", null);
__decorate([
    (0, CachePurge_1.CachePurge)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentServices.prototype, "deleteDocument", null);
//# sourceMappingURL=DocumentServices.js.map