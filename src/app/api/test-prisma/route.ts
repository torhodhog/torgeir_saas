import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const newUser = await db.user.create({
      data: {
        externalId: "test-id-123",
        email: "dust@example.com",
        quotaLimit: 100,
      },
    });
    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error("Error creating test user:", error);
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}
