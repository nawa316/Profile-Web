'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import DeleteModal from '../../components/DeleteModal';
import { achievementApi } from '@/lib/api';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AchievementsPage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await achievementApi.getAll();
      setData(res);
    } catch (e) {} finally { setLoading(false); }
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    try {
      await achievementApi.delete(deleteModal.id);
      await fetchData();
      setDeleteModal({ isOpen: false, id: null });
    } catch (e) {}
  };

  return (
    <div>
      <Header title="Achievements" subtitle="Manage your achievements" />
      <div className="p-8">
        <button onClick={() => router.push('/admin/achievements/create')} className="mb-4 flex items-center gap-2 px-4 py-2 bg-[#3c45b9] text-white rounded-lg">
          <Plus size={20} /> New Achievement
        </button>
        {loading ? <p>Loading...</p> : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead><tr className="bg-gray-50 border-b"><th className="p-4">Title</th><th className="p-4 text-right">Actions</th></tr></thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.id} className="border-b">
                    <td className="p-4">{item.title}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => router.push(`/admin/achievements/${item.id}`)} className="mr-4 text-blue-600"><Edit2 size={16}/></button>
                      <button onClick={() => setDeleteModal({ isOpen: true, id: item.id })} className="text-red-600"><Trash2 size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <DeleteModal isOpen={deleteModal.isOpen} onClose={() => setDeleteModal({ isOpen: false, id: null })} onConfirm={handleDelete} title="Delete Achievement" message="Are you sure?" isLoading={false} />
    </div>
  );
}
