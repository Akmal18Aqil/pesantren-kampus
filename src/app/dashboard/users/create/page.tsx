'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Bell, User, Users, ArrowLeft, Loader2, Mail, Lock, Check, AlertCircle } from 'lucide-react';
interface UserData {
  id: number;
  name: string;
  role: string;
  email: string;
}
export default function CreateUserPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form fields
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  // Additional profile fields
  const [nim, setNim] = useState('');
  const [programStudy, setProgramStudy] = useState('Ilmu Komputer');
  const [entryYear, setEntryYear] = useState(new Date().getFullYear());
  const [nip, setNip] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [position, setPosition] = useState('');
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
      setCurrentUser(user);

      // Only admin can access this page
      if (user.role !== 'admin') {
        router.push('/dashboard');
        return;
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/');
    }
  }, [router]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    try {
      // Validate form
      if (!name || !username || !email || !password || !role) {
        throw new Error('Semua field wajib diisi');
      }

      // Validate additional fields based on role
      if (role === 'student' && (!nim || !programStudy || !entryYear)) {
        throw new Error('Semua field profil mahasiswa wajib diisi');
      }
      if (role === 'teacher' && (!nip || !specialization)) {
        throw new Error('Semua field profil dosen wajib diisi');
      }

      // Prepare profile data based on role
      let profileData = {};
      if (role === 'student') {
        profileData = {
          nim,
          programStudy,
          entryYear: Number(entryYear)
        };
      } else if (role === 'teacher') {
        profileData = {
          nip,
          specialization,
          position
        };
      }

      // Send request to create user
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          role,
          profileData
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Gagal membuat user');
      }
      setSuccess('User berhasil dibuat!');

      // Reset form
      setName('');
      setUsername('');
      setEmail('');
      setPassword('');
      setRole('student');
      setNim('');
      setProgramStudy('Ilmu Komputer');
      setEntryYear(new Date().getFullYear());
      setNip('');
      setSpecialization('');
      setPosition('');

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/dashboard/users');
      }, 2000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
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
  if (!currentUser || currentUser.role !== 'admin') {
    return <div className="flex items-center justify-center min-h-screen" data-unique-id="8cb7ba52-e384-4ced-939b-8599cb3d0125" data-loc="166:6-166:69" data-file-name="app/dashboard/users/create/page.tsx">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>;
  }

  // Render additional fields based on selected role
  const renderRoleSpecificFields = () => {
    if (role === 'student') {
      return <div className="space-y-4 border-t border-border pt-4 mt-4" data-unique-id="1e569359-3a7a-4f15-9243-42419eaa8b95" data-loc="176:8-176:68" data-file-name="app/dashboard/users/create/page.tsx">
          <h3 className="font-medium" data-unique-id="9dfa746c-38ef-4c76-837d-0e0f70314aeb" data-loc="177:10-177:38" data-file-name="app/dashboard/users/create/page.tsx">Informasi Mahasiswa</h3>
          
          <div data-unique-id="68b416de-0970-4d64-98c9-ba4d0ef34fca" data-loc="179:10-179:15" data-file-name="app/dashboard/users/create/page.tsx">
            <label htmlFor="nim" className="block text-sm font-medium mb-1" data-unique-id="6202e34a-c14d-4650-944b-12295e39863f" data-loc="180:12-180:76" data-file-name="app/dashboard/users/create/page.tsx">
              NIM
            </label>
            <input id="nim" type="text" value={nim} onChange={e => setNim(e.target.value)} className="input-field w-full" placeholder="Masukkan NIM" required data-unique-id="b16861f8-6f03-4717-a17c-e9eaf138d462" data-loc="183:12-191:14" data-file-name="app/dashboard/users/create/page.tsx" />
          </div>
          
          <div data-unique-id="d680a8c2-b767-4c6c-ad4d-528ce8735f10" data-loc="194:10-194:15" data-file-name="app/dashboard/users/create/page.tsx">
            <label htmlFor="programStudy" className="block text-sm font-medium mb-1" data-unique-id="97fb91ef-010e-4970-9aa0-7ce84f8ca523" data-loc="195:12-195:85" data-file-name="app/dashboard/users/create/page.tsx">
              Program Studi
            </label>
            <select id="programStudy" value={programStudy} onChange={e => setProgramStudy(e.target.value)} className="input-field w-full" required data-unique-id="343128dd-8706-4b23-b93d-0805c290a83f" data-loc="198:12-204:13" data-file-name="app/dashboard/users/create/page.tsx">
              <option value="Ilmu Komputer" data-unique-id="b1d9c20e-201e-4dc3-96f4-c5081b85b866" data-loc="205:14-205:44" data-file-name="app/dashboard/users/create/page.tsx">Ilmu Komputer</option>
              <option value="Pendidikan Agama Islam" data-unique-id="7b17ed64-1a07-46a1-bb4d-25c4695cfe1b" data-loc="206:14-206:53" data-file-name="app/dashboard/users/create/page.tsx">Pendidikan Agama Islam</option>
              <option value="Bahasa Arab" data-unique-id="b54a6971-9edd-4a3d-83d7-222389938798" data-loc="207:14-207:42" data-file-name="app/dashboard/users/create/page.tsx">Bahasa Arab</option>
              <option value="Ekonomi Syariah" data-unique-id="ea276bef-70f1-4b0f-bde2-a2a3a2b0c5f4" data-loc="208:14-208:46" data-file-name="app/dashboard/users/create/page.tsx">Ekonomi Syariah</option>
            </select>
          </div>
          
          <div data-unique-id="280513db-ec1c-4c78-b89b-df95615af902" data-loc="212:10-212:15" data-file-name="app/dashboard/users/create/page.tsx">
            <label htmlFor="entryYear" className="block text-sm font-medium mb-1" data-unique-id="228ca9d4-a8f1-41ed-ac0b-d1c0b4f2b868" data-loc="213:12-213:82" data-file-name="app/dashboard/users/create/page.tsx">
              Tahun Masuk
            </label>
            <input id="entryYear" type="number" value={entryYear} onChange={e => setEntryYear(Number(e.target.value))} className="input-field w-full" min={2000} max={new Date().getFullYear()} required data-unique-id="602fab93-7906-4fc8-8435-9d66e64c1875" data-loc="216:12-225:14" data-file-name="app/dashboard/users/create/page.tsx" />
          </div>
        </div>;
    } else if (role === 'teacher') {
      return <div className="space-y-4 border-t border-border pt-4 mt-4" data-unique-id="4aabef71-40e5-435f-8c8e-7ac399e924b3" data-loc="231:8-231:68" data-file-name="app/dashboard/users/create/page.tsx">
          <h3 className="font-medium" data-unique-id="1c5e4e5e-44f6-4ad3-9ec6-e1ed9fea03db" data-loc="232:10-232:38" data-file-name="app/dashboard/users/create/page.tsx">Informasi Dosen</h3>
          
          <div data-unique-id="d6be507b-f2a5-45d5-aa5c-93fd14c84aa3" data-loc="234:10-234:15" data-file-name="app/dashboard/users/create/page.tsx">
            <label htmlFor="nip" className="block text-sm font-medium mb-1" data-unique-id="42c2a957-6225-4ba6-a04f-9d3be578b48a" data-loc="235:12-235:76" data-file-name="app/dashboard/users/create/page.tsx">
              NIP
            </label>
            <input id="nip" type="text" value={nip} onChange={e => setNip(e.target.value)} className="input-field w-full" placeholder="Masukkan NIP" required data-unique-id="1de7c596-ff4a-4ce8-bcbf-34584944b1da" data-loc="238:12-246:14" data-file-name="app/dashboard/users/create/page.tsx" />
          </div>
          
          <div data-unique-id="0ed3dbcc-39eb-45cf-8262-2f1ea29a211b" data-loc="249:10-249:15" data-file-name="app/dashboard/users/create/page.tsx">
            <label htmlFor="specialization" className="block text-sm font-medium mb-1" data-unique-id="1e50ac46-8002-491f-a11b-ba5d2fae19d9" data-loc="250:12-250:87" data-file-name="app/dashboard/users/create/page.tsx">
              Spesialisasi
            </label>
            <input id="specialization" type="text" value={specialization} onChange={e => setSpecialization(e.target.value)} className="input-field w-full" placeholder="Masukkan bidang spesialisasi" required data-unique-id="b39161dd-35d3-4295-acd8-d88100a17100" data-loc="253:12-261:14" data-file-name="app/dashboard/users/create/page.tsx" />
          </div>
          
          <div data-unique-id="e77d8fb5-c5a0-46e6-87d5-b16ce004407d" data-loc="264:10-264:15" data-file-name="app/dashboard/users/create/page.tsx">
            <label htmlFor="position" className="block text-sm font-medium mb-1" data-unique-id="9a3a41ed-971a-45e5-8a5d-24e55a30baee" data-loc="265:12-265:81" data-file-name="app/dashboard/users/create/page.tsx">
              Jabatan
            </label>
            <input id="position" type="text" value={position} onChange={e => setPosition(e.target.value)} className="input-field w-full" placeholder="Masukkan jabatan (opsional)" data-unique-id="e25e704e-90cb-480d-a4f5-aaf1321cac41" data-loc="268:12-275:14" data-file-name="app/dashboard/users/create/page.tsx" />
          </div>
        </div>;
    }
    return null;
  };
  return <div className="min-h-screen flex flex-col" data-unique-id="176d28b9-b091-4dba-bd05-056c1c910b03" data-loc="285:4-285:48" data-file-name="app/dashboard/users/create/page.tsx">
      {/* Header */}
      <header className="bg-primary text-white py-3 px-6 shadow-md sticky top-0 z-10" data-unique-id="bc377c12-a224-43da-9612-ddff2aa12867" data-loc="287:6-287:86" data-file-name="app/dashboard/users/create/page.tsx">
        <div className="container mx-auto flex justify-between items-center" data-unique-id="19dd8b55-475f-4fcc-a2d4-46db8916b1c4" data-loc="288:8-288:77" data-file-name="app/dashboard/users/create/page.tsx">
          <div className="flex items-center space-x-2" data-unique-id="e65baf44-a569-4a3a-80ca-3a19a1aa274e" data-loc="289:10-289:55" data-file-name="app/dashboard/users/create/page.tsx">
            <BookOpen size={24} />
            <h1 className="text-xl font-bold" data-unique-id="4c31fe9c-93bd-47b5-a6a6-6cabcaf64e1d" data-loc="291:12-291:46" data-file-name="app/dashboard/users/create/page.tsx">SIAKAD Pesantren</h1>
          </div>
          
          <div className="flex items-center space-x-4" data-unique-id="c5c98730-c1cb-4562-824a-c072b680268b" data-loc="294:10-294:55" data-file-name="app/dashboard/users/create/page.tsx">
            <button className="relative" data-unique-id="2f8d64d2-a0ea-4f70-970d-971bf16768af" data-loc="295:12-295:41" data-file-name="app/dashboard/users/create/page.tsx">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-destructive text-white rounded-full w-4 h-4 flex items-center justify-center text-xs" data-unique-id="b7fcc237-5bfe-447d-8a9d-8c0bf1fa0765" data-loc="297:14-297:145" data-file-name="app/dashboard/users/create/page.tsx">
                3
              </span>
            </button>
            
            <div className="flex items-center space-x-2" data-unique-id="0d2b8da4-71b0-4d5a-8d91-242b1b804e85" data-loc="302:12-302:57" data-file-name="app/dashboard/users/create/page.tsx">
              <div className="bg-white/20 rounded-full p-1" data-unique-id="7c2215dc-f99a-40e4-a586-afbca42b9223" data-loc="303:14-303:60" data-file-name="app/dashboard/users/create/page.tsx">
                <User size={20} />
              </div>
              <span data-unique-id="8fe95f02-8217-4d60-a66e-41ad394b36b0" data-loc="306:14-306:20" data-file-name="app/dashboard/users/create/page.tsx">{currentUser.name}</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-grow" data-unique-id="06c5c386-fd4f-462b-afc0-255f0c2d3953" data-loc="312:6-312:38" data-file-name="app/dashboard/users/create/page.tsx">
        {/* Sidebar */}
        <aside className="w-64 bg-sidebar-background border-r border-sidebar-border shadow-sm" data-unique-id="6966c130-710a-4129-8d01-228db932ee47" data-loc="314:8-314:95" data-file-name="app/dashboard/users/create/page.tsx">
          <div className="p-4" data-unique-id="a66e028e-b7e1-4516-ba14-bee14d60ab22" data-loc="315:10-315:31" data-file-name="app/dashboard/users/create/page.tsx">
            <div className="flex items-center space-x-2 px-4 py-3 bg-sidebar-accent rounded-lg" data-unique-id="3b920385-b62d-4c9e-a7b8-47e92cbf4b90" data-loc="316:12-316:96" data-file-name="app/dashboard/users/create/page.tsx">
              <div className="bg-primary rounded-full p-2" data-unique-id="182df4be-a8f6-4201-abfe-552793fe9666" data-loc="317:14-317:59" data-file-name="app/dashboard/users/create/page.tsx">
                <User size={18} className="text-white" />
              </div>
              <div data-unique-id="082e3520-a3f9-44ad-91d7-9377d8b10e6b" data-loc="320:14-320:19" data-file-name="app/dashboard/users/create/page.tsx">
                <p className="font-medium" data-unique-id="586b95b4-7b7c-4023-a2ba-8fb3746d28d2" data-loc="321:16-321:43" data-file-name="app/dashboard/users/create/page.tsx">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground capitalize" data-unique-id="e2c9c7d1-2409-4dae-8205-7742417e6353" data-loc="322:16-322:72" data-file-name="app/dashboard/users/create/page.tsx">{currentUser.role}</p>
              </div>
            </div>
          </div>
          
          <nav className="px-4 py-2" data-unique-id="402979a1-206e-4514-bcaa-3f6de9fd6550" data-loc="327:10-327:37" data-file-name="app/dashboard/users/create/page.tsx">
            <ul className="space-y-1" data-unique-id="0dd938d0-4210-4d1a-858d-556b31061777" data-loc="328:12-328:38" data-file-name="app/dashboard/users/create/page.tsx">
              <li data-unique-id="05d0c3ac-61f2-4aba-9a70-56a568c88ed8" data-loc="329:14-329:18" data-file-name="app/dashboard/users/create/page.tsx">
                <button onClick={() => router.push('/dashboard')} className="w-full flex items-center space-x-3 px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-lg transition-colors" data-unique-id="90eb22fa-ff58-4de6-a935-ba9c1e3db54c" data-loc="330:16-333:17" data-file-name="app/dashboard/users/create/page.tsx">
                  <User size={18} />
                  <span data-unique-id="a7e7023c-8414-4204-9151-74732cf60f71" data-loc="335:18-335:24" data-file-name="app/dashboard/users/create/page.tsx">Dashboard</span>
                </button>
              </li>
              <li data-unique-id="06ee7407-578c-4d4a-b2d7-2dbd99a8f14d" data-loc="338:14-338:18" data-file-name="app/dashboard/users/create/page.tsx">
                <button onClick={() => router.push('/dashboard/users')} className="w-full flex items-center space-x-3 px-4 py-3 text-sidebar-primary bg-sidebar-accent rounded-lg" data-unique-id="c9110174-008a-4aae-918c-7fd3602459a4" data-loc="339:16-342:17" data-file-name="app/dashboard/users/create/page.tsx">
                  <Users size={18} />
                  <span data-unique-id="be6d3800-9f75-4736-9803-cce281662127" data-loc="344:18-344:24" data-file-name="app/dashboard/users/create/page.tsx">User Management</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-grow p-6" data-unique-id="83f1c319-b539-477a-96ef-345a9d2254a9" data-loc="352:8-352:40" data-file-name="app/dashboard/users/create/page.tsx">
          <div className="container mx-auto max-w-3xl" data-unique-id="23574a06-bd08-487b-b5bf-80e33648e2d7" data-loc="353:10-353:55" data-file-name="app/dashboard/users/create/page.tsx">
            <div className="flex items-center mb-6" data-unique-id="8f9fed92-c3c1-46e5-be0d-7f607452da82" data-loc="354:12-354:52" data-file-name="app/dashboard/users/create/page.tsx">
              <button onClick={() => router.push('/dashboard/users')} className="mr-4 p-2 rounded-full hover:bg-muted" data-unique-id="05986375-d797-4e2d-9c0c-12bc9d9cef59" data-loc="355:14-358:15" data-file-name="app/dashboard/users/create/page.tsx">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold" data-unique-id="3ab293f2-13fa-45d7-9ef9-61546cbecac1" data-loc="361:14-361:49" data-file-name="app/dashboard/users/create/page.tsx">Tambah User Baru</h1>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6" data-unique-id="c91a1c62-1af6-4bea-9725-32d79e64b362" data-loc="364:12-364:73" data-file-name="app/dashboard/users/create/page.tsx">
              {error && <motion.div initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-md flex items-start" data-unique-id="668d41c0-7815-4f4b-a1b0-e65caeec5d0b" data-loc="366:16-370:17" data-file-name="app/dashboard/users/create/page.tsx">
                  <AlertCircle size={18} className="text-destructive mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-destructive text-sm" data-unique-id="ca48f7aa-8a17-4324-a83f-e8425e24b503" data-loc="372:18-372:58" data-file-name="app/dashboard/users/create/page.tsx">{error}</p>
                </motion.div>}
              
              {success && <motion.div initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} className="mb-6 p-4 bg-green-100 border border-green-200 rounded-md flex items-start" data-unique-id="8142b192-a8d5-48e9-bcb9-a131dead6946" data-loc="377:16-381:17" data-file-name="app/dashboard/users/create/page.tsx">
                  <Check size={18} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-green-800 text-sm" data-unique-id="6cd83044-7850-4142-a89d-39b8eafaccfa" data-loc="383:18-383:56" data-file-name="app/dashboard/users/create/page.tsx">{success}</p>
                </motion.div>}
              
              <form onSubmit={handleSubmit} className="space-y-6" data-unique-id="a2940190-bca8-4e58-9cde-3b9b8ba51bba" data-loc="387:14-387:66" data-file-name="app/dashboard/users/create/page.tsx">
                <div className="space-y-4" data-unique-id="9f4ba0f2-7295-4146-94b1-8ac0c071b99b" data-loc="388:16-388:43" data-file-name="app/dashboard/users/create/page.tsx">
                  <h3 className="font-medium" data-unique-id="f6e8cca1-b1b1-4c4b-982a-91c52fb997bb" data-loc="389:18-389:46" data-file-name="app/dashboard/users/create/page.tsx">Informasi Dasar</h3>
                  
                  <div data-unique-id="edfc4ab3-6c9d-43f5-8118-6ed89fee0e00" data-loc="391:18-391:23" data-file-name="app/dashboard/users/create/page.tsx">
                    <label htmlFor="name" className="block text-sm font-medium mb-1" data-unique-id="eccd8305-ceac-4354-9308-05ec113f24c4" data-loc="392:20-392:85" data-file-name="app/dashboard/users/create/page.tsx">
                      Nama Lengkap
                    </label>
                    <div className="relative" data-unique-id="9d7bf522-e50f-4491-9fb1-b42a989289b2" data-loc="395:20-395:46" data-file-name="app/dashboard/users/create/page.tsx">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" data-unique-id="ac416980-d8ee-45ca-b04c-473082422734" data-loc="396:22-396:94" data-file-name="app/dashboard/users/create/page.tsx">
                        <User size={18} />
                      </div>
                      <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className="input-field pl-10 w-full" placeholder="Masukkan nama lengkap" required data-unique-id="24318cb9-82dd-45a9-a88a-d77ce416929e" data-loc="399:22-407:24" data-file-name="app/dashboard/users/create/page.tsx" />
                    </div>
                  </div>
                  
                  <div data-unique-id="a7724ee9-1cdd-4ecc-9b81-e896b04c69ff" data-loc="411:18-411:23" data-file-name="app/dashboard/users/create/page.tsx">
                    <label htmlFor="username" className="block text-sm font-medium mb-1" data-unique-id="04a22922-ff12-48c2-8b50-e3c8a4276924" data-loc="412:20-412:89" data-file-name="app/dashboard/users/create/page.tsx">
                      Username
                    </label>
                    <div className="relative" data-unique-id="b2ba96e5-620b-40da-97d6-359fbbd002fe" data-loc="415:20-415:46" data-file-name="app/dashboard/users/create/page.tsx">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" data-unique-id="8ec5cc35-767d-49fc-a83d-60fe6d634c8e" data-loc="416:22-416:94" data-file-name="app/dashboard/users/create/page.tsx">
                        <User size={18} />
                      </div>
                      <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} className="input-field pl-10 w-full" placeholder="Masukkan username" required data-unique-id="416f1312-2beb-4f4c-b5df-58ad0a0559b7" data-loc="419:22-427:24" data-file-name="app/dashboard/users/create/page.tsx" />
                    </div>
                  </div>
                  
                  <div data-unique-id="d2d1eba6-1ccd-4009-a4b4-d3c38833a4ad" data-loc="431:18-431:23" data-file-name="app/dashboard/users/create/page.tsx">
                    <label htmlFor="email" className="block text-sm font-medium mb-1" data-unique-id="6edabe58-493d-4e45-8477-e55279408207" data-loc="432:20-432:86" data-file-name="app/dashboard/users/create/page.tsx">
                      Email
                    </label>
                    <div className="relative" data-unique-id="32d58b63-53eb-4157-b8f4-fe25f15008ec" data-loc="435:20-435:46" data-file-name="app/dashboard/users/create/page.tsx">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" data-unique-id="1789c6ba-23fb-455c-8ccd-075478aa33b0" data-loc="436:22-436:94" data-file-name="app/dashboard/users/create/page.tsx">
                        <Mail size={18} />
                      </div>
                      <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field pl-10 w-full" placeholder="Masukkan email" required data-unique-id="f695a3d2-6ecf-429e-bdfa-f2afe46b6bfe" data-loc="439:22-447:24" data-file-name="app/dashboard/users/create/page.tsx" />
                    </div>
                  </div>
                  
                  <div data-unique-id="257d75e7-3597-489c-9ddc-24ebae6aa87d" data-loc="451:18-451:23" data-file-name="app/dashboard/users/create/page.tsx">
                    <label htmlFor="password" className="block text-sm font-medium mb-1" data-unique-id="db19a68a-9d9e-4a34-9ca4-61c3344b359e" data-loc="452:20-452:89" data-file-name="app/dashboard/users/create/page.tsx">
                      Password
                    </label>
                    <div className="relative" data-unique-id="a57d93ce-9998-42f0-99ec-c5010eee566e" data-loc="455:20-455:46" data-file-name="app/dashboard/users/create/page.tsx">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" data-unique-id="1b601838-a4e5-43e5-a3d5-a5b0f9e7adf7" data-loc="456:22-456:94" data-file-name="app/dashboard/users/create/page.tsx">
                        <Lock size={18} />
                      </div>
                      <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-field pl-10 w-full" placeholder="Masukkan password" required data-unique-id="dd8daa84-86ba-4eb6-a9ef-ba6e67c83efc" data-loc="459:22-467:24" data-file-name="app/dashboard/users/create/page.tsx" />
                    </div>
                  </div>
                  
                  <div data-unique-id="ceecdf60-3a67-4a5e-ab39-2849480bb67c" data-loc="471:18-471:23" data-file-name="app/dashboard/users/create/page.tsx">
                    <label htmlFor="role" className="block text-sm font-medium mb-1" data-unique-id="d8da11bc-e562-40e3-8417-da27c62c9168" data-loc="472:20-472:85" data-file-name="app/dashboard/users/create/page.tsx">
                      Role
                    </label>
                    <select id="role" value={role} onChange={e => setRole(e.target.value)} className="input-field w-full" required data-unique-id="8f3a1365-d24b-4682-8c99-aa7105692597" data-loc="475:20-481:21" data-file-name="app/dashboard/users/create/page.tsx">
                      <option value="student" data-unique-id="4d23b418-95f0-436a-a27f-ec0992f183ac" data-loc="482:22-482:46" data-file-name="app/dashboard/users/create/page.tsx">Mahasiswa</option>
                      <option value="teacher" data-unique-id="7782f39c-fd40-4a1f-b9a2-9207e3cd5796" data-loc="483:22-483:46" data-file-name="app/dashboard/users/create/page.tsx">Dosen</option>
                      <option value="admin" data-unique-id="477f6d35-9893-457f-88ca-f846e7785b05" data-loc="484:22-484:44" data-file-name="app/dashboard/users/create/page.tsx">Admin</option>
                    </select>
                  </div>
                </div>
                
                {renderRoleSpecificFields()}
                
                <div className="pt-4 flex justify-end space-x-3" data-unique-id="cf7c005f-5e23-42a3-8612-6008268c0fbb" data-loc="491:16-491:65" data-file-name="app/dashboard/users/create/page.tsx">
                  <button type="button" onClick={() => router.push('/dashboard/users')} className="px-4 py-2 border border-border rounded-md" data-unique-id="75ffcbce-97a0-4c4e-8df9-5e9127623330" data-loc="492:18-496:19" data-file-name="app/dashboard/users/create/page.tsx">
                    Batal
                  </button>
                  <button type="submit" disabled={isSubmitting} className="btn-primary" data-unique-id="4bcfc6d9-e0cd-495e-b8f4-8bcab4d18dc3" data-loc="499:18-503:19" data-file-name="app/dashboard/users/create/page.tsx">
                    {isSubmitting ? <div className="flex items-center" data-unique-id="40c54d08-abcf-401b-b0d9-ac2ddfbc5cab" data-loc="505:22-505:57" data-file-name="app/dashboard/users/create/page.tsx">
                        <Loader2 size={18} className="animate-spin mr-2" />
                        <span data-unique-id="dd7f52ec-5742-4c3f-88af-d3ca3d586ad0" data-loc="507:24-507:30" data-file-name="app/dashboard/users/create/page.tsx">Menyimpan...</span>
                      </div> : <span data-unique-id="8df18cfe-c416-4062-8e79-cad5d18708bf" data-loc="510:22-510:28" data-file-name="app/dashboard/users/create/page.tsx">Simpan</span>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>;
}