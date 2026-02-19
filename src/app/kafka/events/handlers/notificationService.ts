export class NotificationService {
  static handle(event: any) {
    console.log(" NOTIFICATION SERVICE:");
    console.log(`Sending email for document ${event.data.id}`);
  }
}
