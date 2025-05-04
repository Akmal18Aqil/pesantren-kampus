import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, studentProfiles, teacherProfiles } from "@/db/schema";
import { supabase } from "@/db/supabase";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID pengguna tidak valid" },
        { status: 400 }
      );
    }
    
    // Get user data
    const userData = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    
    if (!userData.length) {
      return NextResponse.json(
        { error: "Pengguna tidak ditemukan" },
        { status: 404 }
      );
    }
    
    const user = userData[0];
    
    // Get profile data based on role
    let profileData = null;
    
    if (user.role === "student") {
      const studentData = await db
        .select()
        .from(studentProfiles)
        .where(eq(studentProfiles.userId, id))
        .limit(1);
      
      if (studentData.length) {
        profileData = studentData[0];
      }
    } else if (user.role === "teacher") {
      const teacherData = await db
        .select()
        .from(teacherProfiles)
        .where(eq(teacherProfiles.userId, id))
        .limit(1);
      
      if (teacherData.length) {
        profileData = teacherData[0];
      }
    }
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      user: userWithoutPassword,
      profile: profileData,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data pengguna" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID pengguna tidak valid" },
        { status: 400 }
      );
    }
    
    const { name, username, email, password, role, profileData } = await request.json();
    
    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    
    if (!existingUser.length) {
      return NextResponse.json(
        { error: "Pengguna tidak ditemukan" },
        { status: 404 }
      );
    }
    
    const user = existingUser[0];
    
    // Update user data
    const updateData: any = {
      updatedAt: new Date(),
    };
    
    if (name) updateData.name = name;
    if (username && username !== user.username) updateData.username = username;
    
    // If email is changed, update in Supabase Auth too
    if (email && email !== user.email) {
      // Find user in Supabase Auth by email
      const { data: authUser } = await supabase.auth.admin.listUsers();
      const supabaseUser = authUser?.users?.find(u => u.email === user.email);
      
      if (supabaseUser) {
        // Update email in Supabase Auth
        await supabase.auth.admin.updateUserById(supabaseUser.id, {
          email,
        });
      }
      
      updateData.email = email;
    }
    
    // If password is provided, update in Supabase Auth
    if (password) {
      // Find user in Supabase Auth by email
      const { data: authUser } = await supabase.auth.admin.listUsers();
      const supabaseUser = authUser?.users?.find(u => u.email === user.email);
      
      if (supabaseUser) {
        // Update password in Supabase Auth
        await supabase.auth.admin.updateUserById(supabaseUser.id, {
          password,
        });
      }
    }
    
    // Update user in database
    const [updatedUser] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();
    
    // Update profile based on role
    if (profileData) {
      if (role === "student" || user.role === "student") {
        const { nim, programStudy, entryYear, status } = profileData;
        
        // Check if profile exists
        const existingProfile = await db
          .select()
          .from(studentProfiles)
          .where(eq(studentProfiles.userId, id))
          .limit(1);
        
        if (existingProfile.length) {
          // Update existing profile
          await db
            .update(studentProfiles)
            .set({
              nim: nim || existingProfile[0].nim,
              programStudy: programStudy || existingProfile[0].programStudy,
              entryYear: entryYear || existingProfile[0].entryYear,
              status: status || existingProfile[0].status,
            })
            .where(eq(studentProfiles.userId, id));
        } else {
          // Create new profile
          await db.insert(studentProfiles).values({
            userId: id,
            nim,
            programStudy,
            entryYear,
            status: status || "active",
          });
        }
      } else if (role === "teacher" || user.role === "teacher") {
        const { nip, specialization, position } = profileData;
        
        // Check if profile exists
        const existingProfile = await db
          .select()
          .from(teacherProfiles)
          .where(eq(teacherProfiles.userId, id))
          .limit(1);
        
        if (existingProfile.length) {
          // Update existing profile
          await db
            .update(teacherProfiles)
            .set({
              nip: nip || existingProfile[0].nip,
              specialization: specialization || existingProfile[0].specialization,
              position: position || existingProfile[0].position,
            })
            .where(eq(teacherProfiles.userId, id));
        } else {
          // Create new profile
          await db.insert(teacherProfiles).values({
            userId: id,
            nip,
            specialization,
            position: position || "",
          });
        }
      }
    }
    
    // Return updated user data without password
    const { password: _, ...userWithoutPassword } = updatedUser;
    
    return NextResponse.json({
      message: "User berhasil diperbarui",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID pengguna tidak valid" },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    
    if (!existingUser.length) {
      return NextResponse.json(
        { error: "Pengguna tidak ditemukan" },
        { status: 404 }
      );
    }
    
    const user = existingUser[0];
    
    // Delete user from Supabase Auth
    const { data: authUser } = await supabase.auth.admin.listUsers();
    const supabaseUser = authUser?.users?.find(u => u.email === user.email);
    
    if (supabaseUser) {
      await supabase.auth.admin.deleteUser(supabaseUser.id);
    }
    
    // Delete profile based on role
    if (user.role === "student") {
      await db
        .delete(studentProfiles)
        .where(eq(studentProfiles.userId, id));
    } else if (user.role === "teacher") {
      await db
        .delete(teacherProfiles)
        .where(eq(teacherProfiles.userId, id));
    }
    
    // Delete user from database
    await db
      .delete(users)
      .where(eq(users.id, id));
    
    return NextResponse.json({
      message: "User berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Gagal menghapus user" },
      { status: 500 }
    );
  }
}
