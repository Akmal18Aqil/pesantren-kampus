import { pgTable, serial, text, integer, timestamp, boolean, primaryKey, uniqueIndex } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

// Users table - for students, teachers, and admins
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role').$type<'student' | 'teacher' | 'admin'>().notNull(),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Student profiles - extends user information for students
export const studentProfiles = pgTable('student_profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  nim: text('nim').notNull().unique(), // Student ID number
  programStudy: text('program_study').notNull(),
  entryYear: integer('entry_year').notNull(),
  status: text('status').$type<'active' | 'inactive' | 'graduated' | 'on_leave'>().notNull(),
});

// Teacher profiles - extends user information for teachers
export const teacherProfiles = pgTable('teacher_profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  nip: text('nip').notNull().unique(), // Teacher ID number
  specialization: text('specialization').notNull(),
  position: text('position'),
});

// Courses table
export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  code: text('code').notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  credits: integer('credits').notNull(),
  semester: integer('semester').notNull(),
  programStudy: text('program_study').notNull(),
});

// Classes table - instances of courses in a specific semester
export const classes = pgTable('classes', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id').notNull().references(() => courses.id),
  teacherId: integer('teacher_id').notNull().references(() => teacherProfiles.id),
  academicYear: text('academic_year').notNull(), // e.g., "2024/2025"
  semester: text('semester').$type<'odd' | 'even'>().notNull(),
  schedule: text('schedule').notNull(), // JSON string with day, time, room
  maxStudents: integer('max_students').notNull(),
});

// Enrollments table - students enrolled in classes
export const enrollments = pgTable('enrollments', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id').notNull().references(() => studentProfiles.id),
  classId: integer('class_id').notNull().references(() => classes.id),
  enrollmentDate: timestamp('enrollment_date').defaultNow().notNull(),
  status: text('status').$type<'active' | 'dropped' | 'completed'>().notNull(),
});

// Attendance table
export const attendance = pgTable('attendance', {
  id: serial('id').primaryKey(),
  enrollmentId: integer('enrollment_id').notNull().references(() => enrollments.id),
  date: timestamp('date').notNull(),
  status: text('status').$type<'present' | 'absent' | 'excused' | 'late'>().notNull(),
  notes: text('notes'),
});

// Assignments table
export const assignments = pgTable('assignments', {
  id: serial('id').primaryKey(),
  classId: integer('class_id').notNull().references(() => classes.id),
  title: text('title').notNull(),
  description: text('description'),
  dueDate: timestamp('due_date').notNull(),
  maxScore: integer('max_score').notNull(),
  weight: integer('weight').notNull(), // Percentage weight in final grade
});

// Assignment submissions
export const submissions = pgTable('submissions', {
  id: serial('id').primaryKey(),
  assignmentId: integer('assignment_id').notNull().references(() => assignments.id),
  studentId: integer('student_id').notNull().references(() => studentProfiles.id),
  submissionDate: timestamp('submission_date').defaultNow().notNull(),
  fileUrl: text('file_url'),
  score: integer('score'),
  feedback: text('feedback'),
  status: text('status').$type<'submitted' | 'graded' | 'late' | 'missing'>().notNull(),
});

// Exams table
export const exams = pgTable('exams', {
  id: serial('id').primaryKey(),
  classId: integer('class_id').notNull().references(() => classes.id),
  title: text('title').notNull(),
  description: text('description'),
  date: timestamp('date').notNull(),
  duration: integer('duration').notNull(), // in minutes
  maxScore: integer('max_score').notNull(),
  weight: integer('weight').notNull(), // Percentage weight in final grade
});

// Exam results
export const examResults = pgTable('exam_results', {
  id: serial('id').primaryKey(),
  examId: integer('exam_id').notNull().references(() => exams.id),
  studentId: integer('student_id').notNull().references(() => studentProfiles.id),
  score: integer('score').notNull(),
  notes: text('notes'),
});

// Announcements table
export const announcements = pgTable('announcements', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  authorId: integer('author_id').notNull().references(() => users.id),
  targetAudience: text('target_audience').$type<'all' | 'students' | 'teachers' | 'specific_class'>(),
  targetClassId: integer('target_class_id').references(() => classes.id),
  publishDate: timestamp('publish_date').defaultNow().notNull(),
  expiryDate: timestamp('expiry_date'),
  isActive: boolean('is_active').default(true).notNull(),
});

// Define relations
export const usersRelations = relations(users, ({ one, many }) => ({
  studentProfile: one(studentProfiles, {
    fields: [users.id],
    references: [studentProfiles.userId],
  }),
  teacherProfile: one(teacherProfiles, {
    fields: [users.id],
    references: [teacherProfiles.userId],
  }),
  announcements: many(announcements),
}));

export const studentProfilesRelations = relations(studentProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [studentProfiles.userId],
    references: [users.id],
  }),
  enrollments: many(enrollments),
  submissions: many(submissions),
  examResults: many(examResults),
}));

export const teacherProfilesRelations = relations(teacherProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [teacherProfiles.userId],
    references: [users.id],
  }),
  classes: many(classes),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  classes: many(classes),
}));

export const classesRelations = relations(classes, ({ one, many }) => ({
  course: one(courses, {
    fields: [classes.courseId],
    references: [courses.id],
  }),
  teacher: one(teacherProfiles, {
    fields: [classes.teacherId],
    references: [teacherProfiles.id],
  }),
  enrollments: many(enrollments),
  assignments: many(assignments),
  exams: many(exams),
  announcements: many(announcements),
}));

// Define types for select and insert operations
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type StudentProfile = InferSelectModel<typeof studentProfiles>;
export type NewStudentProfile = InferInsertModel<typeof studentProfiles>;

export type TeacherProfile = InferSelectModel<typeof teacherProfiles>;
export type NewTeacherProfile = InferInsertModel<typeof teacherProfiles>;

export type Course = InferSelectModel<typeof courses>;
export type NewCourse = InferInsertModel<typeof courses>;

export type Class = InferSelectModel<typeof classes>;
export type NewClass = InferInsertModel<typeof classes>;

export type Enrollment = InferSelectModel<typeof enrollments>;
export type NewEnrollment = InferInsertModel<typeof enrollments>;

export type Attendance = InferSelectModel<typeof attendance>;
export type NewAttendance = InferInsertModel<typeof attendance>;

export type Assignment = InferSelectModel<typeof assignments>;
export type NewAssignment = InferInsertModel<typeof assignments>;

export type Submission = InferSelectModel<typeof submissions>;
export type NewSubmission = InferInsertModel<typeof submissions>;

export type Exam = InferSelectModel<typeof exams>;
export type NewExam = InferInsertModel<typeof exams>;

export type ExamResult = InferSelectModel<typeof examResults>;
export type NewExamResult = InferInsertModel<typeof examResults>;

export type Announcement = InferSelectModel<typeof announcements>;
export type NewAnnouncement = InferInsertModel<typeof announcements>;
