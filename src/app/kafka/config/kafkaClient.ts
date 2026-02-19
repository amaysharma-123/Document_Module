import { Kafka ,logLevel} from "kafkajs";

export const kafka = new Kafka({  
  clientId: "document-module",
  brokers: ["localhost:29092"],
  logLevel: logLevel.ERROR, 
});
