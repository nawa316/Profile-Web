'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Header from '../../../components/Header';
import { skillApi } from '@/lib/api';
import { ArrowLeft, Save, Code2 } from 'lucide-react';

export default function EditSkillPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string, 10);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image: '',
    imageFile: null as File | null,
  });

  useEffect(() => {
    fetchSkill();
  }, [id]);

  const fetchSkill = async () => {
    try {
      const skill = await skillApi.getById(id);
      setFormData({
        name: skill.name,
        category: skill.category || '',
        image: skill.image || '',
        imageFile: null,
      });
    } catch (error) {
      console.error('Failed to fetch skill:', error);
      alert('Failed to load skill data');
      router.push('/admin/skills');
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = formData.image;

      if (formData.imageFile) {
        const uploadData = new FormData();
        uploadData.append('file', formData.imageFile);
        uploadData.append('bucket', 'skills');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });

        const data = await res.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to upload image');
        }
        imageUrl = data.url;
      }

      const payload = {
        name: formData.name,
        category: formData.category || 'Other',
        image: imageUrl || null,
      };

      await skillApi.update(id, payload);
      router.push('/admin/skills');
    } catch (error: any) {
      console.error('Failed to update skill:', error);
      alert('Failed to update skill: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div>
        <Header title="Edit Skill" subtitle="Loading..." />
        <div className="p-8 text-center text-gray-500">Loading skill details...</div>
      </div>
    );
  }

  return (
    <div>
      <Header title="Edit Skill" subtitle={`Editing: ${formData.name}`} />
      
      <div className="p-8">
        <div className="max-w-xl">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Skills</span>
          </button>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c45b9] focus:border-[#3c45b9] outline-none"
                  placeholder="Enter skill name (e.g., React, TypeScript)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c45b9] focus:border-[#3c45b9] outline-none bg-white"
                >
                  <option value="" disabled>Select category</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Tools">Tools</option>
                  <option value="Design">Design</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Logo / Image
                </label>
                
                {formData.image && (
                  <div className="mb-3 flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50 max-w-xs">
                    <div className="w-12 h-12 rounded bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                      <img src={formData.image} alt="Current logo" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xs text-gray-500 truncate max-w-[180px]">{formData.image.split('/').pop()}</span>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFormData(prev => ({ ...prev, imageFile: e.target.files![0] }));
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c45b9] focus:border-[#3c45b9] outline-none"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Select a new image file only if you wish to change the current one.
                </p>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-2 bg-[#3c45b9] text-white rounded-lg hover:bg-[#483D8B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={20} />
                  <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
