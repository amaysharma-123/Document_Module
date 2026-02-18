"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datasource_1 = require("../app/persistence/datasource");
const TypeOrmDocumentRepo_1 = require("../app/repos/TypeOrmDocumentRepo");
const DocumentServices_1 = require("../app/services/DocumentServices");
const document_1 = require("../contracts/states/document");
async function main() {
    await datasource_1.AppDataSource.initialize();
    console.log("Database connected");
    let dbService = new DocumentServices_1.DocumentServices(new TypeOrmDocumentRepo_1.TypeOrmDocumentRepo());
    // dbService = new InMemoryDocumentService();
    const doc1 = await dbService.createDocument({
        title: "Project Plan",
        type: document_1.DocType.PDF,
    });
    console.log(doc1);
    const doc2 = await dbService.createDocument({
        title: "Meeting Notes",
        type: document_1.DocType.TXT,
    });
    console.log(doc2);
    const dbSearchResults = await dbService.searchDocument({
        title: "project",
    });
    console.log(" DB search results:");
    console.log(dbSearchResults);
}
main().catch(err => {
    console.error(" Error starting app:", err);
});
//# sourceMappingURL=index.js.map