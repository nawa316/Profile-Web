const fs = require('fs');
const path = require('path');

const entities = [
  {
    name: 'Education',
    plural: 'Educations',
    route: 'educations',
    api: 'educationApi',
    fields: ['institution', 'degree', 'major', 'start_date', 'end_date', 'gpa', 'description']
  },
  {
    name: 'Certification',
    plural: 'Certifications',
    route: 'certifications',
    api: 'certificationApi',
    fields: ['name', 'issuer', 'date', 'description', 'credential_url']
  },
  {
    name: 'Achievement',
    plural: 'Achievements',
    route: 'achievements',
    api: 'achievementApi',
    fields: ['title', 'description', 'year']
  }
];

const adminDir = path.join(__dirname, 'src', 'app', 'admin');

entities.forEach(ent => {
  const entityDir = path.join(adminDir, ent.route);
  const createDir = path.join(entityDir, 'create');
  const editDir = path.join(entityDir, '[id]');
  
  if (!fs.existsSync(entityDir)) fs.mkdirSync(entityDir, { recursive: true });
  if (!fs.existsSync(createDir)) fs.mkdirSync(createDir, { recursive: true });
  if (!fs.existsSync(editDir)) fs.mkdirSync(editDir, { recursive: true });

  // 1. List Page
  const listCode = `'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import DeleteModal from '../../components/DeleteModal';
import { ${ent.api} } from '@/lib/api';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function ${ent.plural}Page() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const res = await ${ent.api}.getAll();
      setData(res);
    } catch (e) {} finally { setLoading(false); }
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    try {
      await ${ent.api}.delete(deleteModal.id);
      await fetchData();
      setDeleteModal({ isOpen: false, id: null });
    } catch (e) {}
  };

  return (
    <div>
      <Header title="${ent.plural}" subtitle="Manage your ${ent.plural.toLowerCase()}" />
      <div className="p-8">
        <button onClick={() => router.push('/admin/${ent.route}/create')} className="mb-4 flex items-center gap-2 px-4 py-2 bg-[#3c45b9] text-white rounded-lg">
          <Plus size={20} /> New ${ent.name}
        </button>
        {loading ? <p>Loading...</p> : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead><tr className="bg-gray-50 border-b"><th className="p-4">Title</th><th className="p-4 text-right">Actions</th></tr></thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.id} className="border-b">
                    <td className="p-4">{item.${ent.fields[0]}}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => router.push(\`/admin/${ent.route}/\${item.id}\`)} className="mr-4 text-blue-600"><Edit2 size={16}/></button>
                      <button onClick={() => setDeleteModal({ isOpen: true, id: item.id })} className="text-red-600"><Trash2 size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <DeleteModal isOpen={deleteModal.isOpen} onClose={() => setDeleteModal({ isOpen: false, id: null })} onConfirm={handleDelete} title="Delete ${ent.name}" message="Are you sure?" isLoading={false} />
    </div>
  );
}
`;
  fs.writeFileSync(path.join(entityDir, 'page.tsx'), listCode);

  // 2. Create Page
  const createCode = `'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Header from '../../../components/Header';
import { ${ent.api} } from '@/lib/api';

export default function Create${ent.name}Page() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await ${ent.api}.create(data);
      router.push('/admin/${ent.route}');
    } catch (e) {} finally { setLoading(false); }
  };

  return (
    <div>
      <Header title="Create ${ent.name}" subtitle="Add new ${ent.name.toLowerCase()}" />
      <div className="p-8 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
          ${ent.fields.map(f => `<div><label className="block mb-1 capitalize">${f.replace('_', ' ')}</label><input {...register('${f}')} className="w-full p-2 border rounded" /></div>`).join('\n          ')}
          <button type="submit" disabled={loading} className="px-4 py-2 bg-[#3c45b9] text-white rounded">{loading ? 'Saving...' : 'Save'}</button>
        </form>
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(createDir, 'page.tsx'), createCode);

  // 3. Edit Page
  const editCode = `'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Header from '../../../components/Header';
import { ${ent.api} } from '@/lib/api';

export default function Edit${ent.name}Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ${ent.api}.getById(parseInt(resolvedParams.id)).then(reset);
  }, [resolvedParams.id, reset]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await ${ent.api}.update(parseInt(resolvedParams.id), data);
      router.push('/admin/${ent.route}');
    } catch (e) {} finally { setLoading(false); }
  };

  return (
    <div>
      <Header title="Edit ${ent.name}" subtitle="Update ${ent.name.toLowerCase()}" />
      <div className="p-8 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
          ${ent.fields.map(f => `<div><label className="block mb-1 capitalize">${f.replace('_', ' ')}</label><input {...register('${f}')} className="w-full p-2 border rounded" /></div>`).join('\n          ')}
          <button type="submit" disabled={loading} className="px-4 py-2 bg-[#3c45b9] text-white rounded">{loading ? 'Saving...' : 'Save'}</button>
        </form>
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(editDir, 'page.tsx'), editCode);
});
