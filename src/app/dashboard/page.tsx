'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Bell, User, Calendar, BookOpen as Book, GraduationCap, FileText, Clock, ChevronRight, LogOut, Loader2, Users, Settings, BarChart, BookMarked, School, Clipboard } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import TeacherDashboard from '@/components/dashboard/TeacherDashboard';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
interface UserData {
  id: number;
  name: string;
  role: string;
  email: string;
  username?: string;
  avatarUrl?: string;
}
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
export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoadingSchedules, setIsLoadingSchedules] = useState(true);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(true);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [activeMenu, setActiveMenu] = useState('dashboard');
  useEffect(() => {
    // Check authentication status
    const sessionData = localStorage.getItem('session');
    const userData = localStorage.getItem('user');
    if (!sessionData || !userData) {
      router.push('/');
      return;
    }
    try {
      const user = JSON.parse(userData);
      setUser(user);

      // Fetch schedules
      fetchSchedules(user.id, user.role);

      // Fetch announcements
      fetchAnnouncements(user.role);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/');
    }
  }, [router]);
  const fetchSchedules = async (userId: number, role: string) => {
    setIsLoadingSchedules(true);
    try {
      const dateString = currentDate.toISOString().split('T')[0];
      const response = await fetch(`/api/schedules?userId=${userId}&role=${role}&date=${dateString}`);
      if (!response.ok) {
        throw new Error('Failed to fetch schedules');
      }
      const data = await response.json();
      setSchedules(data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setIsLoadingSchedules(false);
    }
  };
  const fetchAnnouncements = async (role: string) => {
    setIsLoadingAnnouncements(true);
    try {
      // Get announcements based on user role
      const audience = role.toLowerCase();
      const response = await fetch(`/api/announcements?audience=${audience}&limit=3`);
      if (!response.ok) {
        throw new Error('Failed to fetch announcements');
      }
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setIsLoadingAnnouncements(false);
    }
  };
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST'
      });
      localStorage.removeItem('session');
      localStorage.removeItem('user');
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);

    // If navigating to a different page
    if (menu === 'user-management') {
      router.push('/dashboard/users');
    }
  };
  if (!user) {
    return <div className="flex items-center justify-center min-h-screen" data-unique-id="d7053829-6062-4a09-9425-c86366ee6a2c" data-loc="135:6-135:69" data-file-name="app/dashboard/page.tsx">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>;
  }

  // Format the current date for display
  const formattedDate = currentDate.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Render different sidebar menu items based on user role
  const renderSidebarMenuItems = () => {
    const commonMenuItems = <>
        <li data-unique-id="e9c29347-207e-4f17-aa07-a2232e2a5b41" data-loc="153:8-153:12" data-file-name="app/dashboard/page.tsx">
          <button onClick={() => setActiveMenu('dashboard')} className={`w-full flex items-center space-x-3 px-4 py-3 text-sidebar-foreground ${activeMenu === 'dashboard' ? 'bg-sidebar-accent text-sidebar-primary' : 'hover:bg-sidebar-accent/50'} rounded-lg transition-colors`} data-unique-id="510bdbbe-dfdc-4100-94fd-60ff6d542524" data-loc="154:10-157:11" data-file-name="app/dashboard/page.tsx">
            <Calendar size={18} data-unique-id="12e20068-de6c-41b6-a7a3-5f6eb5e6d9e5" data-loc="158:12-158:34" data-file-name="app/dashboard/page.tsx" />
            <span data-unique-id="d17a0b24-5d09-4e6c-9238-7fc3bc6c28d2" data-loc="159:12-159:18" data-file-name="app/dashboard/page.tsx">Dashboard</span>
          </button>
        </li>
      </>;

    // Admin-specific menu items
    if (user.role === 'admin') {
      return <>
          {commonMenuItems}
          <li data-unique-id="8ceaa4b1-3d34-4eb0-86f7-9557657a48f6" data-loc="170:10-170:14" data-file-name="app/dashboard/page.tsx">
            <button onClick={() => handleMenuClick('user-management')} className={`w-full flex items-center space-x-3 px-4 py-3 text-sidebar-foreground ${activeMenu === 'user-management' ? 'bg-sidebar-accent text-sidebar-primary' : 'hover:bg-sidebar-accent/50'} rounded-lg transition-colors`} data-unique-id="962ca750-dd34-45b2-a959-4757cbaffe70" data-loc="171:12-174:13" data-file-name="app/dashboard/page.tsx">
              <Users size={18} />
              <span data-unique-id="e87bfcbe-07ad-46bf-9fc0-5f2bff3a6bd3" data-loc="176:14-176:20" data-file-name="app/dashboard/page.tsx">User Management</span>
            </button>
          </li>
          <li data-unique-id="98913707-4c76-4044-8dcb-034894da0eda" data-loc="179:10-179:14" data-file-name="app/dashboard/page.tsx">
            <button onClick={() => setActiveMenu('academic-settings')} className={`w-full flex items-center space-x-3 px-4 py-3 text-sidebar-foreground ${activeMenu === 'academic-settings' ? 'bg-sidebar-accent text-sidebar-primary' : 'hover:bg-sidebar-accent/50'} rounded-lg transition-colors`} data-unique-id="98821f55-02ec-4792-9e04-0b299e918288" data-loc="180:12-183:13" data-file-name="app/dashboard/page.tsx">
              <Settings size={18} />
              <span data-unique-id="091e3fea-1b59-4ede-b1b8-659dcb7113b2" data-loc="185:14-185:20" data-file-name="app/dashboard/page.tsx">Pengaturan Akademik</span>
            </button>
          </li>
          <li data-unique-id="be5d9c52-40cc-4f1a-a566-69854bb9ea48" data-loc="188:10-188:14" data-file-name="app/dashboard/page.tsx">
            <button onClick={() => setActiveMenu('reports')} className={`w-full flex items-center space-x-3 px-4 py-3 text-sidebar-foreground ${activeMenu === 'reports' ? 'bg-sidebar-accent text-sidebar-primary' : 'hover:bg-sidebar-accent/50'} rounded-lg transition-colors`} data-unique-id="b3d93799-4e16-4cf1-a330-edd1bc0ae223" data-loc="189:12-192:13" data-file-name="app/dashboard/page.tsx">
              <BarChart size={18} />
              <span data-unique-id="89a6898c-207f-4f31-a528-c636fad4cb28" data-loc="194:14-194:20" data-file-name="app/dashboard/page.tsx">Laporan & Statistik</span>
            </button>
          </li>
        </>;
    }

    // Teacher-specific menu items
    else if (user.role === 'teacher') {
      return <>
          {commonMenuItems}
          <li data-unique-id="c2789afa-e54e-4874-a04b-8ace5703188b" data-loc="206:10-206:14" data-file-name="app/dashboard/page.tsx">
            <button onClick={() => setActiveMenu('courses')} className={`w-full flex items-center space-x-3 px-4 py-3 text-sidebar-foreground ${activeMenu === 'courses' ? 'bg-sidebar-accent text-sidebar-primary' : 'hover:bg-sidebar-accent/50'} rounded-lg transition-colors`} data-unique-id="85669239-26e0-4e7b-830b-a19fd0e30e92" data-loc="207:12-210:13" data-file-name="app/dashboard/page.tsx">
              <BookMarked size={18} />
              <span data-unique-id="b4fcb894-c239-4105-97ca-04ee5fc75524" data-loc="212:14-212:20" data-file-name="app/dashboard/page.tsx">Mata Kuliah</span>
            </button>
          </li>
          <li data-unique-id="26e818fa-7f0a-419f-a5ef-c9924893afa5" data-loc="215:10-215:14" data-file-name="app/dashboard/page.tsx">
            <button onClick={() => setActiveMenu('grades')} className={`w-full flex items-center space-x-3 px-4 py-3 text-sidebar-foreground ${activeMenu === 'grades' ? 'bg-sidebar-accent text-sidebar-primary' : 'hover:bg-sidebar-accent/50'} rounded-lg transition-colors`} data-unique-id="1dcd5629-feb6-419a-9c87-af845768d990" data-loc="216:12-219:13" data-file-name="app/dashboard/page.tsx">
              <GraduationCap size={18} />
              <span data-unique-id="e326333e-8c6f-4eda-ae9b-31acf87110cf" data-loc="221:14-221:20" data-file-name="app/dashboard/page.tsx">Nilai & Absensi</span>
            </button>
          </li>
          <li data-unique-id="c414e1e3-0b3b-4009-affd-f0f7234c72fb" data-loc="224:10-224:14" data-file-name="app/dashboard/page.tsx">
            <button onClick={() => setActiveMenu('assignments')} className={`w-full flex items-center space-x-3 px-4 py-3 text-sidebar-foreground ${activeMenu === 'assignments' ? 'bg-sidebar-accent text-sidebar-primary' : 'hover:bg-sidebar-accent/50'} rounded-lg transition-colors`} data-unique-id="f012779f-86c5-498a-b113-a38b2100117b" data-loc="225:12-228:13" data-file-name="app/dashboard/page.tsx">
              <FileText size={18} />
              <span data-unique-id="32e9884c-16a7-43e9-992a-ef1f2cfaa659" data-loc="230:14-230:20" data-file-name="app/dashboard/page.tsx">Tugas & Ujian</span>
            </button>
          </li>
        </>;
    }

    // Student-specific menu items
    else {
      return <>
          {commonMenuItems}
          <li data-unique-id="ae8860a6-0412-41bb-b96c-bea08667c777" data-loc="242:10-242:14" data-file-name="app/dashboard/page.tsx">
            <button onClick={() => setActiveMenu('academic')} className={`w-full flex items-center space-x-3 px-4 py-3 text-sidebar-foreground ${activeMenu === 'academic' ? 'bg-sidebar-accent text-sidebar-primary' : 'hover:bg-sidebar-accent/50'} rounded-lg transition-colors`} data-unique-id="7e5a00a3-0d0e-4e09-86bb-8914db9c418b" data-loc="243:12-246:13" data-file-name="app/dashboard/page.tsx">
              <Book size={18} />
              <span data-unique-id="6b8d40d9-f730-41ed-bace-3ccaaf4387f5" data-loc="248:14-248:20" data-file-name="app/dashboard/page.tsx">Akademik</span>
            </button>
          </li>
          <li data-unique-id="fd10453a-97b9-4a82-9a2d-443b7dbbe6ce" data-loc="251:10-251:14" data-file-name="app/dashboard/page.tsx">
            <button onClick={() => setActiveMenu('grades')} className={`w-full flex items-center space-x-3 px-4 py-3 text-sidebar-foreground ${activeMenu === 'grades' ? 'bg-sidebar-accent text-sidebar-primary' : 'hover:bg-sidebar-accent/50'} rounded-lg transition-colors`} data-unique-id="ab696f1b-52f3-4fa0-a78e-68c8ceff2b59" data-loc="252:12-255:13" data-file-name="app/dashboard/page.tsx">
              <GraduationCap size={18} />
              <span data-unique-id="646cbcd4-9bca-44ed-b6b6-ecde4c4bbd14" data-loc="257:14-257:20" data-file-name="app/dashboard/page.tsx">Nilai & Absensi</span>
            </button>
          </li>
          <li data-unique-id="26832904-bb80-4c52-8cb7-9bf00a837167" data-loc="260:10-260:14" data-file-name="app/dashboard/page.tsx">
            <button onClick={() => setActiveMenu('assignments')} className={`w-full flex items-center space-x-3 px-4 py-3 text-sidebar-foreground ${activeMenu === 'assignments' ? 'bg-sidebar-accent text-sidebar-primary' : 'hover:bg-sidebar-accent/50'} rounded-lg transition-colors`} data-unique-id="44fff328-5300-4bd9-adcb-e170f9aaf9e9" data-loc="261:12-264:13" data-file-name="app/dashboard/page.tsx">
              <FileText size={18} />
              <span data-unique-id="6ce1c9ff-5dd8-47aa-a6d5-ca2050f8f922" data-loc="266:14-266:20" data-file-name="app/dashboard/page.tsx">Tugas & Ujian</span>
            </button>
          </li>
        </>;
    }
  };

  // Render dashboard content based on user role
  const renderDashboardContent = () => {
    if (activeMenu !== 'dashboard') {
      return <div className="flex items-center justify-center h-64" data-unique-id="4637d832-025c-4122-a56e-4488d7ea0345" data-loc="278:8-278:63" data-file-name="app/dashboard/page.tsx">
          <p className="text-lg text-muted-foreground" data-unique-id="1e72063d-76d3-4143-b9f7-c76cae7244ad" data-loc="279:10-279:55" data-file-name="app/dashboard/page.tsx">Menu {activeMenu} akan segera tersedia</p>
        </div>;
    }
    if (user.role === 'admin') {
      return <AdminDashboard announcements={announcements} isLoadingAnnouncements={isLoadingAnnouncements} formattedDate={formattedDate} />;
    } else if (user.role === 'teacher') {
      return <TeacherDashboard schedules={schedules} announcements={announcements} isLoadingSchedules={isLoadingSchedules} isLoadingAnnouncements={isLoadingAnnouncements} formattedDate={formattedDate} />;
    } else {
      return <StudentDashboard schedules={schedules} announcements={announcements} isLoadingSchedules={isLoadingSchedules} isLoadingAnnouncements={isLoadingAnnouncements} formattedDate={formattedDate} />;
    }
  };
  return <div className="min-h-screen flex flex-col" data-unique-id="2a9d1a03-01ef-4eb6-8872-ac77b35b2f86" data-loc="316:4-316:48" data-file-name="app/dashboard/page.tsx">
      {/* Header */}
      <header className="bg-primary text-white py-3 px-6 shadow-md sticky top-0 z-10" data-unique-id="a64beb33-424a-42f6-a8c6-c6d897d2d9c6" data-loc="318:6-318:86" data-file-name="app/dashboard/page.tsx">
        <div className="container mx-auto flex justify-between items-center" data-unique-id="0d250c01-aeca-41d7-82c7-c13ecb596137" data-loc="319:8-319:77" data-file-name="app/dashboard/page.tsx">
          <div className="flex items-center space-x-2" data-unique-id="43295292-b5b3-4b8b-9bf9-4e9844dd2224" data-loc="320:10-320:55" data-file-name="app/dashboard/page.tsx">
            <BookOpen size={24} />
            <h1 className="text-xl font-bold" data-unique-id="91f8cdb0-e993-4337-85bf-a035d4ae72d0" data-loc="322:12-322:46" data-file-name="app/dashboard/page.tsx">SIAKAD Pesantren</h1>
          </div>
          
          <div className="flex items-center space-x-4" data-unique-id="2c17a57a-5f25-4cfd-abd2-45835bff7928" data-loc="325:10-325:55" data-file-name="app/dashboard/page.tsx">
            <button className="relative" data-unique-id="22121521-50ab-4753-b842-a92dbe7b3933" data-loc="326:12-326:41" data-file-name="app/dashboard/page.tsx">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-destructive text-white rounded-full w-4 h-4 flex items-center justify-center text-xs" data-unique-id="c3416716-135c-45bc-9828-9cc63b677b7f" data-loc="328:14-328:145" data-file-name="app/dashboard/page.tsx">
                {announcements.length}
              </span>
            </button>
            
            <div className="flex items-center space-x-2" data-unique-id="4554c9fe-1c6c-4374-977d-993759de550c" data-loc="333:12-333:57" data-file-name="app/dashboard/page.tsx">
              <div className="bg-white/20 rounded-full p-1" data-unique-id="43489ab2-c567-4c96-9f8e-7d33397a0be3" data-loc="334:14-334:60" data-file-name="app/dashboard/page.tsx">
                <User size={20} />
              </div>
              <span data-unique-id="1c56b146-a035-4da6-8e0b-7fd434c9943b" data-loc="337:14-337:20" data-file-name="app/dashboard/page.tsx">{user.name}</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-grow" data-unique-id="6668b689-ea40-400b-9df3-b5b8b93e3daa" data-loc="343:6-343:38" data-file-name="app/dashboard/page.tsx">
        {/* Sidebar */}
        <aside className="w-64 bg-sidebar-background border-r border-sidebar-border shadow-sm" data-unique-id="9cde82c0-e709-469d-ab7b-951360066b61" data-loc="345:8-345:95" data-file-name="app/dashboard/page.tsx">
          <div className="p-4" data-unique-id="058abdbc-4956-4ae5-b832-53f018eff134" data-loc="346:10-346:31" data-file-name="app/dashboard/page.tsx">
            <div className="flex items-center space-x-2 px-4 py-3 bg-sidebar-accent rounded-lg" data-unique-id="88be9b05-e942-49bd-866a-c5b1264222c9" data-loc="347:12-347:96" data-file-name="app/dashboard/page.tsx">
              <div className="bg-primary rounded-full p-2" data-unique-id="44c4fd7b-dde2-444b-9ec7-ee4dc7643b94" data-loc="348:14-348:59" data-file-name="app/dashboard/page.tsx">
                <User size={18} className="text-white" />
              </div>
              <div data-unique-id="af401258-7e05-40a7-86b9-1d3dc4523a1d" data-loc="351:14-351:19" data-file-name="app/dashboard/page.tsx">
                <p className="font-medium" data-unique-id="bb157f7f-d89b-4999-8954-4f0fb1b793d8" data-loc="352:16-352:43" data-file-name="app/dashboard/page.tsx">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize" data-unique-id="3e0a216c-655d-49d6-a999-d3555c8390d7" data-loc="353:16-353:72" data-file-name="app/dashboard/page.tsx">{user.role}</p>
              </div>
            </div>
          </div>
          
          <nav className="px-4 py-2" data-unique-id="4fdbe181-57b0-4cdc-a534-15f0f78260a8" data-loc="358:10-358:37" data-file-name="app/dashboard/page.tsx">
            <ul className="space-y-1" data-unique-id="74c90e1e-7a45-4fdd-bd24-4473275fc79e" data-loc="359:12-359:38" data-file-name="app/dashboard/page.tsx">
              {renderSidebarMenuItems()}
              <li data-unique-id="c936d23c-6dac-45d3-ad9c-8f7b584164b4" data-loc="361:14-361:18" data-file-name="app/dashboard/page.tsx">
                <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors mt-8" data-unique-id="40ab8112-d0de-4da0-808f-777d8a551b5e" data-loc="362:16-365:17" data-file-name="app/dashboard/page.tsx">
                  <LogOut size={18} />
                  <span data-unique-id="d5d311ca-b9c8-4d4e-a0b7-0605cf6fa40d" data-loc="367:18-367:24" data-file-name="app/dashboard/page.tsx">Keluar</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-grow p-6" data-unique-id="81c6a949-5e4b-4391-8086-1f662968af9e" data-loc="375:8-375:40" data-file-name="app/dashboard/page.tsx">
          <div className="container mx-auto" data-unique-id="de4d82eb-bac5-42a2-a773-afd75b683888" data-loc="376:10-376:45" data-file-name="app/dashboard/page.tsx">
            <div className="flex items-center justify-between mb-6" data-unique-id="ac9ca4e9-5d72-437c-bd11-42a5808d11c6" data-loc="377:12-377:68" data-file-name="app/dashboard/page.tsx">
              <h1 className="text-2xl font-bold capitalize" data-unique-id="56ca59a4-67b9-49b0-a5a8-2bff4fea8208" data-loc="378:14-378:60" data-file-name="app/dashboard/page.tsx">
                {activeMenu === 'dashboard' ? 'Dashboard' : activeMenu.replace('-', ' ')}
              </h1>
              <div className="text-sm text-muted-foreground" data-unique-id="084e25b2-c334-461e-83f6-39b2cc869ee2" data-loc="381:14-381:61" data-file-name="app/dashboard/page.tsx">
                <span data-unique-id="b2442068-f0c9-4c67-9099-3066bf70b4ba" data-loc="382:16-382:22" data-file-name="app/dashboard/page.tsx">Semester Ganjil 2024/2025</span>
              </div>
            </div>
            
            {renderDashboardContent()}
          </div>
        </main>
      </div>
    </div>;
}