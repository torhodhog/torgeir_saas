import { NextResponse } from "next/server";
import { googleSearch } from "@/lib/crawler";
import { db } from "@/db";

export async function POST(req: Request) {
  try {
    const { userId, query } = await req.json();

    if (!userId || !query) {
      return NextResponse.json({ error: "Missing userId or query" }, { status: 400 });
    }

    console.log(`🔍 Searching Google for: ${query}`);

    let user = await db.user.findUnique({
      where: { externalId: userId },
    });

    if (!user) {
      console.log(`⚠️ User ${userId} not found. Creating new user in Prisma...`);

      user = await db.user.create({
        data: {
          externalId: userId,
          email: "",
          quotaLimit: 100,
          plan: "BASIC",
        },
      });

      console.log(`✅ New user created: ${user.id}`);
    }

    const results = await googleSearch(query);

    if (results.length === 0) {
      console.log("❌ No results found.");
      return NextResponse.json({ message: "No results found." });
    }

    const savedResults = await db.searchResult.createMany({
      data: results.map((result) => ({
        userId: user.id,
        query,
        title: result.title,
        url: result.link,
        snippet: result.snippet,
      })),
    });

    return NextResponse.json({ message: "Search completed", results: savedResults });

  } catch (error) {
    console.error("❌ Error in search:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
