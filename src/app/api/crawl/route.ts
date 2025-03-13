import { NextResponse } from "next/server";
import { googleCustomSearch } from "@/lib/crawler";
import { db } from "@/db";

// 🏷️ Type for Google Custom Search-resultat
type SearchResult = {
  title: string;
  link: string;
  snippet?: string;
};

export async function POST(req: Request) {
  try {
    const { userId, query } = await req.json();

    if (!userId || !query) {
      console.error("⚠️ Missing userId or query:", { userId, query });
      return NextResponse.json({ error: "Missing userId or query" }, { status: 400 });
    }

    console.log(`🔍 Searching Google for: "${query}" (Requested by user: ${userId})`);

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

    console.log("🚀 Calling googleCustomSearch()...");
    const results: SearchResult[] = await googleCustomSearch(query);

    console.log("🔎 Google API response:", results);

    if (results.length === 0) {
      console.log("❌ No search results found.");
      return NextResponse.json({ message: "No results found." });
    }

    // 🔥 Filtrerer ut resultater uten `title` eller `link` og setter fallback for `snippet`
    const cleanedResults = results
      .filter((result) => result.title && result.link) // Fjerner ugyldige resultater
      .map((result) => ({
        userId: user.id,
        query,
        title: result.title,
        url: result.link,
        snippet: result.snippet || "No description available", // Setter standardverdi
      }));

    console.log("💾 Saving results to database...");
    await db.searchResult.createMany({ data: cleanedResults });

    console.log("✅ Results saved successfully");

    return NextResponse.json({ message: "Search completed", results: cleanedResults });

  } catch (error) {
    console.error("❌ Error in search:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

