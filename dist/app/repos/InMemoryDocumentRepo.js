"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDocumentRepo = void 0;
class InMemoryDocumentRepo {
    documents = [];
    async save(document) {
        this.documents.push(document);
    }
    async findById(id) {
        return this.documents.find(d => d.id === id && d.active) ?? null;
    }
    async searchByTitle(title) {
        if (!title) {
            return this.documents.filter(d => d.active);
        }
        return this.documents.filter(d => d.active &&
            d.title.toLowerCase().includes(title.toLowerCase()));
    }
}
exports.InMemoryDocumentRepo = InMemoryDocumentRepo;
//# sourceMappingURL=InMemoryDocumentRepo.js.map