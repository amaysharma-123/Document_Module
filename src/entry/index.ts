import { AppDataSource } from "../app/persistence/datasource";
import { TypeOrmDocumentRepo } from "../app/repos/TypeOrmDocumentRepo";
import { DocumentServices } from "../app/services/DocumentServices";
import { InMemoryDocumentService } from "../app/services/InMemoryDocumentService";
import { DocType } from "../contracts/states/document";
import { IDocumentServices } from "../contracts/services/IDocumentServices";
import { redisClient } from "../app/cache/redisClient";

async function main() {


  await AppDataSource.initialize();
  console.log("Database connected");

  let dbService: IDocumentServices = new DocumentServices(new TypeOrmDocumentRepo());

  // dbService = new InMemoryDocumentService();

  const doc1 = await dbService.createDocument({
    title: "Project Plan",
    type: DocType.PDF,
  });
  console.log(doc1)

  const doc2 = await dbService.createDocument({
    title: "Meeting Notes",
    type: DocType.TXT,
  });
  console.log(doc2)

  const dbSearchResults = await dbService.searchDocument({
    title: "project",
  });

  console.log(" DB search results:");
  console.log(dbSearchResults);

}

main().catch(err => {
  console.error(" Error starting app:", err);
});
