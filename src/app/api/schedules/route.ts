import { NextResponse } from "next/server";
import { db } from "@/db";
import { classes, courses, teacherProfiles, users, enrollments, studentProfiles } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const date = searchParams.get("date") || new Date().toISOString().split('T')[0];
    const role = searchParams.get("role");

    if (!userId || !role) {
      return NextResponse.json(
        { error: "User ID dan role diperlukan" },
        { status: 400 }
      );
    }

    let scheduleQuery;

    if (role === "student") {
      // Get student's schedule
      scheduleQuery = db.select({
        id: classes.id,
        courseName: courses.name,
        courseCode: courses.code,
        schedule: classes.schedule,
        teacherName: users.name,
        academicYear: classes.academicYear,
        semester: classes.semester,
      })
      .from(classes)
      .innerJoin(courses, eq(classes.courseId, courses.id))
      .innerJoin(teacherProfiles, eq(classes.teacherId, teacherProfiles.id))
      .innerJoin(users, eq(teacherProfiles.userId, users.id))
      .innerJoin(enrollments, eq(classes.id, enrollments.classId))
      .innerJoin(studentProfiles, eq(enrollments.studentId, studentProfiles.id))
      .where(
        and(
          eq(studentProfiles.userId, parseInt(userId)),
          eq(enrollments.status, "active")
        )
      );
    } else if (role === "teacher") {
      // Get teacher's schedule
      scheduleQuery = db.select({
        id: classes.id,
        courseName: courses.name,
        courseCode: courses.code,
        schedule: classes.schedule,
        academicYear: classes.academicYear,
        semester: classes.semester,
      })
      .from(classes)
      .innerJoin(courses, eq(classes.courseId, courses.id))
      .innerJoin(teacherProfiles, eq(classes.teacherId, teacherProfiles.id))
      .where(eq(teacherProfiles.userId, parseInt(userId)));
    } else {
      return NextResponse.json(
        { error: "Role tidak valid" },
        { status: 400 }
      );
    }

    const schedules = await scheduleQuery;

    // Filter schedules for the specific day
    // Assuming schedule is stored as JSON string with format: {"day": "Monday", "time": "07:30-09:10", "room": "101"}
    const dayOfWeek = new Date(date).toLocaleDateString('id-ID', { weekday: 'long' });
    
    const filteredSchedules = schedules.filter(schedule => {
      const scheduleData = JSON.parse(schedule.schedule);
      return scheduleData.day === dayOfWeek;
    });

    return NextResponse.json(filteredSchedules);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return NextResponse.json(
      { error: "Gagal mengambil jadwal" },
      { status: 500 }
    );
  }
}
