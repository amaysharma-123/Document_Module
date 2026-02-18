import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

import { AppDataSource } from "../app/persistence/datasource";
import { redisClient } from "../app/cache/redisClient";
import { documentRoutes } from "./routes/documentRoutes";

async function startServer() {
  
  const app = Fastify({ logger: false }).withTypeProvider<ZodTypeProvider>(); // here we are creating fastify instance. and make sure "use zod types for validation"

  // tells fastify to use Zod 
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);


  await AppDataSource.initialize();
  console.log("Database connected");

  
  await redisClient.connect();
  console.log("Redis connected");

  
  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Document Module API",
        description: "API documentation for Document Module",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,  // swagger won't understand zod. so transform from zod schemas to json format . 
  });

  await app.register(swaggerUI, {
    routePrefix: "/docs",
  });

  
  app.get("/health", async () => {
    return { status: "ok" };
  });

  
  app.register(documentRoutes);

  //start 
  const PORT = Number(4010);
  await app.listen({ port: PORT });

  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/docs`);
}

startServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
