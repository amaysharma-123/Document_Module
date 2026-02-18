fresher-onboarding-guide.md

Backend Onboarding Project — Document Module

Stack: TypeScript (service-first) → TypeORM (persistence) → Fastify + OpenAPI/Swagger (API)
Goal: strengthen backend fundamentals by building one microservice in three stages.

⸻

Outcomes

By the end, you should be able to:
	•	Write clean contracts (DTOs) and keep them stable
	•	Implement business logic in a service layer
	•	Validate inputs at service boundary first (even before API exists)
	•	Model relational data with constraints + migrations
	•	Swap repository implementations (InMemory ↔ TypeORM) without changing service logic
	•	Expose APIs via Fastify, with correct validation + Swagger/OpenAPI docs

⸻

What you will build

Document Module microservice

Minimum features:
	•	Create a document (metadata)
	•	Add versions to a document (v1, v2…)
	•	Get document by id (includes latest version)
	•	List/search documents with pagination + filters
	•	Archive document (status change)
	•	Soft-delete document (status change)
	•	List versions for a document

⸻

Non-negotiable principles
	1.	Contracts first
Start by defining DTOs for inputs/outputs and a standard error shape.
	2.	Service owns business logic
No business logic in routes. No business logic in repository.
	3.	Validate at the service boundary
Every public service method must validate inputs.
	4.	Repository is swappable
Service should not care whether the repo is in-memory or DB-backed.
	5.	API layer is thin
Validate → call service → map errors → return.

⸻

Suggested folder structure

Use this structure (names can vary, intent should not):
	•	src/contracts/ — DTOs (inputs/outputs/errors)
	•	src/validators/ — runtime validators (e.g., Zod schemas)
	•	src/services/ — business logic (DocumentService)
	•	src/repos/ — repo interface + InMemory implementation
	•	src/persistence/ — TypeORM entities + migrations + TypeORM repo
	•	src/api/ — Fastify server + routes + OpenAPI/Swagger setup
	•	src/index.ts — CLI runner for Stage 1 and Stage 2 smoke tests
	•	docs/ — architecture notes, decisions, OpenAPI files if spec-first

⸻

Stage 1 — In-memory service-first implementation

Objective

Implement the entire workflow without DB and without HTTP.
Run everything from src/index.ts (a CLI-style runner).

What you must define before coding

Write down these contracts and interfaces first:

Contracts (DTOs)
	•	CreateDocumentInput
	•	DocumentState
	•	AddVersionInput
	•	DocumentVersionState
	•	SearchDocumentsInput
	•	SearchDocumentsResult
	•	Standard error shape: { code, message, details? }

Service methods
	•	createDocument(input)
	•	addVersion(input)
	•	getDocument(id)
	•	searchDocuments(input)
	•	archiveDocument(id)
	•	softDeleteDocument(id)
	•	listVersions(documentId)

Repository interface (ports)
	•	create/update/get document
	•	add/get/list versions
	•	search documents

Business rules (must implement)
	•	Status: active | archived | deleted
	•	You cannot add versions if status is archived or deleted
	•	Versions auto-increment from latest: v1, v2, v3…
	•	Search supports:
	•	q (title contains)
	•	docType
	•	status
	•	limit + offset

Deliverables for Stage 1
	•	In-memory repository implementation
	•	Service implementation with validation at boundaries
	•	src/index.ts runner demonstrating:
	•	create document
	•	add version
	•	get document
	•	list/search with pagination
	•	archive + delete flows

⸻

Stage 2 — Persistence with TypeORM

Objective

Introduce Postgres + TypeORM. Replace the repository implementation only.
Service code should remain unchanged (or minimal wiring changes).

Minimum schema
	•	document
	•	document_version

(Optional bonus after core is done: tags + mapping)

Data modeling checklist (must do)
	•	Primary keys on all tables
	•	Foreign key: document_version.document_id → document.id
	•	Unique constraint: (document_id, version)
	•	Index: document.updated_at
	•	Soft delete strategy: either
	•	status = deleted, OR
	•	deleted_at timestamp
Pick one and document why.

Deliverables for Stage 2
	•	TypeORM entities
	•	Migrations that can be applied cleanly
	•	TypeORM repository implementing the same repo interface
	•	Stage 2 runner verifying:
	•	create document in DB
	•	add version in DB
	•	search works

⸻

Stage 3 — Fastify API + OpenAPI/Swagger

Objective

Expose your service through HTTP. Keep routes thin and consistent.

Required endpoints
	•	POST /documents
	•	GET /documents (search + pagination)
	•	GET /documents/:id
	•	POST /documents/:id/versions
	•	GET /documents/:id/versions
	•	POST /documents/:id/archive
	•	DELETE /documents/:id (soft delete)

API rules
	•	Validation errors → 400 using standard error shape
	•	Not found → 404 using standard error shape
	•	No leaked stack traces / random thrown errors to clients
	•	Swagger UI accessible and accurate
	•	Validators reused (do not duplicate rules in two places)

Deliverables for Stage 3
	•	Fastify server + routes
	•	Swagger UI route (e.g., /docs)
	•	OpenAPI JSON route (generated or served)
	•	Working API calls for all endpoints

⸻

Review rubric

Stage 1 review
	•	Are contracts consistent and readable?
	•	Is business logic isolated in service layer?
	•	Are inputs validated at service boundary?
	•	Is repo interface clean and minimal?
	•	Does the runner prove the flows?

Stage 2 review
	•	Are relations correct and normalized?
	•	Are constraints and indexes present?
	•	Are migrations clean and repeatable?
	•	Can you switch repos without changing service code?

Stage 3 review
	•	Are routes thin (validate → call → return)?
	•	Is error handling consistent and correct?
	•	Is OpenAPI/Swagger accurate?
	•	Is pagination/filtering correct?

⸻

Suggested 5-day plan (fast-track)
	•	Day 1: Read resources + write down DTOs and service/repo interfaces
	•	Day 2: Implement Stage 1 end-to-end and demo via index.ts
	•	Day 3: Add archive/delete/listVersions + tighten validation
	•	Day 4: Start Stage 2: entities + migrations + TypeORM repo
	•	Day 5: Swap repo + run Stage 2 smoke tests

⸻

Resources (read + implement)

TypeScript fundamentals
	•	TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
	•	TypeScript Deep Dive: https://basarat.gitbook.io/typescript/
	•	Effective TypeScript: https://effectivetypescript.com/

Service design
	•	Service Layer (Fowler): https://martinfowler.com/eaaCatalog/serviceLayer.html
	•	Hexagonal Architecture: https://alistair.cockburn.us/hexagonal-architecture/

Validation
	•	Zod: https://zod.dev/

TypeORM
	•	TypeORM docs: https://typeorm.io/
	•	Entities: https://typeorm.io/entities
	•	Relations: https://typeorm.io/relations
	•	Migrations: https://typeorm.io/migrations

Postgres modeling
	•	Constraints: https://www.postgresql.org/docs/current/ddl-constraints.html
	•	Foreign keys: https://www.postgresql.org/docs/current/tutorial-fk.html

Fastify + OpenAPI
	•	Fastify Getting Started: https://fastify.dev/docs/latest/Guides/Getting-Started/
	•	Fastify TypeScript: https://fastify.dev/docs/latest/Reference/TypeScript/
	•	Validation & Serialization: https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/
	•	OpenAPI spec: https://github.com/OAI/OpenAPI-Specification
	•	Swagger docs: https://swagger.io/docs/
	•	@fastify/swagger: https://github.com/fastify/fastify-swagger
	•	@fastify/swagger-ui: https://github.com/fastify/fastify-swagger

Optional (after core)
	•	Spectral: https://stoplight.io/open-source/spectral
	•	oasdiff: https://github.com/Tufin/oasdiff
	•	OWASP API Security: https://owasp.org/API-Security/

⸻

If you're stuck

Ask yourself:
	•	"Is this business logic?" → service
	•	"Is this storage detail?" → repo
	•	"Can I test this without DB?" → you should be able to
	•	"Did I validate input at the boundary?" → always
	•	"If DB changes, does service still work?" → it should

⸻

If you want, paste your current broken preview snippet and I'll adjust formatting to match the renderer you're using (GitHub, Notion, VSCode preview, etc.).[19:03]// contract
// contract/states/document.ts
interface CreateDocumentInput {
  userId: string; // UUID
  name: string;
}

interface Document {
  docId: string; // UUID
  name: string;
  createdBy: string;
}

interface GetDocumentInput {
  docId: string; // UUID
}

// contract/services/IDocumentService.ts
interface IDocumentService {
  createDocument(input: CreateDocumentInput): Promise<Document>;
  getDocument(input: GetDocumentInput): Promise<Document | null>;
}

// app/services/DocumentService.ts
class DocumentService implements IDocumentService {
  private documents: Document[] = [];
  constructor() {}

  createDocument(input: CreateDocumentInput): Promise<Document> {
    const newDoc: Document = {
      docId: Math.random() * 10000 + '',
      name: input.name,
      createdBy: input.userId,
    };
    this.documents.push(newDoc);
    return Promise.resolve(newDoc);
  }

  getDocument(input: GetDocumentInput): Promise<Document | null> {
    return Promise.resolve(this.documents.find((doc) => doc.docId == input.docId) || null);
  }
}

// index.ts
const docService = new DocumentService();

(async () => {
  const docInput: CreateDocumentInput = {
    userId: '123',
    name: 'Sample File',
  };

  const doc = await docService.createDocument(docInput);

  const getDocInput: GetDocumentInput = {
    docId: doc.docId,
  };
  const newDoc = await docService.getDocument(getDocInput);
  console.log(JSON.stringify(doc));
})();



Folder Structure 
src/
├── contracts/
│   ├── states/
│   │   └── document.ts
│   └── services/
│       └── IDocumentService.ts
│
├── repos/
│   ├── IDocumentRepo.ts
│   └── InMemoryDocumentRepo.ts
│
├── app/
│   └── services/
│       └── DocumentService.ts
│
└── index.ts


Starting Workflow is this . 

index.ts
  ↓ calls
DocumentService
  ↓ uses
IDocumentRepo (interface)
  ↓ implemented by
InMemoryDocumentRepo
  ↓ stores data in
documents[] (RAM)



                ┌────────────────────┐
                │  DocumentService   │
                └─────────┬──────────┘
                          │
                ┌─────────▼──────────┐
                │   IDocumentRepo    │
                └───────┬─────┬──────┘
                        │     │
        ┌───────────────▼┐   ┌▼──────────────────┐
        │ InMemoryRepo    │   │ TypeORMRepo        │
        │ (array in RAM) │   │ (PostgreSQL DB)    │
        └────────────────┘   └───────────────────┘
