import { prisma } from "./src/lib/auth";

async function main() {
  try {
    console.log("Testing database connection...");
    const userCount = await prisma.user.count();
    console.log("Current user count:", userCount);
    
    console.log("Testing write operation...");
    const testUser = await prisma.user.create({
      data: {
        id: "test-" + Date.now(),
        name: "Test User",
        email: "test-" + Date.now() + "@example.com",
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });
    console.log("Test user created:", testUser.email);
    
    await prisma.user.delete({
      where: { id: testUser.id }
    });
    console.log("Test user deleted successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Database test failed:", error);
    process.exit(1);
  }
}

main();
