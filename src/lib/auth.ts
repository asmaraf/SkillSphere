import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

import path from "path";

const dbPath = path.resolve(process.cwd(), "dev.db").replace(/\\/g, "/");

const adapter = new PrismaLibSql({
  url: `file:${dbPath}`,
});

export const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    database: prismaAdapter(prisma, {
        provider: "sqlite",
    }),
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
