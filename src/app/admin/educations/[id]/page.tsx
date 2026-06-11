'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Header from '../../../components/Header';
import { educationApi } from '@/lib/api';

export default function EditEducationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    educationApi.getById(parseInt(resolvedParams.id)).then(reset);
  }, [resolvedParams.id, reset]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await educationApi.update(parseInt(resolvedParams.id), data);
      router.push('/admin/educations');
    } catch (e) {} finally { setLoading(false); }
  };

  return (
    <div>
      <Header title="Edit Education" subtitle="Update education" />
      <div className="p-8 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div><label className="block mb-1 capitalize">institution</label><input {...register('institution')} className="w-full p-2 border rounded" /></div>
          <div><label className="block mb-1 capitalize">degree</label><input {...register('degree')} className="w-full p-2 border rounded" /></div>
          <div><label className="block mb-1 capitalize">major</label><input {...register('major')} className="w-full p-2 border rounded" /></div>
          <div><label className="block mb-1 capitalize">start date</label><input {...register('start_date')} className="w-full p-2 border rounded" /></div>
          <div><label className="block mb-1 capitalize">end date</label><input {...register('end_date')} className="w-full p-2 border rounded" /></div>
          <div><label className="block mb-1 capitalize">gpa</label><input {...register('gpa')} className="w-full p-2 border rounded" /></div>
          <div><label className="block mb-1 capitalize">description</label><input {...register('description')} className="w-full p-2 border rounded" /></div>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-[#3c45b9] text-white rounded">{loading ? 'Saving...' : 'Save'}</button>
        </form>
      </div>
    </div>
  );
}
