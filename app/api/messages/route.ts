import { NextRequest, NextResponse } from "next/server";
import { Message } from "@/app/types";

export async function GET() {
  try {
    const fs = await import("fs").then((m) => m.promises);
    const path = await import("path");

    const dataDir = path.join(process.cwd(), "public", "data");
    const messagesFile = path.join(dataDir, "messages.json");

    try {
      const data = await fs.readFile(messagesFile, "utf-8");
      const messages = JSON.parse(data);
      return NextResponse.json(messages);
    } catch (error) {
      // File doesn't exist yet, return empty array
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("Error reading messages:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const message: Message = await request.json();
    const fs = await import("fs").then((m) => m.promises);
    const path = await import("path");

    const dataDir = path.join(process.cwd(), "public", "data");
    const messagesFile = path.join(dataDir, "messages.json");

    // Ensure data directory exists
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    let messages: Message[] = [];
    try {
      const data = await fs.readFile(messagesFile, "utf-8");
      messages = JSON.parse(data);
    } catch (error) {
      // File doesn't exist, start with empty array
    }

    messages.push(message);
    await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2));

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}
