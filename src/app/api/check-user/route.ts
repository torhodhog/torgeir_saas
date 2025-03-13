import { db } from "@/db";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
// ✅ Bruk clerkClient for å hente brukerdata
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req); // ✅ Henter bruker fra Clerk

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🔥 Henter brukerdetaljer fra Clerk med clerkClient
    const client = await clerkClient();
    const authUser = await client.users.getUser(userId);
    if (!authUser) {
      return NextResponse.json({ error: "No user data found in Clerk" }, { status: 500 });
    }

    console.log("🧐 Clerk user data:", authUser);

    // Henter e-postadressen fra Clerk
    const email = authUser?.emailAddresses?.[0]?.emailAddress || "unknown@example.com";

    // 🔥 Bruk `upsert()` for å håndtere eksisterende brukere
    const user = await db.user.upsert({
      where: { externalId: userId },
      update: { email }, // Oppdater e-post hvis brukeren finnes
      create: {
        externalId: userId,
        email,
        quotaLimit: 100, // Standard kvote
        plan: "BASIC", // Standard plan
      },
    });

    console.log(`✅ User checked/created in Prisma: ${user.id} | Email: ${user.email}`);

    return NextResponse.json({ message: "User checked", user });
  } catch (error) {
    console.error("❌ Error checking user in Prisma:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
