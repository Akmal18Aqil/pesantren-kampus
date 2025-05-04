'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, Bell, User, Users, Search, Plus, Edit, Trash2, Filter, ChevronDown, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  avatarUrl?: string;
  createdAt: string;
}
export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserData | null>(null);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
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
      fetchUsers();
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/');
    }
  }, [router, currentPage, selectedRole, searchTerm]);
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Build query params
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('limit', '10');
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      if (selectedRole) {
        params.append('role', selectedRole);
      }
      const response = await fetch(`/api/users?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      const response = await fetch(`/api/users/${userToDelete.id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Refresh user list
      fetchUsers();
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    fetchUsers();
  };
  const handleRoleFilter = (role: string | null) => {
    setSelectedRole(role);
    setCurrentPage(1); // Reset to first page on filter change
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
    return <div className="flex items-center justify-center min-h-screen" data-unique-id="8ecaa06b-3d43-4aa5-9047-d9b33b1934a8" data-loc="138:6-138:69" data-file-name="app/dashboard/users/page.tsx">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>;
  }
  return <div className="min-h-screen flex flex-col" data-unique-id="8c6057a5-7ccc-49f8-ae59-a5072b65d646" data-loc="145:4-145:48" data-file-name="app/dashboard/users/page.tsx">
      {/* Header */}
      <header className="bg-primary text-white py-3 px-6 shadow-md sticky top-0 z-10" data-unique-id="7c59bb0d-2e4f-430a-af22-100d6854ea1b" data-loc="147:6-147:86" data-file-name="app/dashboard/users/page.tsx">
        <div className="container mx-auto flex justify-between items-center" data-unique-id="eedc2150-2c0d-491f-97ac-4737c3b0af55" data-loc="148:8-148:77" data-file-name="app/dashboard/users/page.tsx">
          <div className="flex items-center space-x-2" data-unique-id="782d8907-8492-4daf-94f5-632fe57759ac" data-loc="149:10-149:55" data-file-name="app/dashboard/users/page.tsx">
            <BookOpen size={24} />
            <h1 className="text-xl font-bold" data-unique-id="fe81e223-2494-4b7c-82da-cb340dcc2ce3" data-loc="151:12-151:46" data-file-name="app/dashboard/users/page.tsx">SIAKAD Pesantren</h1>
          </div>
          
          <div className="flex items-center space-x-4" data-unique-id="0d6c68fe-2f47-4c55-8359-54a32f160de6" data-loc="154:10-154:55" data-file-name="app/dashboard/users/page.tsx">
            <button className="relative" data-unique-id="a32f866e-6950-4010-a5e6-cb1bea20c926" data-loc="155:12-155:41" data-file-name="app/dashboard/users/page.tsx">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-destructive text-white rounded-full w-4 h-4 flex items-center justify-center text-xs" data-unique-id="f5b24252-433d-47a1-86fd-ce7acebd48ff" data-loc="157:14-157:145" data-file-name="app/dashboard/users/page.tsx">
                3
              </span>
            </button>
            
            <div className="flex items-center space-x-2" data-unique-id="eba81878-a469-45ea-81ea-6fd1ad9180ef" data-loc="162:12-162:57" data-file-name="app/dashboard/users/page.tsx">
              <div className="bg-white/20 rounded-full p-1" data-unique-id="39ca5c2c-56c7-4c55-9fee-3ee709b864be" data-loc="163:14-163:60" data-file-name="app/dashboard/users/page.tsx">
                <User size={20} />
              </div>
              <span data-unique-id="678c302a-7642-439d-8ab0-d8fe38e4adcb" data-loc="166:14-166:20" data-file-name="app/dashboard/users/page.tsx">{currentUser.name}</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-grow" data-unique-id="ee94977a-52f0-42b2-b5d0-2af99a60bc36" data-loc="172:6-172:38" data-file-name="app/dashboard/users/page.tsx">
        {/* Sidebar */}
        <aside className="w-64 bg-sidebar-background border-r border-sidebar-border shadow-sm" data-unique-id="889edc5d-ba51-40e2-93c0-d309b6eaa983" data-loc="174:8-174:95" data-file-name="app/dashboard/users/page.tsx">
          <div className="p-4" data-unique-id="42e7fc83-72f7-46b2-81b4-f9c9773c5d2b" data-loc="175:10-175:31" data-file-name="app/dashboard/users/page.tsx">
            <div className="flex items-center space-x-2 px-4 py-3 bg-sidebar-accent rounded-lg" data-unique-id="95ee1297-65d3-4a1b-80ac-f007140e9272" data-loc="176:12-176:96" data-file-name="app/dashboard/users/page.tsx">
              <div className="bg-primary rounded-full p-2" data-unique-id="cee945be-8b05-47fe-80f9-e55605d16917" data-loc="177:14-177:59" data-file-name="app/dashboard/users/page.tsx">
                <User size={18} className="text-white" />
              </div>
              <div data-unique-id="46daa736-9070-4e30-ba32-0c21fef3a49e" data-loc="180:14-180:19" data-file-name="app/dashboard/users/page.tsx">
                <p className="font-medium" data-unique-id="1a0ec6c1-c317-4c64-a8ba-6bc4a44e0492" data-loc="181:16-181:43" data-file-name="app/dashboard/users/page.tsx">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground capitalize" data-unique-id="ba309bdd-5760-4dea-8d2f-b09802889877" data-loc="182:16-182:72" data-file-name="app/dashboard/users/page.tsx">{currentUser.role}</p>
              </div>
            </div>
          </div>
          
          <nav className="px-4 py-2" data-unique-id="a6480477-9aef-4af5-9389-a8c8ae5a80a7" data-loc="187:10-187:37" data-file-name="app/dashboard/users/page.tsx">
            <ul className="space-y-1" data-unique-id="62b58db7-ddf6-4ea8-b1fd-a3e02f81e13d" data-loc="188:12-188:38" data-file-name="app/dashboard/users/page.tsx">
              <li data-unique-id="ea40e277-792a-47c7-8120-e5d657a7b81a" data-loc="189:14-189:18" data-file-name="app/dashboard/users/page.tsx">
                <button onClick={() => router.push('/dashboard')} className="w-full flex items-center space-x-3 px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-lg transition-colors" data-unique-id="d96a2da0-4093-4ab6-91b7-ec20087d3f1a" data-loc="190:16-193:17" data-file-name="app/dashboard/users/page.tsx">
                  <User size={18} />
                  <span data-unique-id="cec37a3b-3f91-4c0f-9db1-81266ce35bed" data-loc="195:18-195:24" data-file-name="app/dashboard/users/page.tsx">Dashboard</span>
                </button>
              </li>
              <li data-unique-id="ad602ff0-4629-4ce0-9c55-29e191c5ee1e" data-loc="198:14-198:18" data-file-name="app/dashboard/users/page.tsx">
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-sidebar-primary bg-sidebar-accent rounded-lg" data-unique-id="069d9b40-0976-46fc-9955-213d2d70b54b" data-loc="199:16-201:17" data-file-name="app/dashboard/users/page.tsx">
                  <Users size={18} />
                  <span data-unique-id="7e683963-b8b9-48c7-ad7d-55c2d3581d08" data-loc="203:18-203:24" data-file-name="app/dashboard/users/page.tsx">User Management</span>
                </button>
              </li>
              <li data-unique-id="76c452ad-edaf-47e7-8a29-87de2a3fca32" data-loc="206:14-206:18" data-file-name="app/dashboard/users/page.tsx">
                <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors mt-8" data-unique-id="a4c2e305-c78a-4022-bb6e-6928f31de03d" data-loc="207:16-207:179" data-file-name="app/dashboard/users/page.tsx">
                  <Trash2 size={18} />
                  <span data-unique-id="48c956a5-cea7-45e8-bdd5-adaf5e47b6eb" data-loc="209:18-209:24" data-file-name="app/dashboard/users/page.tsx">Keluar</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-grow p-6" data-unique-id="81ad612e-1c77-4682-910a-506f883c9b82" data-loc="217:8-217:40" data-file-name="app/dashboard/users/page.tsx">
          <div className="container mx-auto" data-unique-id="0097997b-ac8f-4348-8d57-b78f8813d4d7" data-loc="218:10-218:45" data-file-name="app/dashboard/users/page.tsx">
            <div className="flex items-center justify-between mb-6" data-unique-id="83e05e60-701f-4cd3-8e5b-94892ed7a76d" data-loc="219:12-219:68" data-file-name="app/dashboard/users/page.tsx">
              <h1 className="text-2xl font-bold" data-unique-id="271725f3-6dd7-4566-9d47-b8aff685e1b5" data-loc="220:14-220:49" data-file-name="app/dashboard/users/page.tsx">User Management</h1>
              <button onClick={() => router.push('/dashboard/users/create')} className="btn-primary flex items-center space-x-2" data-unique-id="c23b60f9-3800-42af-96d3-df0667f3777b" data-loc="221:14-224:15" data-file-name="app/dashboard/users/page.tsx">
                <Plus size={18} />
                <span data-unique-id="9d27a1ef-f59b-4132-908c-175eed381b9a" data-loc="226:16-226:22" data-file-name="app/dashboard/users/page.tsx">Tambah User</span>
              </button>
            </div>
            
            {/* Search and Filter */}
            <div className="flex flex-wrap gap-4 mb-6" data-unique-id="1c85ff40-9652-4e81-b4a0-d605fd856e84" data-loc="231:12-231:55" data-file-name="app/dashboard/users/page.tsx">
              <form onSubmit={handleSearch} className="flex-grow max-w-md" data-unique-id="4bf9770d-4ffe-4f69-890e-2b6eacb24279" data-loc="232:14-232:75" data-file-name="app/dashboard/users/page.tsx">
                <div className="relative" data-unique-id="21ec7073-4ee1-4cfc-9cd8-f515b0881954" data-loc="233:16-233:42" data-file-name="app/dashboard/users/page.tsx">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" placeholder="Cari nama, username, atau email..." className="input-field pl-10 w-full" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} data-unique-id="7b2df472-4964-4375-ab42-55a97b0dd2f3" data-loc="235:18-241:20" data-file-name="app/dashboard/users/page.tsx" />
                </div>
              </form>
              
              <div className="relative" data-unique-id="a0dea263-074b-4ae7-bff4-0ee415d9ae1a" data-loc="245:14-245:40" data-file-name="app/dashboard/users/page.tsx">
                <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-md bg-card" onClick={() => document.getElementById('roleDropdown')?.classList.toggle('hidden')} data-unique-id="c1794093-d029-4b77-a249-7bacabbe6eb6" data-loc="246:16-249:17" data-file-name="app/dashboard/users/page.tsx">
                  <Filter size={18} />
                  <span data-unique-id="c35784fc-e366-49b2-8b19-d5dfa45edbcb" data-loc="251:18-251:24" data-file-name="app/dashboard/users/page.tsx">{selectedRole ? `Role: ${selectedRole}` : 'Filter Role'}</span>
                  <ChevronDown size={16} />
                </button>
                
                <div id="roleDropdown" className="absolute z-10 mt-1 w-48 bg-card border border-border rounded-md shadow-lg hidden" data-unique-id="dba921f3-0aab-4379-9c17-7eb977beb8db" data-loc="255:16-258:17" data-file-name="app/dashboard/users/page.tsx">
                  <ul className="py-1" data-unique-id="c9eff1ef-4450-4e75-bab5-b9d5ca3892c4" data-loc="259:18-259:39" data-file-name="app/dashboard/users/page.tsx">
                    <li className="px-4 py-2 hover:bg-muted cursor-pointer" onClick={() => handleRoleFilter(null)} data-unique-id="3a48fd8c-05d9-431e-9330-a4b3dff8731e" data-loc="260:20-263:21" data-file-name="app/dashboard/users/page.tsx">
                      Semua Role
                    </li>
                    <li className="px-4 py-2 hover:bg-muted cursor-pointer" onClick={() => handleRoleFilter('admin')} data-unique-id="70e43e60-4df9-4a4b-a3e3-f1c7376d8105" data-loc="266:20-269:21" data-file-name="app/dashboard/users/page.tsx">
                      Admin
                    </li>
                    <li className="px-4 py-2 hover:bg-muted cursor-pointer" onClick={() => handleRoleFilter('teacher')} data-unique-id="3e3fb786-e108-4299-804f-4fdc04e4f6e0" data-loc="272:20-275:21" data-file-name="app/dashboard/users/page.tsx">
                      Dosen
                    </li>
                    <li className="px-4 py-2 hover:bg-muted cursor-pointer" onClick={() => handleRoleFilter('student')} data-unique-id="e44cda2e-bcda-4780-8c6e-2e9d247d1947" data-loc="278:20-281:21" data-file-name="app/dashboard/users/page.tsx">
                      Mahasiswa
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Users Table */}
            <div className="bg-card border border-border rounded-lg overflow-hidden" data-unique-id="b82cfa49-624a-46f3-8365-e432f6372eb2" data-loc="290:12-290:85" data-file-name="app/dashboard/users/page.tsx">
              <div className="overflow-x-auto" data-unique-id="6e6fb926-ffbb-4752-9ef6-c41b7be2455e" data-loc="291:14-291:47" data-file-name="app/dashboard/users/page.tsx">
                <table className="w-full" data-unique-id="35f86d8f-a7c0-4ed7-970b-e3a0c7de53ea" data-loc="292:16-292:42" data-file-name="app/dashboard/users/page.tsx">
                  <thead data-unique-id="25515a40-2bf9-4466-84ff-c075a8d001ef" data-loc="293:18-293:25" data-file-name="app/dashboard/users/page.tsx">
                    <tr className="bg-muted" data-unique-id="55f625f2-3776-4825-8114-3bffc183ba99" data-loc="294:20-294:45" data-file-name="app/dashboard/users/page.tsx">
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider" data-unique-id="1a67f8df-49bd-4ccc-ad40-7ad6ee9afae2" data-loc="295:22-295:125" data-file-name="app/dashboard/users/page.tsx">Nama</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider" data-unique-id="a3b17e92-e55d-4d2e-bbe5-cfa50f2569bf" data-loc="296:22-296:125" data-file-name="app/dashboard/users/page.tsx">Username</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider" data-unique-id="e27a1926-3826-4219-9667-2046d3de6dbd" data-loc="297:22-297:125" data-file-name="app/dashboard/users/page.tsx">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider" data-unique-id="a5c8027a-b836-4596-882f-9ab31babde00" data-loc="298:22-298:125" data-file-name="app/dashboard/users/page.tsx">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider" data-unique-id="96bb88a7-2885-47c2-861a-665f1ac09830" data-loc="299:22-299:125" data-file-name="app/dashboard/users/page.tsx">Tanggal Dibuat</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider" data-unique-id="21dc2ec3-1240-4779-939f-c8b0a2532669" data-loc="300:22-300:126" data-file-name="app/dashboard/users/page.tsx">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border" data-unique-id="27571c50-aead-4987-83bc-4a530def5444" data-loc="303:18-303:60" data-file-name="app/dashboard/users/page.tsx">
                    {isLoading ? <tr data-unique-id="734a981d-9771-4dc8-8b26-e41bb2fa60f5" data-loc="305:22-305:26" data-file-name="app/dashboard/users/page.tsx">
                        <td colSpan={6} className="px-6 py-10 text-center" data-unique-id="ced8ecc9-3447-4577-a5f8-9ac00aca70e5" data-loc="306:24-306:75" data-file-name="app/dashboard/users/page.tsx">
                          <Loader2 size={24} className="animate-spin mx-auto text-primary" />
                        </td>
                      </tr> : users.length > 0 ? users.map(user => <tr key={user.id} className="hover:bg-muted/50" data-unique-id="map_47ffd18b-cfee-4f8a-bd69-95647220273e" data-loc="312:24-312:72" data-file-name="app/dashboard/users/page.tsx" data-is-mapped="true">
                          <td className="px-6 py-4 whitespace-nowrap" data-unique-id="map_03edc303-9003-4183-bf5d-31473a817a45" data-loc="313:26-313:70" data-file-name="app/dashboard/users/page.tsx" data-is-mapped="true">
                            <div className="flex items-center" data-unique-id="map_a6e1a48a-341e-4b8b-be3c-e595432b3c49" data-loc="314:28-314:63" data-file-name="app/dashboard/users/page.tsx" data-is-mapped="true">
                              <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center" data-unique-id="map_5ba7ae0a-50bf-4a1a-8e88-2da52db77c7b" data-loc="315:30-315:131" data-file-name="app/dashboard/users/page.tsx" data-is-mapped="true">
                                {user.avatarUrl ? <img src={user.avatarUrl} alt={user.name} className="h-10 w-10 rounded-full" data-unique-id="map_19111794-d1a7-4a6f-9d26-aee457fd0c85" data-loc="317:34-317:113" data-file-name="app/dashboard/users/page.tsx" data-is-mapped="true" /> : <User size={20} className="text-primary" />}
                              </div>
                              <div className="ml-4" data-unique-id="map_e71b7f8b-b743-4962-b02f-25082769f7bb" data-loc="322:30-322:52" data-file-name="app/dashboard/users/page.tsx" data-is-mapped="true">
                                <div className="text-sm font-medium" data-unique-id="map_4b2de766-3d05-4f59-a2c8-546404812133" data-loc="323:32-323:69" data-file-name="app/dashboard/users/page.tsx" data-is-mapped="true">{user.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm" data-unique-id="map_9209e86d-196e-4fd4-a9bd-76d49618e51a" data-loc="327:26-327:78" data-file-name="app/dashboard/users/page.tsx" data-is-mapped="true">{user.username}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm" data-unique-id="map_3bfd1f7e-deb4-417f-8024-7dcac0a0ad46" data-loc="328:26-328:78" data-file-name="app/dashboard/users/page.tsx" data-is-mapped="true">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap" data-unique-id="map_13dccba3-eee4-4fde-8b21-735c1fb177f7" data-loc="329:26-329:70" data-file-name="app/dashboard/users/page.tsx" data-is-mapped="true">
                            <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : user.role === 'teacher' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`} data-unique-id="map_80f8188a-1483-44f1-8991-880ec203b955" data-loc="330:28-336:32" data-file-name="app/dashboard/users/page.tsx" data-is-mapped="true">
                              {user.role === 'admin' ? 'Admin' : user.role === 'teacher' ? 'Dosen' : 'Mahasiswa'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm" data-unique-id="map_94c1cd98-828a-4fbe-b858-df63cf839b8f" data-loc="340:26-340:78" data-file-name="app/dashboard/users/page.tsx" data-is-mapped="true">
                            {new Date(user.createdAt).toLocaleDateString('id-ID')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" data-unique-id="map_5e3059e5-c783-4878-873c-044352528701" data-loc="343:26-343:101" data-file-name="app/dashboard/users/page.tsx" data-is-mapped="true">
                            <button onClick={() => router.push(`/dashboard/users/edit/${user.id}`)} className="text-blue-600 hover:text-blue-900 mr-3" data-unique-id="map_e77b38d8-74c9-4fd9-a177-831ae4a08a91" data-loc="344:28-347:29" data-file-name="app/dashboard/users/page.tsx" data-is-mapped="true">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => {
                        setUserToDelete(user);
                        setIsDeleteModalOpen(true);
                      }} className="text-red-600 hover:text-red-900" data-unique-id="map_722da40c-f0de-490d-b976-4d2f5a7467a1" data-loc="350:28-356:29" data-file-name="app/dashboard/users/page.tsx" data-is-mapped="true">
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>) : <tr data-unique-id="00bc218e-c840-416e-85ea-e77b37e846dc" data-loc="363:22-363:26" data-file-name="app/dashboard/users/page.tsx">
                        <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground" data-unique-id="ff00376e-2bf3-45ff-b24c-82859e98765e" data-loc="364:24-364:97" data-file-name="app/dashboard/users/page.tsx">
                          Tidak ada data pengguna yang ditemukan
                        </td>
                      </tr>}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && <div className="px-6 py-3 flex items-center justify-between border-t border-border" data-unique-id="d69826f3-a0af-4e39-b60a-8100c496c5ec" data-loc="375:16-375:100" data-file-name="app/dashboard/users/page.tsx">
                  <div className="text-sm text-muted-foreground" data-unique-id="0b04ef84-64bd-4e06-9792-b7159b6be56a" data-loc="376:18-376:65" data-file-name="app/dashboard/users/page.tsx">
                    Menampilkan halaman {currentPage} dari {totalPages}
                  </div>
                  <div className="flex space-x-2" data-unique-id="0bfcc49c-62db-491e-8e3b-a7dc71546177" data-loc="379:18-379:50" data-file-name="app/dashboard/users/page.tsx">
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`p-2 rounded-md ${currentPage === 1 ? 'text-muted-foreground cursor-not-allowed' : 'text-primary hover:bg-primary/10'}`} data-unique-id="fd388d5c-07f7-49a0-aaef-0601b0fdfd5d" data-loc="380:20-388:21" data-file-name="app/dashboard/users/page.tsx">
                      <ChevronLeft size={16} />
                    </button>
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className={`p-2 rounded-md ${currentPage === totalPages ? 'text-muted-foreground cursor-not-allowed' : 'text-primary hover:bg-primary/10'}`} data-unique-id="748c67b4-79c4-4ac3-b72e-74ba7b533e22" data-loc="391:20-399:21" data-file-name="app/dashboard/users/page.tsx">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>}
            </div>
          </div>
        </main>
      </div>
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" data-unique-id="20c17a67-f8f7-4f45-9ea4-723191385d08" data-loc="412:8-412:89" data-file-name="app/dashboard/users/page.tsx">
          <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full" data-unique-id="15229bd1-2703-4aa9-9aab-df9bbf70e902" data-loc="413:10-417:11" data-file-name="app/dashboard/users/page.tsx">
            <h3 className="text-lg font-semibold mb-4" data-unique-id="f7670297-7101-432f-83eb-e90dc25263ae" data-loc="418:12-418:55" data-file-name="app/dashboard/users/page.tsx">Konfirmasi Hapus User</h3>
            <p className="mb-6" data-unique-id="2398c58f-6960-42f5-81a6-3d06e45dc8b5" data-loc="419:12-419:32" data-file-name="app/dashboard/users/page.tsx">
              Apakah Anda yakin ingin menghapus user <span className="font-semibold" data-unique-id="943bba6e-0c13-46f9-abd5-285493c2d5d7" data-loc="420:53-420:85" data-file-name="app/dashboard/users/page.tsx">{userToDelete?.name}</span>? 
              Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end space-x-3" data-unique-id="c561670a-b578-41ae-b3da-3c62ee7ce47d" data-loc="423:12-423:56" data-file-name="app/dashboard/users/page.tsx">
              <button onClick={() => {
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
          }} className="px-4 py-2 border border-border rounded-md" data-unique-id="12235ca5-8f1f-457b-b37a-749dbd5e4eb4" data-loc="424:14-430:15" data-file-name="app/dashboard/users/page.tsx">
                Batal
              </button>
              <button onClick={handleDeleteUser} className="px-4 py-2 bg-destructive text-white rounded-md" data-unique-id="1363ce07-3f2b-48f0-b61b-0ca432a280d7" data-loc="433:14-436:15" data-file-name="app/dashboard/users/page.tsx">
                Hapus
              </button>
            </div>
          </motion.div>
        </div>}
    </div>;
}