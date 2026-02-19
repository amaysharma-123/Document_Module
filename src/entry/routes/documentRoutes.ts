import { FastifyInstance } from "fastify";
import { DocumentServices } from "../../app/services/DocumentServices";
import type { IDocumentServices } from "../../contracts/services/IDocumentServices";
import type {
  CreateDocumentCommand,
  DeleteDocumentCommand,
  GetDocumentCommand,
  SearchDocumentCommand,
  UpdateDocumentCommand,
} from "../../contracts/states/document";

import {
  CreateDocumentSchema,
  GetDocumentSchema,
  SearchDocumentSchema,
  UpdateDocumentSchema,
} from "../../app/validators/documentSchemas";
import { TypeOrmDocumentRepo } from "../../app/repos/TypeOrmDocumentRepo";

export async function documentRoutes(app: FastifyInstance) {

  
  const repo = new TypeOrmDocumentRepo();
  const service: IDocumentServices = new DocumentServices(repo);


  app.post<{ Body: CreateDocumentCommand }>( //“This route expects body of type CreateDocumentCommand.”
    "/documents",
    {
      schema: {
        body: CreateDocumentSchema, 
      },
    },
    async (request, reply) => {
      const doc = await service.createDocument(request.body);
      return reply.code(201).send(doc);
    }
  );
   //get by id 
  app.get<{ Params: GetDocumentCommand }>(
    "/documents/:id",
    {
      schema: {
        params: GetDocumentSchema,  //zod validation 
      },
    },
    async (request, reply) => {
      const doc = await service.getDocument(request.params);
      return reply.send(doc);
    }
  );

   // search 
  app.get<{ Querystring: SearchDocumentCommand }>(
    "/documents",
    {
      schema: {
        querystring: SearchDocumentSchema,
      },
    },
    async (request, reply) => {
      const result = await service.searchDocument(request.query);
      return reply.send(result);
    }
  );

  //update
  app.put<{ Params: GetDocumentCommand; Body: CreateDocumentCommand }>(
    "/documents/:id",
    {
      schema: {
        params: GetDocumentSchema,
        body: UpdateDocumentSchema,
      },
    },
    async (request, reply) => {
      const command: UpdateDocumentCommand ={
        id: request.params.id,
        title: request.body.title
      }
      const updated = await service.updateDocument(command);
      return reply.send(updated);
    }
  );

  app.delete<{ Params: GetDocumentCommand }>(
    "/documents/:id",
    {
      schema: {
        params: GetDocumentSchema,
      },
    },
    async (request, reply) => {
      const command: DeleteDocumentCommand={
        id:request.params.id
      }
      await service.deleteDocument(command);
      return reply.code(204).send();
    }
  );
}