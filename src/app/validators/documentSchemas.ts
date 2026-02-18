import { z } from "zod";
import { DocType } from "../../contracts/states/document";

export const CreateDocumentSchema = z.object({ 
  title: z.string().min(1).max(50),
  type: z.enum(DocType),
});

export const GetDocumentSchema = z.object({
  id: z.uuid("Invalid document ID"),
});

export const SearchDocumentSchema = z.object({
  title: z.string().min(1).max(50).optional(),
});

export const UpdateDocumentSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character").max(50, "Title must be less than 50 characters"),
});


