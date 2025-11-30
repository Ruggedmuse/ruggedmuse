import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-11-27", // use latest date
  token: process.env.SANITY_WRITE_TOKEN, // must have write permissions
  useCdn: false,
});

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // 🔎 Check if already subscribed
    const existing = await client.fetch(
      `*[_type == "newsletter" && email == $email][0]`,
      { email }
    );

    if (existing) {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 409 }
      );
    }

    // ✅ Save subscriber
    await client.create({
      _type: "newsletter",
      email,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: "Subscribed!" }, { status: 200 });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
