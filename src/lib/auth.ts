import { MongoClient } from "mongodb";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { memoryAdapter } from "@better-auth/memory-adapter";

const databaseUrl = process.env.DATABASE_URL;
const useMemoryAdapter = process.env.NODE_ENV !== "production" && (!databaseUrl || databaseUrl.includes("localhost") || databaseUrl.includes("127.0.0.1"));

const database = useMemoryAdapter
  ? memoryAdapter({
      user: [],
      account: [],
      session: [],
      verification: [],
    })
  : (() => {
      const client = new MongoClient(databaseUrl as string);
      const db = client.db();
      return mongodbAdapter(db, {
        client,
        transaction: false,
      });
    })();

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    database,
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});
