import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

export function getMongoClient() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI, {
      connectTimeoutMS: 800,
      maxIdleTimeMS: 10000,
      serverSelectionTimeoutMS: 650,
      socketTimeoutMS: 2500,
    });
  }

  return client;
}

export async function getDb() {
  const databaseName = process.env.MONGODB_DB || "photo_factory_rwanda";
  return (await getMongoClient().connect()).db(databaseName);
}
