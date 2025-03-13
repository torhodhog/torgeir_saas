import { NextResponse } from "next/server";
import { db } from "@/db";

export async function GET(req: Request) {
   const { searchParams } = new URL(req.url);
   const userId = searchParams.get("userId");

   if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
   }

   const watchlist = await db.watchlist.findMany({
      where: { userId },
   });

   return NextResponse.json({
      watchlist: watchlist.map((item) => ({
         ...item,
         subQueries: JSON.parse(item.subQueries as string), // Parse JSON tilbake til array
      })),
   });
}

export async function POST(req: Request) {
   try {
      const { userId, mainQuery, subQueries, notificationMethod } = await req.json();

      if (!userId || !mainQuery || !notificationMethod) {
         return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      const newItem = await db.watchlist.create({
         data: {
            userId,
            query: mainQuery,
            subQueries: subQueries, // Lagres som JSON direkte
            notificationMethod,
            notifications: "", // Legg til en standardverdi for notifications
         },
      });

      return NextResponse.json(newItem);
   } catch (error) {
      console.error("Error saving watchlist:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
   }
}