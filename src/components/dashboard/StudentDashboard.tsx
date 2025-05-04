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
interface StudentDashboardProps {
  schedules: Schedule[];
  announcements: Announcement[];
  isLoadingSchedules: boolean;
  isLoadingAnnouncements: boolean;
  formattedDate: string;
}
export default function StudentDashboard({
  schedules,
  announcements,
  isLoadingSchedules,
  isLoadingAnnouncements,
  formattedDate
}: StudentDashboardProps) {
  return <>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6" data-unique-id="3a162f8b-9b1a-4729-8b2c-7b523540ca01" data-loc="42:6-42:66" data-file-name="components/dashboard/StudentDashboard.tsx">
        <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1
      }} className="card flex items-center space-x-4" data-unique-id="f61d67ca-3def-4ccd-8c4e-c937c5005444" data-loc="43:8-48:9" data-file-name="components/dashboard/StudentDashboard.tsx">
          <div className="bg-primary/10 p-3 rounded-lg" data-unique-id="d77494ef-49a2-4cbe-878b-1dd9ba25894f" data-loc="49:10-49:56" data-file-name="components/dashboard/StudentDashboard.tsx">
            <BookOpen size={24} className="text-primary" />
          </div>
          <div data-unique-id="ffec45f2-3a72-405f-af4a-503929bad0a5" data-loc="52:10-52:15" data-file-name="components/dashboard/StudentDashboard.tsx">
            <h3 className="text-xl font-semibold" data-unique-id="0f37a590-58ad-4c2e-a20c-cb0df1190cd2" data-loc="53:12-53:50" data-file-name="components/dashboard/StudentDashboard.tsx">{schedules.length}</h3>
            <p className="text-sm text-muted-foreground" data-unique-id="55f0805f-a850-4da3-b327-dc47b894803f" data-loc="54:12-54:57" data-file-name="components/dashboard/StudentDashboard.tsx">Mata Kuliah Hari Ini</p>
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
      }} className="card flex items-center space-x-4" data-unique-id="6d48c35a-aa10-41c4-8be7-19559da2d17f" data-loc="58:8-63:9" data-file-name="components/dashboard/StudentDashboard.tsx">
          <div className="bg-accent/10 p-3 rounded-lg" data-unique-id="d2c4deff-2054-4eac-a791-af00b6a814f5" data-loc="64:10-64:55" data-file-name="components/dashboard/StudentDashboard.tsx">
            <FileText size={24} className="text-accent" />
          </div>
          <div data-unique-id="a9f40d2b-8e7f-4022-859c-1a0792f1822f" data-loc="67:10-67:15" data-file-name="components/dashboard/StudentDashboard.tsx">
            <h3 className="text-xl font-semibold" data-unique-id="ffa2f116-0cd3-4911-8b22-17e7ec734001" data-loc="68:12-68:50" data-file-name="components/dashboard/StudentDashboard.tsx">5</h3>
            <p className="text-sm text-muted-foreground" data-unique-id="e2d6fc60-65f1-49bf-972c-d2b18e265c99" data-loc="69:12-69:57" data-file-name="components/dashboard/StudentDashboard.tsx">Tugas Menunggu</p>
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
      }} className="card flex items-center space-x-4" data-unique-id="7ae70dc3-ead0-4acd-a654-a3b83787da4a" data-loc="73:8-78:9" data-file-name="components/dashboard/StudentDashboard.tsx">
          <div className="bg-secondary/10 p-3 rounded-lg" data-unique-id="c2d3297c-db55-46d3-88b6-f1b8084be7f7" data-loc="79:10-79:58" data-file-name="components/dashboard/StudentDashboard.tsx">
            <Calendar size={24} className="text-secondary" data-unique-id="e447ce45-938e-4881-a266-35c875c09e16" data-loc="80:12-80:61" data-file-name="components/dashboard/StudentDashboard.tsx" />
          </div>
          <div data-unique-id="fdc4b92d-57bc-462f-b682-6e3b2538c8e4" data-loc="82:10-82:15" data-file-name="components/dashboard/StudentDashboard.tsx">
            <h3 className="text-xl font-semibold" data-unique-id="a34af75d-7e31-4364-bc5c-0ce94535c770" data-loc="83:12-83:50" data-file-name="components/dashboard/StudentDashboard.tsx">3</h3>
            <p className="text-sm text-muted-foreground" data-unique-id="5cad2338-472d-4743-bb5d-dfa8754dbd2e" data-loc="84:12-84:57" data-file-name="components/dashboard/StudentDashboard.tsx">Ujian Mendatang</p>
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-unique-id="4ae1ad1d-1ce2-4b1a-800f-91de26b84801" data-loc="89:6-89:61" data-file-name="components/dashboard/StudentDashboard.tsx">
        {/* Schedule */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }} className="card md:col-span-2" data-unique-id="ec4aebad-b67d-4c99-a0d1-0ad70c2d8455" data-loc="91:8-96:9" data-file-name="components/dashboard/StudentDashboard.tsx">
          <div className="flex justify-between items-center mb-4" data-unique-id="8881a92f-11b4-4a7f-9b74-86ca7218ada1" data-loc="97:10-97:66" data-file-name="components/dashboard/StudentDashboard.tsx">
            <h2 className="text-lg font-semibold" data-unique-id="ece564d9-a37c-4896-83d8-cb9a8cfe75ed" data-loc="98:12-98:50" data-file-name="components/dashboard/StudentDashboard.tsx">Jadwal Kuliah Hari Ini</h2>
            <span className="text-sm text-primary" data-unique-id="d38dfbb9-36da-4918-b67a-6e16ef24cc08" data-loc="99:12-99:51" data-file-name="components/dashboard/StudentDashboard.tsx">{formattedDate}</span>
          </div>
          
          <div className="space-y-3" data-unique-id="64d55ba1-4d76-4714-bc6c-7be25aaaecd3" data-loc="102:10-102:37" data-file-name="components/dashboard/StudentDashboard.tsx">
            {isLoadingSchedules ? <div className="flex justify-center py-8" data-unique-id="dc9b2cfe-770f-495f-8544-43115ff7705c" data-loc="104:14-104:56" data-file-name="components/dashboard/StudentDashboard.tsx">
                <Loader2 size={24} className="animate-spin text-primary" />
              </div> : schedules.length > 0 ? schedules.map((schedule, index) => {
            const scheduleData = JSON.parse(schedule.schedule);
            return <div key={index} className="flex items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors" data-unique-id="map_5da6e847-bc28-4780-ae48-48fc3bd69aa6" data-loc="111:18-111:125" data-file-name="components/dashboard/StudentDashboard.tsx" data-is-mapped="true">
                    <div className="mr-4 bg-card p-2 rounded-lg border border-border" data-unique-id="map_6f4c5aef-ee75-4d82-9dd0-bf970deab217" data-loc="112:20-112:86" data-file-name="components/dashboard/StudentDashboard.tsx" data-is-mapped="true">
                      <Clock size={20} className="text-primary" />
                    </div>
                    <div className="flex-grow" data-unique-id="map_cb8af7c7-263d-4506-aa0b-556b5129b6d4" data-loc="115:20-115:47" data-file-name="components/dashboard/StudentDashboard.tsx" data-is-mapped="true">
                      <p className="font-medium" data-unique-id="map_6a7a3e61-c407-46d8-8065-6f26f68ae47d" data-loc="116:22-116:49" data-file-name="components/dashboard/StudentDashboard.tsx" data-is-mapped="true">{schedule.courseName} ({schedule.courseCode})</p>
                      <p className="text-sm text-muted-foreground" data-unique-id="map_6a4b21cb-3344-4405-ab7d-809eaaac3e70" data-loc="117:22-117:67" data-file-name="components/dashboard/StudentDashboard.tsx" data-is-mapped="true">
                        {scheduleData.room} • {schedule.teacherName}
                      </p>
                    </div>
                    <div className="text-sm font-medium" data-unique-id="map_01a52bfe-846b-4ceb-b4da-e77125706d85" data-loc="121:20-121:57" data-file-name="components/dashboard/StudentDashboard.tsx" data-is-mapped="true">{scheduleData.time}</div>
                  </div>;
          }) : <div className="text-center py-8 text-muted-foreground" data-unique-id="69560eb4-0b28-4cc8-b46d-c805028ffd1c" data-loc="126:14-126:70" data-file-name="components/dashboard/StudentDashboard.tsx">
                Tidak ada jadwal kuliah untuk hari ini
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
      }} className="card" data-unique-id="fd5ffbc7-951d-46bf-a1c6-b3e9a33f2aeb" data-loc="134:8-139:9" data-file-name="components/dashboard/StudentDashboard.tsx">
          <div className="flex justify-between items-center mb-4" data-unique-id="b8ee0988-2c63-4f2d-8976-5b3e7792f86b" data-loc="140:10-140:66" data-file-name="components/dashboard/StudentDashboard.tsx">
            <h2 className="text-lg font-semibold" data-unique-id="79a4572a-78a4-4b5e-b8bc-ad9573df518a" data-loc="141:12-141:50" data-file-name="components/dashboard/StudentDashboard.tsx">Pengumuman</h2>
            <span className="text-xs text-primary cursor-pointer" data-unique-id="b5b8d340-6b40-44d1-9d7b-146b333e06a8" data-loc="142:12-142:66" data-file-name="components/dashboard/StudentDashboard.tsx">Lihat Semua</span>
          </div>
          
          <div className="space-y-3" data-unique-id="5755f6e9-775d-4559-bdf3-2a928adb01f7" data-loc="145:10-145:37" data-file-name="components/dashboard/StudentDashboard.tsx">
            {isLoadingAnnouncements ? <div className="flex justify-center py-8" data-unique-id="76018fa8-6aca-4d93-b2f3-635019fffff0" data-loc="147:14-147:56" data-file-name="components/dashboard/StudentDashboard.tsx">
                <Loader2 size={24} className="animate-spin text-primary" />
              </div> : announcements.length > 0 ? announcements.map((announcement, index) => <div key={index} className="flex items-center justify-between p-3 border-b border-border last:border-0" data-unique-id="map_1a037052-9be5-42ce-a548-6468b18ab4fc" data-loc="152:16-152:120" data-file-name="components/dashboard/StudentDashboard.tsx" data-is-mapped="true">
                  <div data-unique-id="map_74466911-ebc9-4545-902c-710f40fd40f9" data-loc="153:18-153:23" data-file-name="components/dashboard/StudentDashboard.tsx" data-is-mapped="true">
                    <p className="font-medium" data-unique-id="map_992be647-bf40-4e76-9fad-a00939b69b68" data-loc="154:20-154:47" data-file-name="components/dashboard/StudentDashboard.tsx" data-is-mapped="true">{announcement.title}</p>
                    <p className="text-xs text-muted-foreground" data-unique-id="map_29f01ec4-1e62-431f-be42-7622f2550968" data-loc="155:20-155:65" data-file-name="components/dashboard/StudentDashboard.tsx" data-is-mapped="true">
                      {new Date(announcement.publishDate).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>) : <div className="text-center py-8 text-muted-foreground" data-unique-id="34802d73-82e5-430e-b1d9-86a0e474dacd" data-loc="167:14-167:70" data-file-name="components/dashboard/StudentDashboard.tsx">
                Tidak ada pengumuman terbaru
              </div>}
          </div>
        </motion.div>
      </div>
    </>;
}