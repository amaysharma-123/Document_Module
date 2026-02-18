"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const datasource_1 = require("../app/persistence/datasource");
const redisClient_1 = require("../app/cache/redisClient");
const documentRoutes_1 = require("./routes/documentRoutes");
async function startServer() {
    const app = (0, fastify_1.default)({ logger: false }).withTypeProvider(); // here we are creating fastify instance. and make sure "use zod types for validation"
    // tells fastify to use Zod 
    app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
    app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
    await datasource_1.AppDataSource.initialize();
    console.log("Database connected");
    await redisClient_1.redisClient.connect();
    console.log("Redis connected");
    await app.register(swagger_1.default, {
        openapi: {
            info: {
                title: "Document Module API",
                description: "API documentation for Document Module",
                version: "1.0.0",
            },
        },
        transform: fastify_type_provider_zod_1.jsonSchemaTransform, // swagger won't understand zod. so transform from zod schemas to json format . 
    });
    await app.register(swagger_ui_1.default, {
        routePrefix: "/docs",
    });
    app.get("/health", async () => {
        return { status: "ok" };
    });
    app.register(documentRoutes_1.documentRoutes);
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
//# sourceMappingURL=server.js.map