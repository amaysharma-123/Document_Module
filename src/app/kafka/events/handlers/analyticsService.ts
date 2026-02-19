export class AnalyticsService {
  static handle(event: any) {
    console.log(" ANALYTICS SERVICE:");
    console.log(`Tracking event ${event.eventType}`);
  }
}
