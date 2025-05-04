'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, User, Mail, Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
export default function CreateAdminPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch('/api/admin/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create admin user');
      }
      setSuccess('Admin user created successfully! Redirecting to login page...');

      // Clear form
      setName('');
      setUsername('');
      setEmail('');
      setPassword('');

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen flex flex-col" data-unique-id="6be1bc46-0e4f-43d0-b695-26517a28ee0f" data-loc="56:9-56:53" data-file-name="app/admin/create/page.tsx">
      {/* Header */}
      <header className="bg-primary text-white py-4 px-6 shadow-md" data-unique-id="ef268993-f1f5-49c4-9981-af0182244e4d" data-loc="58:6-58:68" data-file-name="app/admin/create/page.tsx">
        <div className="container mx-auto flex justify-between items-center" data-unique-id="fbeadb95-85c0-469a-afb6-274f79e295f6" data-loc="59:8-59:77" data-file-name="app/admin/create/page.tsx">
          <div className="flex items-center space-x-2" data-unique-id="79f3ce7b-13bc-4e8f-9a74-37e3f64837c7" data-loc="60:10-60:55" data-file-name="app/admin/create/page.tsx">
            <BookOpen size={28} />
            <h1 className="text-xl font-bold" data-unique-id="aac5eba1-20fb-4ded-af7c-0e2ebe0233fe" data-loc="62:12-62:46" data-file-name="app/admin/create/page.tsx">SIAKAD Pesantren Modern</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6" data-unique-id="f650a534-6b3b-4bd3-b2ae-3c13daf2707d" data-loc="67:6-67:71" data-file-name="app/admin/create/page.tsx">
        <div className="w-full max-w-md" data-unique-id="8071959c-7265-4cfa-81bf-ab25e4ecd403" data-loc="68:8-68:41" data-file-name="app/admin/create/page.tsx">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} className="card" data-unique-id="2fe9bb66-9301-4bad-9bef-5769e9bb1686" data-loc="69:10-77:28" data-file-name="app/admin/create/page.tsx">
            <div className="text-center mb-6" data-unique-id="d599c098-18e5-4655-9089-6e60326d7b53" data-loc="78:12-78:46" data-file-name="app/admin/create/page.tsx">
              <div className="bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4" data-unique-id="7920c7d8-5d2f-4bc2-80d1-70b884e92b44" data-loc="79:14-79:118" data-file-name="app/admin/create/page.tsx">
                <User size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-primary" data-unique-id="46890f68-dd84-4178-af91-38ea99ec5609" data-loc="82:14-82:62" data-file-name="app/admin/create/page.tsx">Create Admin User</h2>
              <p className="text-muted-foreground mt-1" data-unique-id="8f41672c-33c7-4ece-acc6-f23288190451" data-loc="83:14-83:56" data-file-name="app/admin/create/page.tsx">
                Add a new administrator to the system
              </p>
            </div>

            {error && <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 flex items-start space-x-2" data-unique-id="699afb5f-9707-4db9-b3ce-94ccec7ee217" data-loc="88:22-92:107" data-file-name="app/admin/create/page.tsx">
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                <span className="text-sm" data-unique-id="fb3d0b94-2b1a-4710-a317-de0a0c9fa05f" data-loc="94:16-94:42" data-file-name="app/admin/create/page.tsx">{error}</span>
              </motion.div>}

            {success && <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} className="bg-green-100 text-green-800 p-3 rounded-md mb-4 flex items-start space-x-2" data-unique-id="cfc2d0c1-e36c-4c55-b84b-4082907bbc86" data-loc="97:24-101:100" data-file-name="app/admin/create/page.tsx">
                <CheckCircle size={18} className="mt-0.5 flex-shrink-0" />
                <span className="text-sm" data-unique-id="a242ea61-4a6b-48c9-b91b-34b8f257a9e7" data-loc="103:16-103:42" data-file-name="app/admin/create/page.tsx">{success}</span>
              </motion.div>}

            <form onSubmit={handleSubmit} data-unique-id="418a18b4-b082-4f5e-a0c2-fbc468ca335e" data-loc="106:12-106:42" data-file-name="app/admin/create/page.tsx">
              <div className="space-y-4" data-unique-id="43c8fe2e-f040-450a-8dc2-3fcf9f915a9d" data-loc="107:14-107:41" data-file-name="app/admin/create/page.tsx">
                <div data-unique-id="a194944e-4722-48f0-a09d-35e2d314cfc7" data-loc="108:16-108:21" data-file-name="app/admin/create/page.tsx">
                  <label htmlFor="name" className="block text-sm font-medium mb-1" data-unique-id="02cfc696-43ab-445d-bb3e-c6f63fe8ae71" data-loc="109:18-109:83" data-file-name="app/admin/create/page.tsx">
                    Full Name
                  </label>
                  <div className="relative" data-unique-id="8ceac40b-35b3-4d8d-bc0b-e7a5e7c2b517" data-loc="112:18-112:44" data-file-name="app/admin/create/page.tsx">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" data-unique-id="ea14f435-5dd8-486a-bfca-df701aba97f8" data-loc="113:20-113:92" data-file-name="app/admin/create/page.tsx">
                      <User size={18} />
                    </div>
                    <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className="input-field pl-10" placeholder="Enter full name" required data-unique-id="cf9a21eb-4172-494b-bac5-0ed4db1a0762" data-loc="116:20-116:173" data-file-name="app/admin/create/page.tsx" />
                  </div>
                </div>

                <div data-unique-id="f87ad78f-44b8-4b3d-8f00-ae2949d31803" data-loc="120:16-120:21" data-file-name="app/admin/create/page.tsx">
                  <label htmlFor="username" className="block text-sm font-medium mb-1" data-unique-id="3b10713b-11f2-46e1-884a-04c38d54d830" data-loc="121:18-121:87" data-file-name="app/admin/create/page.tsx">
                    Username
                  </label>
                  <div className="relative" data-unique-id="b0203c8b-4766-4dd6-9f37-9b4dcde18569" data-loc="124:18-124:44" data-file-name="app/admin/create/page.tsx">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" data-unique-id="cc10881f-5fcd-4e8e-9f73-2a249e4f000a" data-loc="125:20-125:92" data-file-name="app/admin/create/page.tsx">
                      <User size={18} />
                    </div>
                    <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} className="input-field pl-10" placeholder="Enter username" required data-unique-id="3ffd54f7-9079-49f0-92fa-5a14d7acae49" data-loc="128:20-128:184" data-file-name="app/admin/create/page.tsx" />
                  </div>
                </div>

                <div data-unique-id="14bc4868-ed41-4bbc-be02-b0e6f1a3848f" data-loc="132:16-132:21" data-file-name="app/admin/create/page.tsx">
                  <label htmlFor="email" className="block text-sm font-medium mb-1" data-unique-id="c8f0c1e5-7d77-4b74-b727-9f04c75024fe" data-loc="133:18-133:84" data-file-name="app/admin/create/page.tsx">
                    Email
                  </label>
                  <div className="relative" data-unique-id="f584b57f-b495-4c5e-9125-bdcbabf6f6f0" data-loc="136:18-136:44" data-file-name="app/admin/create/page.tsx">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" data-unique-id="ab59b085-00da-4696-9703-69432096c1a7" data-loc="137:20-137:92" data-file-name="app/admin/create/page.tsx">
                      <Mail size={18} />
                    </div>
                    <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field pl-10" placeholder="Enter email address" required data-unique-id="66b369fd-65b5-46a7-8b65-ca0b01e0c255" data-loc="140:20-140:181" data-file-name="app/admin/create/page.tsx" />
                  </div>
                </div>

                <div data-unique-id="28d9dce9-7179-43db-86f0-7a0f0d7e5e39" data-loc="144:16-144:21" data-file-name="app/admin/create/page.tsx">
                  <label htmlFor="password" className="block text-sm font-medium mb-1" data-unique-id="565dd0f2-4d85-4df6-9c9b-37f11bcc1f63" data-loc="145:18-145:87" data-file-name="app/admin/create/page.tsx">
                    Password
                  </label>
                  <div className="relative" data-unique-id="2cf4f393-a293-4180-ac28-9d4387196e6d" data-loc="148:18-148:44" data-file-name="app/admin/create/page.tsx">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" data-unique-id="9d7baa76-eb6c-4425-b4ae-fa867c73df51" data-loc="149:20-149:92" data-file-name="app/admin/create/page.tsx">
                      <Lock size={18} />
                    </div>
                    <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-field pl-10" placeholder="Enter password" required data-unique-id="ba9897e2-418c-44ce-bdb9-b0758b843b6f" data-loc="152:20-152:188" data-file-name="app/admin/create/page.tsx" />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full mt-6 flex items-center justify-center" disabled={isLoading} data-unique-id="59f0b031-f6a6-401c-b54d-374ac1310833" data-loc="157:14-157:126" data-file-name="app/admin/create/page.tsx">
                {isLoading ? <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Creating...
                  </> : 'Create Admin User'}
              </button>
            </form>

            <div className="mt-6 text-center" data-unique-id="1f1990ef-cf5b-4866-8b06-6a0a5559d235" data-loc="165:12-165:46" data-file-name="app/admin/create/page.tsx">
              <a href="/" className="text-primary hover:underline" data-unique-id="cce8ac05-5eeb-4540-8ca7-429bcc2b6f9a" data-loc="166:14-166:67" data-file-name="app/admin/create/page.tsx">
                Back to Login
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    </div>;
}