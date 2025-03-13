import axios from "axios";
import * as cheerio from "cheerio";
import dotenv from "dotenv";
dotenv.config();


export const googleSearch = async (query: string, numResults = 5) => {
  try {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&num=${numResults}`;
    const { data } = await axios.get(searchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(data);
    const results: { title: string; link: string; snippet: string }[] = [];

    $("div.tF2Cxc").each((_, element) => {
      const title = $(element).find("h3").text();
      const link = $(element).find("a").attr("href");
      const snippet = $(element).find(".aCOpRe").text();
      
      if (link) {
        results.push({ title, link, snippet });
      }
    });

    return results;
  } catch (error) {
    console.error("Error in googleSearch:", error);
    return [];
  }
};

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CSE_ID = process.env.GOOGLE_CSE_ID;

console.log("🔍 GOOGLE_API_KEY:", GOOGLE_API_KEY ? "✅ Loaded" : "❌ Not found");
console.log("🔍 GOOGLE_CSE_ID:", GOOGLE_CSE_ID ? "✅ Loaded" : "❌ Not found");

export async function googleCustomSearch(query: string) {
  if (!GOOGLE_API_KEY || !GOOGLE_CSE_ID) {
    throw new Error("Missing Google API credentials.");
  }

  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}`;

  try {
    console.log(`🚀 Sending request to: ${url}`);

    const res = await fetch(url);
    const data = await res.json();

    console.log("🔎 Full Google API response:", JSON.stringify(data, null, 2)); // 👀 Log hele responsen

    if (!res.ok) {
      console.error("❌ API request failed:", res.status, res.statusText);
      return [];
    }

    return data.items || [];
  } catch (error) {
    console.error("❌ Error fetching search results:", error);
    return [];
  }
}

