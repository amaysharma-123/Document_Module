
import type { Document } from "../../contracts/states/document";

export class InMemoryDocumentRepo  {
  private documents: Document[] = [];

  async save(document: Document): Promise<void> {
    this.documents.push(document);
  }

  async findById(id: string): Promise<Document | null> {
    return this.documents.find(d => d.id === id && d.active) ?? null;
  }

  async searchByTitle(title?: string): Promise<Document[]> {
    if (!title) {
      return this.documents.filter(d => d.active);
    }

    return this.documents.filter(
      d =>
        d.active &&
        d.title.toLowerCase().includes(title.toLowerCase())
    );
  }
}
