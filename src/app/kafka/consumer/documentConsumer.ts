import { kafka } from "../config/kafkaClient";
import { DocumentEvents } from "../events/documentEvents";
import { AuditService } from "../events/handlers/auditService";
import { NotificationService } from "../events/handlers/notificationService";
import { AnalyticsService } from "../events/handlers/analyticsService";

const consumer = kafka.consumer({ groupId: "document-group" });

export const startDocumentConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({
    topic: DocumentEvents.CREATED,
    fromBeginning: false,  //start reading from latest. 
  });

  await consumer.subscribe({
    topic: DocumentEvents.UPDATED,
    fromBeginning: false,
  });

  await consumer.subscribe({
    topic: DocumentEvents.DELETED,
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (!message.value) return;

      const event = JSON.parse(message.value.toString());

      console.log(" EVENT RECEIVED:", topic);

      try {
        if (topic === DocumentEvents.CREATED) {
          AuditService.handle(event);
          NotificationService.handle(event);
          AnalyticsService.handle(event);
        }

        if (topic === DocumentEvents.UPDATED) {
          console.log("Document updated:", event.data?.id);
        }

        if (topic === DocumentEvents.DELETED) {
          console.log("Document deleted:", event.data?.id);
        }
      } catch (error) {
        console.error("Handler error:", error);
      }
    },
  });
};

