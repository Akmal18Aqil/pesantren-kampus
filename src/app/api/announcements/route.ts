import { NextResponse } from "next/server";
import { db } from "@/db";
import { announcements, users } from "@/db/schema";
import { desc, eq, and, gte } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const targetAudience = searchParams.get("audience");
    const classId = searchParams.get("classId");

    // Build conditions array
    const conditions = [
      eq(announcements.isActive, true),
      gte(announcements.publishDate, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) // Last 30 days
    ];
    
    // Add audience filter if provided
    if (targetAudience) {
      conditions.push(eq(announcements.targetAudience, targetAudience as 'all' | 'students' | 'teachers' | 'specific_class'));
    }
    
    // Add class filter if provided
    if (classId) {
      conditions.push(eq(announcements.targetClassId, parseInt(classId)));
    }
    
    // Execute query with all conditions
    const query = db.select({
      id: announcements.id,
      title: announcements.title,
      content: announcements.content,
      publishDate: announcements.publishDate,
      authorName: users.name,
    })
    .from(announcements)
    .innerJoin(users, eq(announcements.authorId, users.id))
    .where(and(...conditions))
    .orderBy(desc(announcements.publishDate))
    .limit(limit);

    const announcementsList = await query;

    return NextResponse.json(announcementsList);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data pengumuman" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, content, authorId, targetAudience, targetClassId, expiryDate } = await request.json();

    if (!title || !content || !authorId || !targetAudience) {
      return NextResponse.json(
        { error: "Semua field diperlukan" },
        { status: 400 }
      );
    }

    const newAnnouncement = await db.insert(announcements)
      .values({
        title,
        content,
        authorId,
        targetAudience,
        targetClassId: targetClassId || undefined,
        publishDate: new Date(),
        expiryDate: expiryDate ? new Date(expiryDate) : undefined,
        isActive: true,
      })
      .returning();

    return NextResponse.json(newAnnouncement[0]);
  } catch (error) {
    console.error("Error creating announcement:", error);
    return NextResponse.json(
      { error: "Gagal membuat pengumuman" },
      { status: 500 }
    );
  }
}
