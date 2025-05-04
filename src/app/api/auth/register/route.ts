import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, studentProfiles, teacherProfiles } from "@/db/schema";
import { supabase } from "@/db/supabase";

export async function POST(request: Request) {
  try {
    const { name, username, email, password, role, profileData } = await request.json();

    if (!name || !username || !email || !password || !role) {
      return NextResponse.json(
        { error: "Semua field diperlukan" },
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

    // Create user in our database
    const [newUser] = await db
      .insert(users)
      .values({
        name,
        username,
        email,
        password: "**********", // Don't store actual password, it's in Supabase Auth
        role,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    // Create profile based on role
    if (role === "student" && profileData) {
      const { nim, programStudy, entryYear } = profileData;
      
      await db.insert(studentProfiles).values({
        userId: newUser.id,
        nim,
        programStudy,
        entryYear,
        status: "active",
      });
    } else if (role === "teacher" && profileData) {
      const { nip, specialization, position } = profileData;
      
      await db.insert(teacherProfiles).values({
        userId: newUser.id,
        nip,
        specialization,
        position: position || "",
      });
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      user: userWithoutPassword,
      session: authData.session,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat registrasi" },
      { status: 500 }
    );
  }
}
