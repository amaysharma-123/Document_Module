"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDocumentSchema = exports.SearchDocumentSchema = exports.GetDocumentSchema = exports.CreateDocumentSchema = void 0;
const zod_1 = require("zod");
const document_1 = require("../../contracts/states/document");
exports.CreateDocumentSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(50),
    type: zod_1.z.enum(document_1.DocType),
});
exports.GetDocumentSchema = zod_1.z.object({
    id: zod_1.z.uuid("Invalid document ID"),
});
exports.SearchDocumentSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(50).optional(),
});
exports.UpdateDocumentSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title must be at least 1 character").max(50, "Title must be less than 50 characters"),
});
//# sourceMappingURL=documentSchemas.js.map