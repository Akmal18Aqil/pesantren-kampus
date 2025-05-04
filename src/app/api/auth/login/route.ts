import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import { supabase } from "@/db/supabase";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password diperlukan" },
        { status: 400 }
      );
    }

    // Get user data from our database first to check if user exists
    const userData = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (!userData.length) {
      return NextResponse.json(
        { error: "Username atau password salah" },
        { status: 401 }
      );
    }

    // Get the email from our database to authenticate with Supabase
    const userEmail = userData[0].email;

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: "Username atau password salah" },
        { status: 401 }
      );
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = userData[0];

    return NextResponse.json({
      user: userWithoutPassword,
      session: data.session,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat login" },
      { status: 500 }
    );
  }
}
