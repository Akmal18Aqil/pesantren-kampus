'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, User, Lock, AlertCircle, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
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
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen flex flex-col" data-unique-id="6376e7ba-30b8-47c8-9e32-b877a34d2ed1" data-loc="43:9-43:53" data-file-name="app/page.tsx">
      {/* Header with institution name */}
      <header className="bg-primary text-white py-4 px-6 shadow-md" data-unique-id="92441182-a628-4e8d-8bfc-51d6fab9834d" data-loc="45:6-45:68" data-file-name="app/page.tsx">
        <div className="container mx-auto flex justify-between items-center" data-unique-id="45e05bee-f384-4c2c-99db-75eeb9de6d5d" data-loc="46:8-46:77" data-file-name="app/page.tsx">
          <div className="flex items-center space-x-2" data-unique-id="373e6a74-323b-4e05-8ae6-0969a01230ee" data-loc="47:10-47:55" data-file-name="app/page.tsx">
            <BookOpen size={28} />
            <h1 className="text-xl font-bold" data-unique-id="04442770-e127-4bb7-873f-b3958c81701e" data-loc="49:12-49:46" data-file-name="app/page.tsx">SIAKAD Pesantren Modern</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6" data-unique-id="7606f326-4ef8-4661-9032-704baf79e258" data-loc="54:6-54:71" data-file-name="app/page.tsx">
        <div className="w-full max-w-md" data-unique-id="71dc0dee-5f6e-4a21-a347-0a1e68ca0f01" data-loc="55:8-55:41" data-file-name="app/page.tsx">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} className="card" data-unique-id="d5b74e11-2ca2-4e05-a059-cb606e97c270" data-loc="56:10-64:28" data-file-name="app/page.tsx">
            <div className="text-center mb-6" data-unique-id="4d4675f1-6674-4cdd-9c8d-7d2c2a15aab8" data-loc="65:12-65:46" data-file-name="app/page.tsx">
              <div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4" data-unique-id="55aa55ae-9b0f-4305-8477-8f47a01531a1" data-loc="66:14-66:118" data-file-name="app/page.tsx">
                <BookOpen size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-primary" data-unique-id="1f5f1cb1-f692-49aa-a73a-caed8db8e236" data-loc="69:14-69:62" data-file-name="app/page.tsx">Selamat Datang</h2>
              <p className="text-muted-foreground mt-1" data-unique-id="e01c5851-35a1-4d58-bc48-2bb26732fe0a" data-loc="70:14-70:56" data-file-name="app/page.tsx">
                Masuk ke Sistem Informasi Akademik
              </p>
            </div>

            {error && <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 flex items-start space-x-2" data-unique-id="9cec8e76-f17a-4a9b-84e8-96498b68cf62" data-loc="75:22-79:107" data-file-name="app/page.tsx">
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                <span className="text-sm" data-unique-id="25a8fe9f-319c-47aa-9050-972a1a7425ba" data-loc="81:16-81:42" data-file-name="app/page.tsx">{error}</span>
              </motion.div>}

            <form onSubmit={handleLogin} data-unique-id="d4d9bb4f-7e53-4ca4-87c8-eb5170788851" data-loc="84:12-84:41" data-file-name="app/page.tsx">
              <div className="space-y-4" data-unique-id="f50057f1-a6e9-4cb1-ae0a-c31925f06029" data-loc="85:14-85:41" data-file-name="app/page.tsx">
                <div data-unique-id="e645aec1-6a9d-4d55-ac3a-90f2abb13ca5" data-loc="86:16-86:21" data-file-name="app/page.tsx">
                  <label htmlFor="username" className="block text-sm font-medium mb-1" data-unique-id="84ec4f70-910d-4c89-b7c9-dc5fcf7502c8" data-loc="87:18-87:87" data-file-name="app/page.tsx">
                    Username
                  </label>
                  <div className="relative" data-unique-id="4e3d9ed0-4997-4c6a-b936-21a3b05c51ac" data-loc="90:18-90:44" data-file-name="app/page.tsx">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" data-unique-id="dfac0033-25d9-4bab-aecc-094302abd82c" data-loc="91:20-91:92" data-file-name="app/page.tsx">
                      <User size={18} />
                    </div>
                    <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} className="input-field pl-10" placeholder="Masukkan username" required data-unique-id="fcc8c425-0869-4e8a-982b-a3f3a25986a4" data-loc="94:20-94:187" data-file-name="app/page.tsx" />
                  </div>
                </div>

                <div data-unique-id="3910b838-9df3-4b79-8cf4-975ff85e515f" data-loc="98:16-98:21" data-file-name="app/page.tsx">
                  <label htmlFor="password" className="block text-sm font-medium mb-1" data-unique-id="968b3d2f-2f4d-48f8-ad07-d46fa5540a29" data-loc="99:18-99:87" data-file-name="app/page.tsx">
                    Password
                  </label>
                  <div className="relative" data-unique-id="80f27cd7-fb58-4c32-8df9-dfeab6c76311" data-loc="102:18-102:44" data-file-name="app/page.tsx">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" data-unique-id="8ad51234-65c7-4038-b363-29102b6086bd" data-loc="103:20-103:92" data-file-name="app/page.tsx">
                      <Lock size={18} />
                    </div>
                    <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-field pl-10" placeholder="Masukkan password" required data-unique-id="6e17a6e5-fa97-4be7-a983-4765f093bd2f" data-loc="106:20-106:191" data-file-name="app/page.tsx" />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full mt-6" disabled={isLoading} data-unique-id="f201a462-619e-40ff-97cf-a86f825cb14c" data-loc="111:14-111:93" data-file-name="app/page.tsx">
                {isLoading ? 'Masuk...' : 'Masuk'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground" data-unique-id="8e18eb81-444a-4d85-b521-530a3c7e4732" data-loc="116:12-116:76" data-file-name="app/page.tsx">
              <p className="mb-2" data-unique-id="42164f0c-2887-4cc6-8679-304bafb6838b" data-loc="117:14-117:34" data-file-name="app/page.tsx">© 2025 SIAKAD Pesantren Modern. Hak Cipta Dilindungi.</p>
              <a href="/demo" className="flex items-center justify-center space-x-2 text-primary hover:underline" data-unique-id="e367cd78-d73f-4897-95fd-2e89ac302f9f" data-loc="118:14-118:114" data-file-name="app/page.tsx">
                <Info size={16} />
                <span data-unique-id="187fff57-648e-4abd-9df0-80b179afe2f5" data-loc="120:16-120:22" data-file-name="app/page.tsx">Gunakan Akun Demo untuk Uji Coba</span>
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    </div>;
}