'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Header from '../../../components/Header';
import { achievementApi } from '@/lib/api';

export default function CreateAchievementPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await achievementApi.create(data);
      router.push('/admin/achievements');
    } catch (e) {} finally { setLoading(false); }
  };

  return (
    <div>
      <Header title="Create Achievement" subtitle="Add new achievement" />
      <div className="p-8 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div><label className="block mb-1 capitalize">title</label><input {...register('title')} className="w-full p-2 border rounded" /></div>
          <div><label className="block mb-1 capitalize">description</label><input {...register('description')} className="w-full p-2 border rounded" /></div>
          <div><label className="block mb-1 capitalize">year</label><input {...register('year')} className="w-full p-2 border rounded" /></div>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-[#3c45b9] text-white rounded">{loading ? 'Saving...' : 'Save'}</button>
        </form>
      </div>
    </div>
  );
}
