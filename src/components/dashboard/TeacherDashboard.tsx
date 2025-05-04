'use client';

import { motion } from 'framer-motion';
import { BookOpen, FileText, Calendar, Clock, ChevronRight, Loader2 } from 'lucide-react';
interface Schedule {
  id: number;
  courseName: string;
  courseCode: string;
  schedule: string;
  teacherName?: string;
  academicYear: string;
  semester: string;
}
interface Announcement {
  id: number;
  title: string;
  content: string;
  publishDate: string;
  authorName: string;
}
interface TeacherDashboardProps {
  schedules: Schedule[];
  announcements: Announcement[];
  isLoadingSchedules: boolean;
  isLoadingAnnouncements: boolean;
  formattedDate: string;
}
export default function TeacherDashboard({
  schedules,
  announcements,
  isLoadingSchedules,
  isLoadingAnnouncements,
  formattedDate
}: TeacherDashboardProps) {
  return <>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6" data-unique-id="eb87743a-5733-4384-b122-fcd7df1431d9" data-loc="42:6-42:66" data-file-name="components/dashboard/TeacherDashboard.tsx">
        <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1
      }} className="card flex items-center space-x-4" data-unique-id="506e42a3-bda3-49a6-ad48-4cb0a1d0767f" data-loc="43:8-48:9" data-file-name="components/dashboard/TeacherDashboard.tsx">
          <div className="bg-primary/10 p-3 rounded-lg" data-unique-id="82e28761-bf45-4b75-b385-6068447b5900" data-loc="49:10-49:56" data-file-name="components/dashboard/TeacherDashboard.tsx">
            <BookOpen size={24} className="text-primary" />
          </div>
          <div data-unique-id="07213acf-ffe5-4bae-a14f-9c88e1b00ef5" data-loc="52:10-52:15" data-file-name="components/dashboard/TeacherDashboard.tsx">
            <h3 className="text-xl font-semibold" data-unique-id="e840e039-b5f3-4020-a049-c4fd01e8a6c5" data-loc="53:12-53:50" data-file-name="components/dashboard/TeacherDashboard.tsx">{schedules.length}</h3>
            <p className="text-sm text-muted-foreground" data-unique-id="1677ed56-fb37-47f6-820b-085ae933b166" data-loc="54:12-54:57" data-file-name="components/dashboard/TeacherDashboard.tsx">Mata Kuliah Hari Ini</p>
          </div>
        </motion.div>
        
        <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }} className="card flex items-center space-x-4" data-unique-id="6b5e196b-6be8-4a8d-8c03-2a59654fb8e6" data-loc="58:8-63:9" data-file-name="components/dashboard/TeacherDashboard.tsx">
          <div className="bg-accent/10 p-3 rounded-lg" data-unique-id="bd1d9457-46c8-4f07-ba3e-52ccf3130bd3" data-loc="64:10-64:55" data-file-name="components/dashboard/TeacherDashboard.tsx">
            <FileText size={24} className="text-accent" />
          </div>
          <div data-unique-id="1547b6ee-2a52-4cd9-96c0-f54e74639424" data-loc="67:10-67:15" data-file-name="components/dashboard/TeacherDashboard.tsx">
            <h3 className="text-xl font-semibold" data-unique-id="d9395b0f-182f-4def-9b9d-5cf25b221c34" data-loc="68:12-68:50" data-file-name="components/dashboard/TeacherDashboard.tsx">5</h3>
            <p className="text-sm text-muted-foreground" data-unique-id="1b360fa2-5b0d-4d2b-a34e-4da555575f0d" data-loc="69:12-69:57" data-file-name="components/dashboard/TeacherDashboard.tsx">Tugas Menunggu</p>
          </div>
        </motion.div>
        
        <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3
      }} className="card flex items-center space-x-4" data-unique-id="14a54e9d-cb82-4818-8705-308bfb07fd1f" data-loc="73:8-78:9" data-file-name="components/dashboard/TeacherDashboard.tsx">
          <div className="bg-secondary/10 p-3 rounded-lg" data-unique-id="ca2bb2e1-d926-452e-82c1-6478643edb5c" data-loc="79:10-79:58" data-file-name="components/dashboard/TeacherDashboard.tsx">
            <Calendar size={24} className="text-secondary" data-unique-id="d9ac81a1-17df-427c-af7b-8523a1a7f99d" data-loc="80:12-80:61" data-file-name="components/dashboard/TeacherDashboard.tsx" />
          </div>
          <div data-unique-id="07143981-f590-4c0c-b2cd-7cce9a24b04e" data-loc="82:10-82:15" data-file-name="components/dashboard/TeacherDashboard.tsx">
            <h3 className="text-xl font-semibold" data-unique-id="5551ed3e-97ad-447c-8194-990bfd52842b" data-loc="83:12-83:50" data-file-name="components/dashboard/TeacherDashboard.tsx">3</h3>
            <p className="text-sm text-muted-foreground" data-unique-id="050dce84-fa3f-4dce-9199-1b92947da804" data-loc="84:12-84:57" data-file-name="components/dashboard/TeacherDashboard.tsx">Ujian Mendatang</p>
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-unique-id="1eeb7aa7-57b0-4f91-b1a7-20f2a8460a72" data-loc="89:6-89:61" data-file-name="components/dashboard/TeacherDashboard.tsx">
        {/* Schedule */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }} className="card md:col-span-2" data-unique-id="c574a8d4-16da-45f4-a20d-d43ef4af81aa" data-loc="91:8-96:9" data-file-name="components/dashboard/TeacherDashboard.tsx">
          <div className="flex justify-between items-center mb-4" data-unique-id="8047be2c-fe81-4b9b-878e-379fd7ba01e3" data-loc="97:10-97:66" data-file-name="components/dashboard/TeacherDashboard.tsx">
            <h2 className="text-lg font-semibold" data-unique-id="02ad22c1-0019-4ac5-9c05-51db69ee770d" data-loc="98:12-98:50" data-file-name="components/dashboard/TeacherDashboard.tsx">Jadwal Mengajar Hari Ini</h2>
            <span className="text-sm text-primary" data-unique-id="7fc5bc26-1ff4-4e79-9dab-5ccb3b21110d" data-loc="99:12-99:51" data-file-name="components/dashboard/TeacherDashboard.tsx">{formattedDate}</span>
          </div>
          
          <div className="space-y-3" data-unique-id="fb084de8-e523-47a7-99db-94e9bfbb9b59" data-loc="102:10-102:37" data-file-name="components/dashboard/TeacherDashboard.tsx">
            {isLoadingSchedules ? <div className="flex justify-center py-8" data-unique-id="091223cc-45fb-407f-b4ad-b163fb7429b2" data-loc="104:14-104:56" data-file-name="components/dashboard/TeacherDashboard.tsx">
                <Loader2 size={24} className="animate-spin text-primary" />
              </div> : schedules.length > 0 ? schedules.map((schedule, index) => {
            const scheduleData = JSON.parse(schedule.schedule);
            return <div key={index} className="flex items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors" data-unique-id="map_69a9fad4-9062-433d-834c-4834c53774f3" data-loc="111:18-111:125" data-file-name="components/dashboard/TeacherDashboard.tsx" data-is-mapped="true">
                    <div className="mr-4 bg-card p-2 rounded-lg border border-border" data-unique-id="map_1dd568d2-e1bb-43f5-8e33-f814626d7b87" data-loc="112:20-112:86" data-file-name="components/dashboard/TeacherDashboard.tsx" data-is-mapped="true">
                      <Clock size={20} className="text-primary" />
                    </div>
                    <div className="flex-grow" data-unique-id="map_b9318b7c-f943-4d95-8b7c-9032653fe24d" data-loc="115:20-115:47" data-file-name="components/dashboard/TeacherDashboard.tsx" data-is-mapped="true">
                      <p className="font-medium" data-unique-id="map_83b22a42-48b1-4a49-91d2-55a981c3ca54" data-loc="116:22-116:49" data-file-name="components/dashboard/TeacherDashboard.tsx" data-is-mapped="true">{schedule.courseName} ({schedule.courseCode})</p>
                      <p className="text-sm text-muted-foreground" data-unique-id="map_87af1e1a-84b1-4fec-89fb-576e9b30f687" data-loc="117:22-117:67" data-file-name="components/dashboard/TeacherDashboard.tsx" data-is-mapped="true">
                        {scheduleData.room} • Anda mengajar
                      </p>
                    </div>
                    <div className="text-sm font-medium" data-unique-id="map_fcaba740-44d2-438c-9876-32fe2623002b" data-loc="121:20-121:57" data-file-name="components/dashboard/TeacherDashboard.tsx" data-is-mapped="true">{scheduleData.time}</div>
                  </div>;
          }) : <div className="text-center py-8 text-muted-foreground" data-unique-id="ec9fc74d-c551-412f-9c01-4237850a8be5" data-loc="126:14-126:70" data-file-name="components/dashboard/TeacherDashboard.tsx">
                Tidak ada jadwal mengajar untuk hari ini
              </div>}
          </div>
        </motion.div>
        
        {/* Announcements */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.5
      }} className="card" data-unique-id="b845d75c-aabd-4b4d-9893-0a90f7fc1fcc" data-loc="134:8-139:9" data-file-name="components/dashboard/TeacherDashboard.tsx">
          <div className="flex justify-between items-center mb-4" data-unique-id="fb83dcab-3a96-4392-9ef1-b38b7c661af7" data-loc="140:10-140:66" data-file-name="components/dashboard/TeacherDashboard.tsx">
            <h2 className="text-lg font-semibold" data-unique-id="104070f9-d57a-4bca-ab2f-93555100d33e" data-loc="141:12-141:50" data-file-name="components/dashboard/TeacherDashboard.tsx">Pengumuman</h2>
            <span className="text-xs text-primary cursor-pointer" data-unique-id="dd4cf807-d798-4bba-b180-4fbefd385a52" data-loc="142:12-142:66" data-file-name="components/dashboard/TeacherDashboard.tsx">Lihat Semua</span>
          </div>
          
          <div className="space-y-3" data-unique-id="efd745eb-c095-4631-8040-61df5ac6d604" data-loc="145:10-145:37" data-file-name="components/dashboard/TeacherDashboard.tsx">
            {isLoadingAnnouncements ? <div className="flex justify-center py-8" data-unique-id="9bc8abbc-371b-4331-b715-50ce0d2d7907" data-loc="147:14-147:56" data-file-name="components/dashboard/TeacherDashboard.tsx">
                <Loader2 size={24} className="animate-spin text-primary" />
              </div> : announcements.length > 0 ? announcements.map((announcement, index) => <div key={index} className="flex items-center justify-between p-3 border-b border-border last:border-0" data-unique-id="map_597c82c4-cdc3-4b02-aad8-767b74e8217f" data-loc="152:16-152:120" data-file-name="components/dashboard/TeacherDashboard.tsx" data-is-mapped="true">
                  <div data-unique-id="map_1a257472-3bb3-484c-819c-8d016d1b6482" data-loc="153:18-153:23" data-file-name="components/dashboard/TeacherDashboard.tsx" data-is-mapped="true">
                    <p className="font-medium" data-unique-id="map_0290e7a6-4906-4e22-8684-ffca6b5a2b14" data-loc="154:20-154:47" data-file-name="components/dashboard/TeacherDashboard.tsx" data-is-mapped="true">{announcement.title}</p>
                    <p className="text-xs text-muted-foreground" data-unique-id="map_9c4ef4b5-fa41-4b8e-8d81-2c798272503d" data-loc="155:20-155:65" data-file-name="components/dashboard/TeacherDashboard.tsx" data-is-mapped="true">
                      {new Date(announcement.publishDate).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>) : <div className="text-center py-8 text-muted-foreground" data-unique-id="07b94046-477e-4958-868a-1fb13dc95a60" data-loc="167:14-167:70" data-file-name="components/dashboard/TeacherDashboard.tsx">
                Tidak ada pengumuman terbaru
              </div>}
          </div>
        </motion.div>
      </div>
    </>;
}