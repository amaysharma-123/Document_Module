import { z } from "zod";
import { DocType } from "../../contracts/states/document";
export declare const CreateDocumentSchema: z.ZodObject<{
    title: z.ZodString;
    type: z.ZodEnum<typeof DocType>;
}, z.core.$strip>;
export declare const GetDocumentSchema: z.ZodObject<{
    id: z.ZodUUID;
}, z.core.$strip>;
export declare const SearchDocumentSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const UpdateDocumentSchema: z.ZodObject<{
    title: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=documentSchemas.d.ts.map