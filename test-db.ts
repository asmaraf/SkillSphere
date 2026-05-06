import { MongoClient, ObjectId } from "mongodb";

async function main() {
  const client = new MongoClient(process.env.DATABASE_URL as string);

  try {
    await client.connect();
    const db = client.db();
    const users = db.collection("user");

    console.log("Testing MongoDB connection...");
    const userCount = await users.countDocuments();
    console.log("Current user count:", userCount);

    console.log("Testing write operation...");
    const testUser = await users.insertOne({
      _id: new ObjectId(),
      name: "Test User",
      email: `test-${Date.now()}@example.com`,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("Test user created:", testUser.insertedId);

    await users.deleteOne({ _id: testUser.insertedId });
    console.log("Test user deleted successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Database test failed:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

main();
