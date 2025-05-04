'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, School, BarChart, ChevronRight, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
interface Announcement {
  id: number;
  title: string;
  content: string;
  publishDate: string;
  authorName: string;
}
interface AdminDashboardProps {
  announcements: Announcement[];
  isLoadingAnnouncements: boolean;
  formattedDate: string;
}
export default function AdminDashboard({
  announcements,
  isLoadingAnnouncements,
  formattedDate
}: AdminDashboardProps) {
  const router = useRouter();
  return <>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6" data-unique-id="532d1a46-48d8-44bd-94ca-5da0f2bc1aad" data-loc="31:6-31:66" data-file-name="components/dashboard/AdminDashboard.tsx">
        <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1
      }} className="card flex items-center space-x-4" onClick={() => router.push('/dashboard/users')} style={{
        cursor: 'pointer'
      }} data-unique-id="6baa97d9-5c48-41fe-84e7-96374ca1d997" data-loc="32:8-39:9" data-file-name="components/dashboard/AdminDashboard.tsx">
          <div className="bg-primary/10 p-3 rounded-lg" data-unique-id="961cdbbb-5ee4-4226-9aaf-927aeb92ef10" data-loc="40:10-40:56" data-file-name="components/dashboard/AdminDashboard.tsx">
            <Users size={24} className="text-primary" />
          </div>
          <div data-unique-id="e4f6279c-4d95-48b3-870e-80734c0d36e0" data-loc="43:10-43:15" data-file-name="components/dashboard/AdminDashboard.tsx">
            <h3 className="text-xl font-semibold" data-unique-id="954d7cb8-5eb6-4fbb-ab2c-f32fe234fddb" data-loc="44:12-44:50" data-file-name="components/dashboard/AdminDashboard.tsx">24</h3>
            <p className="text-sm text-muted-foreground" data-unique-id="b2dd4b8f-7a2c-454b-a208-0651f23a3c5a" data-loc="45:12-45:57" data-file-name="components/dashboard/AdminDashboard.tsx">Total Pengguna</p>
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
      }} className="card flex items-center space-x-4" data-unique-id="5f989b82-5586-4573-b478-dfcb6373303f" data-loc="49:8-54:9" data-file-name="components/dashboard/AdminDashboard.tsx">
          <div className="bg-accent/10 p-3 rounded-lg" data-unique-id="b4934d3e-d4e0-4285-9a59-de065674aa49" data-loc="55:10-55:55" data-file-name="components/dashboard/AdminDashboard.tsx">
            <BookOpen size={24} className="text-accent" />
          </div>
          <div data-unique-id="16c038c2-69ff-467f-847e-af12d55166f8" data-loc="58:10-58:15" data-file-name="components/dashboard/AdminDashboard.tsx">
            <h3 className="text-xl font-semibold" data-unique-id="1590b7d9-eb40-4e6f-8ade-2bef7bf44a4e" data-loc="59:12-59:50" data-file-name="components/dashboard/AdminDashboard.tsx">12</h3>
            <p className="text-sm text-muted-foreground" data-unique-id="b8172399-4e5a-40ad-96f1-5cd13e7e6f90" data-loc="60:12-60:57" data-file-name="components/dashboard/AdminDashboard.tsx">Mata Kuliah</p>
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
      }} className="card flex items-center space-x-4" data-unique-id="60cc1a32-d7cf-4378-acaa-202fe43b3f83" data-loc="64:8-69:9" data-file-name="components/dashboard/AdminDashboard.tsx">
          <div className="bg-secondary/10 p-3 rounded-lg" data-unique-id="88bc97cc-d704-4af5-99bd-0287424ae402" data-loc="70:10-70:58" data-file-name="components/dashboard/AdminDashboard.tsx">
            <School size={24} className="text-secondary" />
          </div>
          <div data-unique-id="422d8376-d3ba-4f8f-8cc3-8eaf4e15ca2b" data-loc="73:10-73:15" data-file-name="components/dashboard/AdminDashboard.tsx">
            <h3 className="text-xl font-semibold" data-unique-id="bd12b1b2-4b46-4a93-91ca-df5ea20b109f" data-loc="74:12-74:50" data-file-name="components/dashboard/AdminDashboard.tsx">8</h3>
            <p className="text-sm text-muted-foreground" data-unique-id="0a592ee5-3fb7-48c9-9e44-ed14f75a5143" data-loc="75:12-75:57" data-file-name="components/dashboard/AdminDashboard.tsx">Dosen</p>
          </div>
        </motion.div>
        
        <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }} className="card flex items-center space-x-4" data-unique-id="9a033494-af22-4459-b39d-a04d8eccf39a" data-loc="79:8-84:9" data-file-name="components/dashboard/AdminDashboard.tsx">
          <div className="bg-green-100 p-3 rounded-lg" data-unique-id="9b3d6a14-efc6-40cd-873b-4fa4828c09d4" data-loc="85:10-85:55" data-file-name="components/dashboard/AdminDashboard.tsx">
            <BarChart size={24} className="text-green-600" />
          </div>
          <div data-unique-id="4a40baf5-2b75-4f8e-9fb8-32dc008be5f4" data-loc="88:10-88:15" data-file-name="components/dashboard/AdminDashboard.tsx">
            <h3 className="text-xl font-semibold" data-unique-id="d5b73981-6c0f-42bd-ac2a-165cceb74f65" data-loc="89:12-89:50" data-file-name="components/dashboard/AdminDashboard.tsx">16</h3>
            <p className="text-sm text-muted-foreground" data-unique-id="3fef11ac-68a3-4990-a32b-6804345e57d9" data-loc="90:12-90:57" data-file-name="components/dashboard/AdminDashboard.tsx">Mahasiswa</p>
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-unique-id="b86561b0-4e8c-4ebd-b506-9a4407193afc" data-loc="95:6-95:61" data-file-name="components/dashboard/AdminDashboard.tsx">
        {/* Recent Users */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }} className="card md:col-span-2" data-unique-id="035c95d3-c364-4c3f-b8d2-670f42207586" data-loc="97:8-102:9" data-file-name="components/dashboard/AdminDashboard.tsx">
          <div className="flex justify-between items-center mb-4" data-unique-id="5b9bf05f-9f5b-4efe-9e75-a3a5da60a4be" data-loc="103:10-103:66" data-file-name="components/dashboard/AdminDashboard.tsx">
            <h2 className="text-lg font-semibold" data-unique-id="618552c5-36d1-4e0e-ac07-74277f807965" data-loc="104:12-104:50" data-file-name="components/dashboard/AdminDashboard.tsx">Pengguna Terbaru</h2>
            <button onClick={() => router.push('/dashboard/users/create')} className="text-sm text-primary flex items-center" data-unique-id="8d57cd13-1380-400d-a96e-ed232184a25e" data-loc="105:12-108:13" data-file-name="components/dashboard/AdminDashboard.tsx">
              <Plus size={16} className="mr-1" />
              Tambah User
            </button>
          </div>
          
          <div className="overflow-x-auto" data-unique-id="5f5f05da-c108-450c-80a4-b1062272c47b" data-loc="114:10-114:43" data-file-name="components/dashboard/AdminDashboard.tsx">
            <table className="w-full" data-unique-id="f05f9328-b3e2-446f-9b41-60981216ebd3" data-loc="115:12-115:38" data-file-name="components/dashboard/AdminDashboard.tsx">
              <thead data-unique-id="7cb6ca9a-2681-4461-bcdb-e008a53dca27" data-loc="116:14-116:21" data-file-name="components/dashboard/AdminDashboard.tsx">
                <tr className="text-left border-b border-border" data-unique-id="c59453e4-75e0-4b0e-94ef-204328fc006c" data-loc="117:16-117:65" data-file-name="components/dashboard/AdminDashboard.tsx">
                  <th className="pb-2 font-medium" data-unique-id="eaf94fd5-f890-4c0e-ae16-a6fa2ecec772" data-loc="118:18-118:51" data-file-name="components/dashboard/AdminDashboard.tsx">Nama</th>
                  <th className="pb-2 font-medium" data-unique-id="0e18260a-39e3-408d-a507-eea6195cf763" data-loc="119:18-119:51" data-file-name="components/dashboard/AdminDashboard.tsx">Username</th>
                  <th className="pb-2 font-medium" data-unique-id="9f087c50-babb-40f6-8904-084b8fc275f1" data-loc="120:18-120:51" data-file-name="components/dashboard/AdminDashboard.tsx">Role</th>
                  <th className="pb-2 font-medium" data-unique-id="344ebd2e-0708-42e5-aa4a-e03e7ed92c4b" data-loc="121:18-121:51" data-file-name="components/dashboard/AdminDashboard.tsx">Status</th>
                </tr>
              </thead>
              <tbody data-unique-id="bbb2b6d2-68ba-4cd4-97d6-a69b978a96c2" data-loc="124:14-124:21" data-file-name="components/dashboard/AdminDashboard.tsx">
                <tr className="border-b border-border" data-unique-id="41b74dad-c5d1-493a-af96-93fb57b53574" data-loc="125:16-125:55" data-file-name="components/dashboard/AdminDashboard.tsx">
                  <td className="py-3" data-unique-id="6ffc5005-c78c-4dad-95e8-136bb60506a8" data-loc="126:18-126:39" data-file-name="components/dashboard/AdminDashboard.tsx">Ahmad Fauzi</td>
                  <td className="py-3" data-unique-id="52e6f907-00a5-4a04-86a4-9b6885adfd2a" data-loc="127:18-127:39" data-file-name="components/dashboard/AdminDashboard.tsx">ahmad.fauzi</td>
                  <td className="py-3" data-unique-id="197738e1-f22c-44d4-8727-4c87393d4e46" data-loc="128:18-128:39" data-file-name="components/dashboard/AdminDashboard.tsx">Dosen</td>
                  <td className="py-3" data-unique-id="d8b22179-b119-4ba4-ba8e-3c9e8da70846" data-loc="129:18-129:39" data-file-name="components/dashboard/AdminDashboard.tsx"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full" data-unique-id="cafea913-f1f3-4783-8b4d-8f33f040f5cf" data-loc="129:39-129:116" data-file-name="components/dashboard/AdminDashboard.tsx">Aktif</span></td>
                </tr>
                <tr className="border-b border-border" data-unique-id="b0954a53-381e-47aa-ba4b-ad10c48dc60e" data-loc="131:16-131:55" data-file-name="components/dashboard/AdminDashboard.tsx">
                  <td className="py-3" data-unique-id="81351418-eecc-406c-ba5d-76d7531351ca" data-loc="132:18-132:39" data-file-name="components/dashboard/AdminDashboard.tsx">Muhammad Rizki</td>
                  <td className="py-3" data-unique-id="aa17783e-0b53-4b87-895b-0c0fb43e5914" data-loc="133:18-133:39" data-file-name="components/dashboard/AdminDashboard.tsx">rizki</td>
                  <td className="py-3" data-unique-id="01c47977-f20b-4e6b-8699-3c55b8a18cd8" data-loc="134:18-134:39" data-file-name="components/dashboard/AdminDashboard.tsx">Mahasiswa</td>
                  <td className="py-3" data-unique-id="97e34fad-869d-4f48-8bac-539b0a417ef9" data-loc="135:18-135:39" data-file-name="components/dashboard/AdminDashboard.tsx"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full" data-unique-id="1f1ac69d-b483-43d2-a52e-ecd3824c9d63" data-loc="135:39-135:116" data-file-name="components/dashboard/AdminDashboard.tsx">Aktif</span></td>
                </tr>
                <tr className="border-b border-border" data-unique-id="d8f9f47a-3f8f-4d9c-bcda-762ac9dc75a9" data-loc="137:16-137:55" data-file-name="components/dashboard/AdminDashboard.tsx">
                  <td className="py-3" data-unique-id="87b91c5a-414a-4283-bfca-db70ef7a1c90" data-loc="138:18-138:39" data-file-name="components/dashboard/AdminDashboard.tsx">Aisyah Putri</td>
                  <td className="py-3" data-unique-id="3b67a9db-6adc-4bb6-be24-e848927527a6" data-loc="139:18-139:39" data-file-name="components/dashboard/AdminDashboard.tsx">aisyah</td>
                  <td className="py-3" data-unique-id="6362fae5-4197-4bc8-8a19-36d501175553" data-loc="140:18-140:39" data-file-name="components/dashboard/AdminDashboard.tsx">Mahasiswa</td>
                  <td className="py-3" data-unique-id="1d6f0a59-e347-4dee-bfe3-e548360e2d61" data-loc="141:18-141:39" data-file-name="components/dashboard/AdminDashboard.tsx"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full" data-unique-id="65cf1068-1dc3-4c01-8872-1f75b1dff40e" data-loc="141:39-141:116" data-file-name="components/dashboard/AdminDashboard.tsx">Aktif</span></td>
                </tr>
                <tr data-unique-id="2dd72203-7126-4c16-8443-cd9ecec2603c" data-loc="143:16-143:20" data-file-name="components/dashboard/AdminDashboard.tsx">
                  <td className="py-3" data-unique-id="d384b7ee-e96c-4564-831d-444ba1d3bd81" data-loc="144:18-144:39" data-file-name="components/dashboard/AdminDashboard.tsx">Budi Santoso</td>
                  <td className="py-3" data-unique-id="1db680e0-7fcd-4d41-8201-8bc0eccc10f1" data-loc="145:18-145:39" data-file-name="components/dashboard/AdminDashboard.tsx">budi.santoso</td>
                  <td className="py-3" data-unique-id="f877ea12-7fdd-4803-aba2-07dc5ab8f001" data-loc="146:18-146:39" data-file-name="components/dashboard/AdminDashboard.tsx">Dosen</td>
                  <td className="py-3" data-unique-id="4c4cb2d1-e2a5-4aa3-b614-347258bbd418" data-loc="147:18-147:39" data-file-name="components/dashboard/AdminDashboard.tsx"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full" data-unique-id="c4bf33a9-90c8-4c52-b63a-6b6b65ccce86" data-loc="147:39-147:116" data-file-name="components/dashboard/AdminDashboard.tsx">Aktif</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-center" data-unique-id="244ed2bb-82fb-4270-a654-40307c7c6f5b" data-loc="153:10-153:44" data-file-name="components/dashboard/AdminDashboard.tsx">
            <button onClick={() => router.push('/dashboard/users')} className="text-primary text-sm hover:underline flex items-center mx-auto" data-unique-id="a88a508a-1571-49ce-a41f-e4a29e7bdfce" data-loc="154:12-157:13" data-file-name="components/dashboard/AdminDashboard.tsx">
              <span data-unique-id="96cc0096-b2d5-4aff-8ac3-b6e1964b0a0e" data-loc="158:14-158:20" data-file-name="components/dashboard/AdminDashboard.tsx">Lihat Semua Pengguna</span>
              <ChevronRight size={16} />
            </button>
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
      }} className="card" data-unique-id="35aaac12-269f-4c08-b3a4-88937250eec7" data-loc="165:8-170:9" data-file-name="components/dashboard/AdminDashboard.tsx">
          <div className="flex justify-between items-center mb-4" data-unique-id="0c0ea4ca-b11d-468c-97f6-c942d8ba56c7" data-loc="171:10-171:66" data-file-name="components/dashboard/AdminDashboard.tsx">
            <h2 className="text-lg font-semibold" data-unique-id="4b47e42d-2217-4e35-83c8-e7164ad1ad4d" data-loc="172:12-172:50" data-file-name="components/dashboard/AdminDashboard.tsx">Pengumuman</h2>
            <span className="text-xs text-primary cursor-pointer" data-unique-id="0c1d06cd-f7e1-41e9-ae7a-568c57778674" data-loc="173:12-173:66" data-file-name="components/dashboard/AdminDashboard.tsx">Lihat Semua</span>
          </div>
          
          <div className="space-y-3" data-unique-id="d015fa79-34cb-4f8b-9048-da12d9a77822" data-loc="176:10-176:37" data-file-name="components/dashboard/AdminDashboard.tsx">
            {isLoadingAnnouncements ? <div className="flex justify-center py-8" data-unique-id="d1bdc16a-b5e3-4a25-b8be-de9c4001b88b" data-loc="178:14-178:56" data-file-name="components/dashboard/AdminDashboard.tsx">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" data-unique-id="948b558b-8f25-4dc3-ba9e-56926a588a86" data-loc="179:16-179:93" data-file-name="components/dashboard/AdminDashboard.tsx"></div>
              </div> : announcements.length > 0 ? announcements.map((announcement, index) => <div key={index} className="flex items-center justify-between p-3 border-b border-border last:border-0" data-unique-id="map_147d5d4e-16a2-4ab0-9140-de8ca6231b7f" data-loc="183:16-183:120" data-file-name="components/dashboard/AdminDashboard.tsx" data-is-mapped="true">
                  <div data-unique-id="map_5acadf3e-82ac-4743-a814-ed19a1a5d0ea" data-loc="184:18-184:23" data-file-name="components/dashboard/AdminDashboard.tsx" data-is-mapped="true">
                    <p className="font-medium" data-unique-id="map_2cce796a-8303-493b-9d57-05ba20673126" data-loc="185:20-185:47" data-file-name="components/dashboard/AdminDashboard.tsx" data-is-mapped="true">{announcement.title}</p>
                    <p className="text-xs text-muted-foreground" data-unique-id="map_62a60bec-9a25-4922-b73b-b51fb5f939de" data-loc="186:20-186:65" data-file-name="components/dashboard/AdminDashboard.tsx" data-is-mapped="true">
                      {new Date(announcement.publishDate).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </div>) : <div className="text-center py-8 text-muted-foreground" data-unique-id="cdba38f1-995f-4dff-a6d1-93186d596d3d" data-loc="198:14-198:70" data-file-name="components/dashboard/AdminDashboard.tsx">
                Tidak ada pengumuman terbaru
              </div>}
          </div>
          
          <div className="mt-4" data-unique-id="c2c6cb92-7149-483e-bbcd-45091cf20bf6" data-loc="204:10-204:32" data-file-name="components/dashboard/AdminDashboard.tsx">
            <button className="btn-primary w-full flex items-center justify-center" data-unique-id="27d6d27e-c1f1-4b24-b094-bc14c1384ad3" data-loc="205:12-205:84" data-file-name="components/dashboard/AdminDashboard.tsx">
              <Plus size={16} className="mr-2" />
              Buat Pengumuman
            </button>
          </div>
        </motion.div>
      </div>
    </>;
}