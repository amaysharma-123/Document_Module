"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentRoutes = documentRoutes;
const DocumentServices_1 = require("../../app/services/DocumentServices");
const documentSchemas_1 = require("../../app/validators/documentSchemas");
const TypeOrmDocumentRepo_1 = require("../../app/repos/TypeOrmDocumentRepo");
async function documentRoutes(app) {
    const repo = new TypeOrmDocumentRepo_1.TypeOrmDocumentRepo();
    const service = new DocumentServices_1.DocumentServices(repo);
    app.post(//“This route expects body of type CreateDocumentCommand.”
    "/documents", {
        schema: {
            body: documentSchemas_1.CreateDocumentSchema,
        },
    }, async (request, reply) => {
        const doc = await service.createDocument(request.body);
        return reply.code(201).send(doc);
    });
    //get by id 
    app.get("/documents/:id", {
        schema: {
            params: documentSchemas_1.GetDocumentSchema, //zod validation 
        },
    }, async (request, reply) => {
        const doc = await service.getDocument(request.params);
        return reply.send(doc);
    });
    // search 
    app.get("/documents", {
        schema: {
            querystring: documentSchemas_1.SearchDocumentSchema,
        },
    }, async (request, reply) => {
        const result = await service.searchDocument(request.query);
        return reply.send(result);
    });
    //update
    app.put("/documents/:id", {
        schema: {
            params: documentSchemas_1.GetDocumentSchema,
            body: documentSchemas_1.UpdateDocumentSchema,
        },
    }, async (request, reply) => {
        const updated = await service.updateDocument(request.params.id, request.body.title);
        return reply.send(updated);
    });
    app.delete("/documents/:id", {
        schema: {
            params: documentSchemas_1.GetDocumentSchema,
        },
    }, async (request, reply) => {
        await service.deleteDocument(request.params.id);
        return reply.code(204).send();
    });
}
//# sourceMappingURL=documentRoutes.js.map