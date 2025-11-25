import { NextRequest, NextResponse } from "next/server";
import { ConversationData } from "@/app/types";

export async function GET() {
  try {
    const fs = await import("fs").then((m) => m.promises);
    const path = await import("path");

    const dataDir = path.join(process.cwd(), "public", "data");
    const usersFile = path.join(dataDir, "users.json");

    try {
      const data = await fs.readFile(usersFile, "utf-8");
      const users = JSON.parse(data);
      return NextResponse.json(users);
    } catch (error) {
      // File doesn't exist, return default users
      return NextResponse.json({
        gaetan: null,
        wynonaa: null,
      });
    }
  } catch (error) {
    console.error("Error reading users:", error);
    return NextResponse.json({
      gaetan: null,
      wynonaa: null,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const users: ConversationData["users"] = await request.json();
    const fs = await import("fs").then((m) => m.promises);
    const path = await import("path");

    const dataDir = path.join(process.cwd(), "public", "data");
    const usersFile = path.join(dataDir, "users.json");

    // Ensure data directory exists
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    await fs.writeFile(usersFile, JSON.stringify(users, null, 2));

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error saving users:", error);
    return NextResponse.json(
      { error: "Failed to save users" },
      { status: 500 }
    );
  }
}
