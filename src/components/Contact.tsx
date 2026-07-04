'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { sendEmail } from '@/utils/send-email';

export type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
      <div className='mb-5'>
        <label
          htmlFor='name'
          className='mb-2 block text-sm font-semibold text-slate-600 uppercase tracking-wide'
        >
          Full Name
        </label>
        <input
          type='text'
          placeholder='Full Name'
          className='w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-5 text-base text-slate-700 outline-none focus:border-[#6b8af6] focus:ring-2 focus:ring-[#6b8af6]/20 transition-all'
          {...register('name', { required: true })}
        />
      </div>
      <div className='mb-5'>
        <label
          htmlFor='email'
          className='mb-2 block text-sm font-semibold text-slate-600 uppercase tracking-wide'
        >
          Email Address
        </label>
        <input
          type='email'
          placeholder='example@domain.com'
          className='w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-5 text-base text-slate-700 outline-none focus:border-[#6b8af6] focus:ring-2 focus:ring-[#6b8af6]/20 transition-all'
          {...register('email', { required: true })}
        />
      </div>
      <div className='mb-6'>
        <label
          htmlFor='message'
          className='mb-2 block text-sm font-semibold text-slate-600 uppercase tracking-wide'
        >
          Message
        </label>
        <textarea
          rows={5}
          placeholder='Type your message here...'
          className='w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3 px-5 text-base text-slate-700 outline-none focus:border-[#6b8af6] focus:ring-2 focus:ring-[#6b8af6]/20 transition-all'
          {...register('message', { required: true })}
        ></textarea>
      </div>
      <div>
        <button className='w-full rounded-xl bg-[#6b8af6] py-3 px-8 text-base font-semibold text-white shadow-md shadow-[#6b8af6]/20 hover:bg-[#5271df] hover:shadow-lg hover:shadow-[#6b8af6]/30 hover:-translate-y-0.5 transition-all duration-300 outline-none'>
          Kirim Pesan
        </button>
      </div>
    </form>
  );
};

export default Contact;