import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { supabase } from "@/db/supabase";
import { eq, or } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { name, username, email, password } = await request.json();

    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(
        or(eq(users.email, email), eq(users.username, username))
      )
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User with this email or username already exists" },
        { status: 400 }
      );
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    // Confirm email automatically for admin
    if (authData.user) {
      await supabase.auth.admin.updateUserById(authData.user.id, {
        email_confirm: true,
        user_metadata: { role: 'admin' }
      });
    }

    // Create user in our database
    const [newUser] = await db
      .insert(users)
      .values({
        name,
        username,
        email,
        password: "**********", // Don't store actual password, it's in Supabase Auth
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      message: "Admin user created successfully",
      user: userWithoutPassword
    });
  } catch (error) {
    console.error("Error creating admin user:", error);
    return NextResponse.json(
      { error: "Failed to create admin user" },
      { status: 500 }
    );
  }
}
