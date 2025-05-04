import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, studentProfiles, teacherProfiles } from "@/db/schema";
import { supabase } from "@/db/supabase";
import { eq, like, or, desc, asc, and, sql } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search");
    const role = searchParams.get("role");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    
    const offset = (page - 1) * limit;
    
    // Build where conditions
    let whereConditions = [];
    
    if (search) {
      whereConditions.push(
        or(
          like(users.name, `%${search}%`),
          like(users.username, `%${search}%`),
          like(users.email, `%${search}%`)
        )
      );
    }
    
    if (role) {
      whereConditions.push(eq(users.role, role as 'student' | 'teacher' | 'admin'));
    }
    
    // Build base query
    let query = db.select().from(users);
    
    // Build query with conditions and sorting
    let finalQuery = query;
    
    // Apply where conditions if any
    if (whereConditions.length > 0) {
      finalQuery = db.select().from(users).where(and(...whereConditions));
    }
    
    // Apply sorting
    if (sortOrder === "asc") {
      if (sortBy in users) {
        const column = users[sortBy as keyof typeof users];
        if ('name' in column) { // Check if it's a column
          finalQuery = finalQuery.orderBy(asc(column as any));
        }
      }
    } else {
      if (sortBy in users) {
        const column = users[sortBy as keyof typeof users];
        if ('name' in column) { // Check if it's a column
          finalQuery = finalQuery.orderBy(desc(column as any));
        }
      }
    }
    
    // Apply pagination
    finalQuery = finalQuery.limit(limit).offset(offset);
    
    // Execute query
    const usersData = await finalQuery;
    
    // Get total count for pagination
    const countQuery = db
      .select({ count: sql<number>`count(*)` })
      .from(users);
    
    if (whereConditions.length > 0) {
      countQuery.where(and(...whereConditions));
    }
    
    const [{ count }] = await countQuery;
    const totalPages = Math.ceil(count / limit);
    
    return NextResponse.json({
      users: usersData,
      pagination: {
        total: count,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data pengguna" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, username, email, password, role, profileData } = await request.json();

    if (!name || !username || !email || !password || !role) {
      return NextResponse.json(
        { error: "Semua field diperlukan" },
        { status: 400 }
      );
    }

    // Check if username or email already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.username, username),
          eq(users.email, email)
        )
      )
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "Username atau email sudah digunakan" },
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

    // Confirm email automatically
    if (authData.user) {
      await supabase.auth.admin.updateUserById(authData.user.id, {
        email_confirm: true,
        user_metadata: { role }
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
        role: role as 'student' | 'teacher' | 'admin',
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
      message: "User berhasil dibuat",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Gagal membuat user" },
      { status: 500 }
    );
  }
}
