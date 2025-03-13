import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";

export async function ensureUserExists() {
  const authUser = await currentUser();
  if (!authUser) {
    console.error("❌ No authenticated user found in Clerk.");
    return null;
  }

  console.log("🧐 Clerk user data:", authUser);

  let user = await db.user.findUnique({
    where: { externalId: authUser.id },
  });

  if (!user) {
    console.log(`⚠️ User ${authUser.id} not found in Prisma. Creating new user...`);

    try {
      user = await db.user.create({
        data: {
          externalId: authUser.id,
          email: authUser.emailAddresses?.[0]?.emailAddress || "unknown@example.com",
          quotaLimit: 100,
          plan: "BASIC",
        },
      });

      console.log(`✅ User created in Prisma: ${user.id} | Email: ${user.email}`);
    } catch (error) {
      console.error("❌ Error creating user in Prisma:", error);
    }
  }

  return user;
}
