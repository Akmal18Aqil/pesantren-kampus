'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, User, Lock, CheckCircle, AlertCircle, Loader2, Info } from 'lucide-react';
export default function DemoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isCheckingData, setIsCheckingData] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [demoAccounts, setDemoAccounts] = useState<Array<{
    role: string;
    username: string;
    password: string;
  }>>([]);
  const [selectedAccount, setSelectedAccount] = useState<{
    role: string;
    username: string;
    password: string;
  } | null>(null);
  const router = useRouter();

  // Cek apakah data demo sudah ada saat halaman dimuat
  useEffect(() => {
    const checkDemoData = async () => {
      try {
        const response = await fetch('/api/seed');
        const data = await response.json();
        if (response.ok && data.demoAccounts?.length > 0) {
          setDemoAccounts(data.demoAccounts);
          setMessage(data.message || "Data demo tersedia. Silakan pilih akun untuk login.");
        }
      } catch (err) {
        console.error("Error checking demo data:", err);
      } finally {
        setIsCheckingData(false);
      }
    };
    checkDemoData();
  }, []);
  const createDemoData = async () => {
    setIsSeeding(true);
    setMessage('');
    setError('');
    try {
      const response = await fetch('/api/seed');
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Data demo berhasil dibuat");
        setDemoAccounts(data.demoAccounts || []);
      } else {
        setError(data.error || 'Terjadi kesalahan saat membuat data demo');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat menghubungi server');
      console.error(err);
    } finally {
      setIsSeeding(false);
    }
  };
  const handleLogin = async (account: {
    role: string;
    username: string;
    password: string;
  }) => {
    setSelectedAccount(account);
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: account.username,
          password: account.password
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login gagal');
      }

      // Store session in localStorage
      localStorage.setItem('session', JSON.stringify(data.session));
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat login');
      setSelectedAccount(null);
    } finally {
      setIsLoading(false);
    }
  };
  const roleDescriptions = {
    admin: "Akses penuh ke semua fitur sistem, termasuk manajemen pengguna dan pengaturan sistem.",
    teacher: "Akses untuk mengelola kelas, tugas, ujian, dan nilai mahasiswa.",
    student: "Akses untuk melihat jadwal, tugas, nilai, dan informasi akademik."
  };
  return <div className="min-h-screen flex flex-col" data-unique-id="204f60a4-4e40-419b-ab99-b35889a9dc38" data-loc="103:9-103:53" data-file-name="app/demo/page.tsx">
      {/* Header with institution name */}
      <header className="bg-primary text-white py-4 px-6 shadow-md" data-unique-id="5e629670-220e-4246-9989-d84e15c9bb24" data-loc="105:6-105:68" data-file-name="app/demo/page.tsx">
        <div className="container mx-auto flex justify-between items-center" data-unique-id="e0d27f03-29e9-42f2-accd-7c7384daed09" data-loc="106:8-106:77" data-file-name="app/demo/page.tsx">
          <div className="flex items-center space-x-2" data-unique-id="d937ab82-39f4-4339-9ff9-c488e23606ef" data-loc="107:10-107:55" data-file-name="app/demo/page.tsx">
            <BookOpen size={28} />
            <h1 className="text-xl font-bold" data-unique-id="668e9bf0-d470-4ed5-8744-e07c19a111d7" data-loc="109:12-109:46" data-file-name="app/demo/page.tsx">SIAKAD Pesantren Modern</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6" data-unique-id="5c3a6b83-2f6b-4d66-b63b-6bbe2a13aacf" data-loc="114:6-114:71" data-file-name="app/demo/page.tsx">
        <div className="w-full max-w-2xl" data-unique-id="6f5cc714-3300-4972-8f47-8458c7ce137a" data-loc="115:8-115:42" data-file-name="app/demo/page.tsx">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} className="card" data-unique-id="4e3aaf4e-d437-4836-acf7-3f000e3c8b66" data-loc="116:10-124:28" data-file-name="app/demo/page.tsx">
            <div className="text-center mb-6" data-unique-id="7a1bcf42-086b-49f5-abc0-28c0cccb7115" data-loc="125:12-125:46" data-file-name="app/demo/page.tsx">
              <div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4" data-unique-id="625d1d86-31e9-4740-8fbe-8337151c90e1" data-loc="126:14-126:118" data-file-name="app/demo/page.tsx">
                <BookOpen size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-primary" data-unique-id="5cdaac81-4afb-4380-a752-5d1a3db93ede" data-loc="129:14-129:62" data-file-name="app/demo/page.tsx">Akun Demo SIAKAD</h2>
              <p className="text-muted-foreground mt-1" data-unique-id="e9a6d0f7-3d53-4f04-97f7-cfb06f1c0331" data-loc="130:14-130:56" data-file-name="app/demo/page.tsx">
                Gunakan akun demo untuk mencoba fitur SIAKAD Pesantren
              </p>
            </div>

            {error && <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 flex items-start space-x-2" data-unique-id="dde41cc0-5696-4439-b15c-6094ece1ec89" data-loc="135:22-139:107" data-file-name="app/demo/page.tsx">
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                <span className="text-sm" data-unique-id="b6eb841a-373b-4482-97f1-290f5da69b21" data-loc="141:16-141:42" data-file-name="app/demo/page.tsx">{error}</span>
              </motion.div>}

            {message && <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} className="bg-green-100 text-green-800 p-3 rounded-md mb-4 flex items-start space-x-2" data-unique-id="c4dffcce-22ff-4299-b1f8-1c8af1ee31ba" data-loc="144:24-148:100" data-file-name="app/demo/page.tsx">
                <CheckCircle size={18} className="mt-0.5 flex-shrink-0" />
                <span className="text-sm" data-unique-id="70d4b407-cef8-4b1d-b850-638f8932dfee" data-loc="150:16-150:42" data-file-name="app/demo/page.tsx">{message}</span>
              </motion.div>}

            {isCheckingData ? <div className="flex justify-center py-8" data-unique-id="8c8d2320-d886-41d2-9183-0e12a30ca33d" data-loc="153:30-153:72" data-file-name="app/demo/page.tsx">
                <Loader2 size={24} className="animate-spin text-primary" />
              </div> : demoAccounts.length > 0 ? <div className="space-y-4" data-unique-id="456d18e7-6fdc-4073-9ce9-97badfa987bf" data-loc="155:49-155:76" data-file-name="app/demo/page.tsx">
                <div className="bg-blue-50 p-3 rounded-md mb-4 flex items-start space-x-2" data-unique-id="bfcffcf3-3889-4d7b-b106-2dc135db3be9" data-loc="156:16-156:91" data-file-name="app/demo/page.tsx">
                  <Info size={18} className="mt-0.5 flex-shrink-0 text-blue-500" />
                  <span className="text-sm text-blue-700" data-unique-id="1e3f076f-95a4-4b08-bfbf-789799def081" data-loc="158:18-158:58" data-file-name="app/demo/page.tsx">
                    Pilih salah satu akun demo di bawah untuk masuk ke sistem. Setiap akun memiliki peran dan hak akses yang berbeda.
                  </span>
                </div>
                
                <h3 className="font-medium text-lg" data-unique-id="3b0df76c-9c8c-471c-b269-f7839eb300c3" data-loc="163:16-163:52" data-file-name="app/demo/page.tsx">Pilih Akun Demo:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-unique-id="7c2a6a77-a6d4-4e0c-8ecd-8cbd5cf6a7c1" data-loc="164:16-164:71" data-file-name="app/demo/page.tsx">
                  {demoAccounts.map((account, index) => <motion.div key={index} initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: index * 0.1
              }} className={`p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors ${selectedAccount?.username === account.username ? 'border-primary bg-primary/5' : 'border-border'}`} onClick={() => handleLogin(account)} data-unique-id="map_2060bd39-607b-4db2-8a35-30e466378cf1" data-loc="165:56-173:244" data-file-name="app/demo/page.tsx" data-is-mapped="true">
                      <div className="flex items-center space-x-3 mb-2" data-unique-id="map_3590ae21-bc24-4afc-8bd4-fa3ac8b6525f" data-loc="174:22-174:72" data-file-name="app/demo/page.tsx" data-is-mapped="true">
                        <div className={`p-2 rounded-full ${account.role === 'admin' ? 'bg-purple-100 text-purple-600' : account.role === 'teacher' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`} data-unique-id="map_6b7d2b2c-9d98-49ed-ae17-cbd2fc804841" data-loc="175:24-175:213" data-file-name="app/demo/page.tsx" data-is-mapped="true">
                          <User size={16} />
                        </div>
                        <h4 className="font-medium capitalize" data-unique-id="map_0ea99577-6a35-4289-8363-7254654a3395" data-loc="178:24-178:63" data-file-name="app/demo/page.tsx" data-is-mapped="true">{account.role}</h4>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-3" data-unique-id="map_d1192d70-743d-43d5-801f-210cddcedef7" data-loc="181:22-181:72" data-file-name="app/demo/page.tsx" data-is-mapped="true">
                        {account.role === 'admin' ? roleDescriptions.admin : account.role === 'teacher' ? roleDescriptions.teacher : roleDescriptions.student}
                      </p>
                      
                      <div className="space-y-1 text-sm" data-unique-id="map_7c4c4d1f-e681-4aa1-a069-649f3d55fd29" data-loc="185:22-185:57" data-file-name="app/demo/page.tsx" data-is-mapped="true">
                        <div className="flex items-center space-x-2" data-unique-id="map_a3066892-3d60-4cc6-869e-af23404b11a3" data-loc="186:24-186:69" data-file-name="app/demo/page.tsx" data-is-mapped="true">
                          <span className="text-muted-foreground" data-unique-id="map_45881fbd-d3f3-4987-83d7-0e9f80327382" data-loc="187:26-187:66" data-file-name="app/demo/page.tsx" data-is-mapped="true">Username:</span>
                          <span className="font-medium" data-unique-id="map_19c3e769-7561-429d-833c-734de2764399" data-loc="188:26-188:56" data-file-name="app/demo/page.tsx" data-is-mapped="true">{account.username}</span>
                        </div>
                        <div className="flex items-center space-x-2" data-unique-id="map_a589ee6d-12fe-4d3e-9f9f-f6aec2f19648" data-loc="190:24-190:69" data-file-name="app/demo/page.tsx" data-is-mapped="true">
                          <span className="text-muted-foreground" data-unique-id="map_b9756165-a019-4103-8622-497d8da06db8" data-loc="191:26-191:66" data-file-name="app/demo/page.tsx" data-is-mapped="true">Password:</span>
                          <span className="font-medium" data-unique-id="map_79fefc6d-c717-4b56-8bb0-ee245afca10e" data-loc="192:26-192:56" data-file-name="app/demo/page.tsx" data-is-mapped="true">{account.password}</span>
                        </div>
                      </div>
                      
                      {selectedAccount?.username === account.username && isLoading && <div className="mt-2 flex justify-center" data-unique-id="map_da7c1d5a-b309-4e77-8b87-0f42bbd47035" data-loc="196:86-196:128" data-file-name="app/demo/page.tsx" data-is-mapped="true">
                          <Loader2 size={18} className="animate-spin text-primary" />
                        </div>}
                    </motion.div>)}
                </div>
              </div> : <div className="flex flex-col items-center justify-center py-8" data-unique-id="2061b9d0-7b61-4bb0-bac4-9fb7283bd866" data-loc="201:23-201:87" data-file-name="app/demo/page.tsx">
                <p className="text-muted-foreground mb-4" data-unique-id="dc479f27-7945-495b-8a76-0bf87be5ad6e" data-loc="202:16-202:58" data-file-name="app/demo/page.tsx">
                  Belum ada data demo. Klik tombol di bawah untuk membuat data demo.
                </p>
                <button onClick={createDemoData} disabled={isSeeding} className="btn-primary flex items-center space-x-2" data-unique-id="bcbd74be-aaa8-49dc-a383-b456bfffd4ad" data-loc="205:16-205:122" data-file-name="app/demo/page.tsx">
                  {isSeeding ? <>
                      <Loader2 size={18} className="animate-spin" />
                      <span data-unique-id="102af463-bac5-4563-83bd-4a4a4189870f" data-loc="208:22-208:28" data-file-name="app/demo/page.tsx">Membuat Data Demo...</span>
                    </> : <span data-unique-id="4c4e4f67-24ee-4500-ba71-c679455bac70" data-loc="209:26-209:32" data-file-name="app/demo/page.tsx">Buat Data Demo</span>}
                </button>
              </div>}

            <div className="mt-6 text-center" data-unique-id="a46880d9-5802-4ae5-9272-3bcb909ce11e" data-loc="213:12-213:46" data-file-name="app/demo/page.tsx">
              <a href="/" className="text-primary hover:underline" data-unique-id="c21849a3-396c-493b-aa50-9d413b3923a7" data-loc="214:14-214:67" data-file-name="app/demo/page.tsx">
                Kembali ke Halaman Login
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    </div>;
}