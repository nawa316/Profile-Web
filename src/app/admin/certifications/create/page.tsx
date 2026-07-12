'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import { certificationApi } from '@/lib/api';
import { ArrowLeft, Save, FileText, X } from 'lucide-react';

export default function CreateCertificationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    date: '',
    expiry_date: '',
    description: '',
    credential_url: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      if (selected.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (ev) => setFilePreview(ev.target?.result as string);
        reader.readAsDataURL(selected);
      } else {
        setFilePreview(null);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let fileUrl = '';

      if (file) {
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('bucket', 'certifications');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });

        const data = await res.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to upload file');
        }
        fileUrl = data.url;
      }

      const payload = {
        name: formData.name,
        issuer: formData.issuer,
        date: formData.date,
        expiry_date: formData.expiry_date || null,
        description: formData.description || null,
        credential_url: formData.credential_url || null,
        file_url: fileUrl || null,
      };

      await certificationApi.create(payload);
      router.push('/admin/certifications');
    } catch (error: any) {
      console.error('Failed to create certification:', error);
      alert('Failed to create certification: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header title="Create Certification" subtitle="Add a new certification" />
      <div className="p-8 max-w-2xl">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Certifications</span>
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certification Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c45b9] focus:border-[#3c45b9] outline-none"
                placeholder="e.g., AWS Certified Solutions Architect"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issuer *
              </label>
              <input
                type="text"
                required
                value={formData.issuer}
                onChange={(e) => setFormData(prev => ({ ...prev, issuer: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c45b9] focus:border-[#3c45b9] outline-none"
                placeholder="e.g., Amazon Web Services"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c45b9] focus:border-[#3c45b9] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.expiry_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, expiry_date: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c45b9] focus:border-[#3c45b9] outline-none"
                />
                <p className="mt-1 text-xs text-gray-500">Leave empty if no expiry</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Credential URL
              </label>
              <input
                type="url"
                value={formData.credential_url}
                onChange={(e) => setFormData(prev => ({ ...prev, credential_url: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c45b9] focus:border-[#3c45b9] outline-none"
                placeholder="https://www.credential-url.com/verify/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c45b9] focus:border-[#3c45b9] outline-none"
                rows={3}
                placeholder="Brief description of the certification..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certificate File
              </label>
              {filePreview ? (
                <div className="relative inline-block">
                  <img src={filePreview} alt="Preview" className="max-h-40 rounded-lg border border-gray-200" />
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : file ? (
                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <FileText size={20} className="text-gray-500" />
                  <span className="text-sm text-gray-700 flex-1 truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c45b9] focus:border-[#3c45b9] outline-none"
                />
              )}
              <p className="mt-2 text-xs text-gray-500">
                Upload the certificate as an image (PNG, JPG) or PDF file.
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
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-[#3c45b9] text-white rounded-lg hover:bg-[#483D8B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                <span>{loading ? 'Saving...' : 'Create Certification'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
