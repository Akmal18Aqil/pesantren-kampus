import { NextResponse } from "next/server";
import { db } from "@/db";
import { 
  users, 
  studentProfiles, 
  teacherProfiles, 
  courses, 
  classes, 
  enrollments,
  announcements,
  assignments,
  exams
} from "@/db/schema";
import { supabase } from "@/db/supabase";
import { eq, and } from "drizzle-orm";

// Demo data untuk seeding database
const demoData = {
  users: [
    {
      name: "Admin Pesantren",
      username: "admin",
      email: "admin@pesantren.edu",
      password: "12345",
      role: "admin",
      avatarUrl: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Ustadz Ahmad Fauzi",
      email: "ahmad.fauzi@pesantren.edu",
      password: "teacher123",
      role: "teacher",
      avatarUrl: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Dr. Budi Santoso",
      email: "budi.santoso@pesantren.edu",
      password: "teacher123",
      role: "teacher",
      avatarUrl: "https://i.pravatar.cc/150?img=3"
    },
    {
      name: "Ustadz Mahmud Hamdi",
      email: "mahmud.hamdi@pesantren.edu",
      password: "teacher123",
      role: "teacher",
      avatarUrl: "https://i.pravatar.cc/150?img=4"
    },
    {
      name: "Muhammad Rizki",
      email: "rizki@pesantren.edu",
      password: "student123",
      role: "student",
      avatarUrl: "https://i.pravatar.cc/150?img=5"
    },
    {
      name: "Aisyah Putri",
      email: "aisyah@pesantren.edu",
      password: "student123",
      role: "student",
      avatarUrl: "https://i.pravatar.cc/150?img=6"
    },
    {
      name: "Ahmad Dahlan",
      email: "dahlan@pesantren.edu",
      password: "student123",
      role: "student",
      avatarUrl: "https://i.pravatar.cc/150?img=7"
    }
  ],
  teacherProfiles: [
    {
      nip: "198501152010011001",
      specialization: "Tafsir Al-Qur'an",
      position: "Kepala Jurusan Ilmu Agama",
    },
    {
      nip: "198607182011011002",
      specialization: "Ilmu Komputer",
      position: "Kepala Laboratorium Komputer",
    },
    {
      nip: "197905122008011003",
      specialization: "Bahasa Arab",
      position: "Koordinator Bahasa",
    }
  ],
  studentProfiles: [
    {
      nim: "2021010001",
      programStudy: "Ilmu Komputer",
      entryYear: 2021,
      status: "active",
    },
    {
      nim: "2021020002",
      programStudy: "Pendidikan Agama Islam",
      entryYear: 2021,
      status: "active",
    },
    {
      nim: "2022010003",
      programStudy: "Ilmu Komputer",
      entryYear: 2022,
      status: "active",
    }
  ],
  courses: [
    {
      code: "TAF101",
      name: "Tafsir Al-Qur'an",
      description: "Mata kuliah ini membahas tentang tafsir Al-Qur'an dan metodologi penafsiran.",
      credits: 3,
      semester: 1,
      programStudy: "Pendidikan Agama Islam",
    },
    {
      code: "ALG201",
      name: "Algoritma & Pemrograman",
      description: "Mata kuliah ini membahas tentang dasar-dasar algoritma dan pemrograman komputer.",
      credits: 4,
      semester: 1,
      programStudy: "Ilmu Komputer",
    },
    {
      code: "ARB101",
      name: "Bahasa Arab",
      description: "Mata kuliah ini membahas tentang dasar-dasar bahasa Arab untuk komunikasi sehari-hari.",
      credits: 3,
      semester: 1,
      programStudy: "Pendidikan Agama Islam",
    },
    {
      code: "HAD102",
      name: "Hadits & Ilmu Hadits",
      description: "Mata kuliah ini membahas tentang hadits dan metodologi ilmu hadits.",
      credits: 3,
      semester: 2,
      programStudy: "Pendidikan Agama Islam",
    },
    {
      code: "WEB202",
      name: "Pemrograman Web",
      description: "Mata kuliah ini membahas tentang pengembangan aplikasi web dengan HTML, CSS, dan JavaScript.",
      credits: 4,
      semester: 2,
      programStudy: "Ilmu Komputer",
    }
  ],
  announcements: [
    {
      title: "Jadwal UTS Semester Ganjil 2024/2025",
      content: "Ujian Tengah Semester (UTS) Ganjil 2024/2025 akan dilaksanakan pada tanggal 15-20 Oktober 2024. Mahasiswa diharapkan mempersiapkan diri dengan baik dan memeriksa jadwal ujian masing-masing di SIAKAD.",
      targetAudience: "all",
      publishDate: new Date("2024-09-27"),
      isActive: true,
    },
    {
      title: "Libur Hari Raya Idul Fitri",
      content: "Berdasarkan keputusan pemerintah, libur Hari Raya Idul Fitri akan berlangsung dari tanggal 10-20 April 2025. Perkuliahan akan dimulai kembali pada tanggal 21 April 2025.",
      targetAudience: "all",
      publishDate: new Date("2024-09-25"),
      isActive: true,
    },
    {
      title: "Seminar Teknologi Informasi",
      content: "Program Studi Ilmu Komputer akan menyelenggarakan Seminar Teknologi Informasi dengan tema 'Artificial Intelligence dalam Pendidikan Islam' pada tanggal 5 Oktober 2024 di Aula Utama. Mahasiswa diharapkan untuk hadir.",
      targetAudience: "students",
      publishDate: new Date("2024-09-20"),
      isActive: true,
    }
  ]
};

export async function GET() {
  try {
    // Cek apakah data sudah ada
    const existingUsers = await db.select().from(users).limit(1);
    if (existingUsers.length > 0) {
      return NextResponse.json({ 
        message: "Database sudah berisi data demo",
        demoAccounts: [
          { role: "admin", email: "admin@pesantren.edu", password: "admin123" },
          { role: "teacher", email: "ahmad.fauzi@pesantren.edu", password: "teacher123" },
          { role: "student", email: "rizki@pesantren.edu", password: "student123" }
        ]
      });
    }

    // 1. Buat user di Supabase Auth dan database
    const createdUsers = [];
    for (const userData of demoData.users) {
      try {
        // Cek apakah user sudah ada di Supabase Auth
        const { data: existingAuthUser } = await supabase.auth.admin.listUsers();
        
        const foundUser = existingAuthUser?.users?.find(user => user.email === userData.email) || null;
        
        let authUserId;
        
        if (foundUser) {
          console.log(`User ${userData.email} already exists in Supabase Auth`);
          authUserId = foundUser.id;
        } else {
          // Buat user di Supabase Auth
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
          });

          if (authError) {
            console.error(`Error creating auth user ${userData.email}:`, authError);
            continue;
          }
          
          authUserId = authData.user?.id;
          
          // Konfirmasi email secara otomatis (admin only)
          await supabase.auth.admin.updateUserById(authUserId!, {
            email_confirm: true,
            user_metadata: { role: userData.role }
          });
        }

        // Cek apakah user sudah ada di database
        const existingDbUser = await db
          .select()
          .from(users)
          .where(eq(users.email, userData.email))
          .limit(1);

        if (existingDbUser.length > 0) {
          console.log(`User ${userData.email} already exists in database`);
          createdUsers.push(existingDbUser[0]);
          continue;
        }

        // Buat user di database
        const [newUser] = await db
          .insert(users)
          .values({
            name: userData.name,
            username: userData.username,
            email: userData.email,
            password: "**********", // Password disimpan di Supabase Auth
            role: userData.role as 'student' | 'teacher' | 'admin',
            avatarUrl: userData.avatarUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .returning();

        createdUsers.push(newUser);
      } catch (error) {
        console.error(`Error processing user ${userData.email}:`, error);
      }
    }

    // 2. Buat profil guru
    const teacherUsers = createdUsers.filter(u => u.role === 'teacher');
    for (let i = 0; i < Math.min(teacherUsers.length, demoData.teacherProfiles.length); i++) {
      const teacherUser = teacherUsers[i];
      
      // Cek apakah profil guru sudah ada
      const existingProfile = await db
        .select()
        .from(teacherProfiles)
        .where(eq(teacherProfiles.userId, teacherUser.id))
        .limit(1);
        
      if (existingProfile.length > 0) {
        console.log(`Teacher profile for ${teacherUser.name} already exists`);
        continue;
      }
      
      await db.insert(teacherProfiles).values({
        userId: teacherUser.id,
        nip: demoData.teacherProfiles[i].nip,
        specialization: demoData.teacherProfiles[i].specialization,
        position: demoData.teacherProfiles[i].position,
      });
    }

    // 3. Buat profil mahasiswa
    const studentUsers = createdUsers.filter(u => u.role === 'student');
    for (let i = 0; i < Math.min(studentUsers.length, demoData.studentProfiles.length); i++) {
      const studentUser = studentUsers[i];
      
      // Cek apakah profil mahasiswa sudah ada
      const existingProfile = await db
        .select()
        .from(studentProfiles)
        .where(eq(studentProfiles.userId, studentUser.id))
        .limit(1);
        
      if (existingProfile.length > 0) {
        console.log(`Student profile for ${studentUser.name} already exists`);
        continue;
      }
      
      await db.insert(studentProfiles).values({
        userId: studentUser.id,
        nim: demoData.studentProfiles[i].nim,
        programStudy: demoData.studentProfiles[i].programStudy,
        entryYear: demoData.studentProfiles[i].entryYear,
        status: demoData.studentProfiles[i].status as 'active' | 'inactive' | 'graduated' | 'on_leave',
      });
    }

    // 4. Buat mata kuliah
    const createdCourses = [];
    for (const courseData of demoData.courses) {
      // Cek apakah mata kuliah sudah ada
      const existingCourse = await db
        .select()
        .from(courses)
        .where(eq(courses.code, courseData.code))
        .limit(1);
        
      if (existingCourse.length > 0) {
        console.log(`Course ${courseData.code} already exists`);
        createdCourses.push(existingCourse[0]);
        continue;
      }
      
      const [newCourse] = await db
        .insert(courses)
        .values(courseData)
        .returning();
      
      createdCourses.push(newCourse);
    }

    // 5. Ambil data profil guru untuk membuat kelas
    const teacherProfilesData = await db.select().from(teacherProfiles);
    if (teacherProfilesData.length === 0) {
      throw new Error("Tidak ada profil guru yang tersedia untuk membuat kelas");
    }
    
    // 6. Buat kelas untuk setiap mata kuliah
    const createdClasses = [];
    for (let i = 0; i < createdCourses.length; i++) {
      const teacherIndex = i % teacherProfilesData.length;
      
      // Cek apakah kelas sudah ada
      const existingClass = await db
        .select()
        .from(classes)
        .where(eq(classes.courseId, createdCourses[i].id))
        .limit(1);
        
      if (existingClass.length > 0) {
        console.log(`Class for course ${createdCourses[i].code} already exists`);
        createdClasses.push(existingClass[0]);
        continue;
      }
      
      const [newClass] = await db
        .insert(classes)
        .values({
          courseId: createdCourses[i].id,
          teacherId: teacherProfilesData[teacherIndex].id,
          academicYear: "2024/2025",
          semester: i % 2 === 0 ? "odd" : "even" as 'odd' | 'even',
          schedule: JSON.stringify({
            day: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"][i % 5],
            time: ["07:30-09:10", "09:20-11:00", "13:00-14:40", "15:00-16:40"][i % 4],
            room: `Ruang ${101 + i}`,
          }),
          maxStudents: 30,
        })
        .returning();
      
      createdClasses.push(newClass);
    }

    // 7. Ambil data profil mahasiswa untuk enrollment
    const studentProfilesData = await db.select().from(studentProfiles);
    
    // 8. Buat enrollment untuk setiap mahasiswa
    for (const studentProfile of studentProfilesData) {
      // Enroll mahasiswa ke kelas yang sesuai dengan program studi
      for (const classData of createdClasses) {
        const course = createdCourses.find(c => c.id === classData.courseId);
        if (course && course.programStudy === studentProfile.programStudy) {
          // Cek apakah enrollment sudah ada
          const existingEnrollment = await db
            .select()
            .from(enrollments)
            .where(
              and(
                eq(enrollments.studentId, studentProfile.id),
                eq(enrollments.classId, classData.id)
              )
            )
            .limit(1);
            
          if (existingEnrollment.length > 0) {
            console.log(`Enrollment for student ${studentProfile.id} in class ${classData.id} already exists`);
            continue;
          }
          
          await db.insert(enrollments).values({
            studentId: studentProfile.id,
            classId: classData.id,
            enrollmentDate: new Date(),
            status: "active" as 'active' | 'dropped' | 'completed',
          });
        }
      }
    }

    // 9. Buat pengumuman
    const adminUser = createdUsers.find(u => u.role === 'admin');
    if (!adminUser) {
      throw new Error("Tidak ada user admin yang tersedia untuk membuat pengumuman");
    }
    
    for (const announcementData of demoData.announcements) {
      // Cek apakah pengumuman dengan judul yang sama sudah ada
      const existingAnnouncement = await db
        .select()
        .from(announcements)
        .where(eq(announcements.title, announcementData.title))
        .limit(1);
        
      if (existingAnnouncement.length > 0) {
        console.log(`Announcement "${announcementData.title}" already exists`);
        continue;
      }
      
      await db.insert(announcements).values({
        ...announcementData,
        targetAudience: announcementData.targetAudience as 'all' | 'students' | 'teachers' | 'specific_class',
        authorId: adminUser.id,
      });
    }

    // 10. Buat tugas untuk beberapa kelas
    for (let i = 0; i < createdClasses.length; i++) {
      const title = `Tugas ${i + 1}: ${createdCourses[i % createdCourses.length].name}`;
      
      // Cek apakah tugas dengan judul yang sama sudah ada
      const existingAssignment = await db
        .select()
        .from(assignments)
        .where(eq(assignments.title, title))
        .limit(1);
        
      if (existingAssignment.length > 0) {
        console.log(`Assignment "${title}" already exists`);
        continue;
      }
      
      await db.insert(assignments).values({
        classId: createdClasses[i].id,
        title,
        description: `Deskripsi tugas untuk mata kuliah ${createdCourses[i % createdCourses.length].name}. Silakan kerjakan dan kumpulkan sebelum tenggat waktu.`,
        dueDate: new Date(Date.now() + (7 + i) * 24 * 60 * 60 * 1000), // Tenggat 1-2 minggu dari sekarang
        maxScore: 100,
        weight: 20,
      });
    }

    // 11. Buat jadwal ujian untuk beberapa kelas
    for (let i = 0; i < createdClasses.length; i++) {
      const title = `UTS ${createdCourses[i % createdCourses.length].name}`;
      
      // Cek apakah ujian dengan judul yang sama sudah ada
      const existingExam = await db
        .select()
        .from(exams)
        .where(eq(exams.title, title))
        .limit(1);
        
      if (existingExam.length > 0) {
        console.log(`Exam "${title}" already exists`);
        continue;
      }
      
      await db.insert(exams).values({
        classId: createdClasses[i].id,
        title,
        description: `Ujian Tengah Semester untuk mata kuliah ${createdCourses[i % createdCourses.length].name}.`,
        date: new Date(Date.now() + (14 + i) * 24 * 60 * 60 * 1000), // Jadwal 2-3 minggu dari sekarang
        duration: 120, // 2 jam
        maxScore: 100,
        weight: 30,
      });
    }

    return NextResponse.json({ 
      message: "Data demo berhasil dibuat",
      demoAccounts: [
        { role: "admin", username: "admin", password: "12345" },
        { role: "teacher", username: "ahmad.fauzi", password: "teacher123" },
        { role: "student", username: "rizki", password: "student123" }
      ]
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      { error: `Gagal membuat data demo: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
