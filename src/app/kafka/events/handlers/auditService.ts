export class AuditService {
  static handle(event: any) {
    console.log(" AUDIT LOG:");
    console.log("Event:", event.eventType);
    console.log("Time:", event.occurredAt);
    console.log("Document ID:", event.data?.id);
  }
}
