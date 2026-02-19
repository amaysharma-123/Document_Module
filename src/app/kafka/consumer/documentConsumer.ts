import { kafka } from "../config/kafkaClient";
import { DocumentEvents } from "../events/documentEvents";

const consumer = kafka.consumer({ groupId: "document-group" });

export const startDocumentConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({
    topic: DocumentEvents.CREATED,
  });

  await consumer.subscribe({
    topic: DocumentEvents.UPDATED,
  });

  await consumer.subscribe({
    topic: DocumentEvents.DELETED,
  });

  await consumer.run({
  eachMessage: async ({ topic, message }) => {
    const payload = JSON.parse(message.value!.toString());

    if (topic === DocumentEvents.DELETED) {
      console.log("Document deleted:", payload.id);
    }

    if (topic === DocumentEvents.CREATED) {
      console.log(" Document created:", payload.id);
    }

    if (topic === DocumentEvents.UPDATED) {
      console.log(" Document updated:", payload.id);
    }
  },
});

};
