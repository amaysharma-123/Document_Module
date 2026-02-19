import { kafka } from "../config/kafkaClient";

import { Partitioners } from "kafkajs";

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});


export const connectProducer = async () => {
  await producer.connect();
};

export const sendDocumentEvent = async (
  topic: string,
  payload: any
) => {
  await producer.send({
    topic,
    messages: [
      {
        value: JSON.stringify(payload),
      },
    ],
  });
};
