'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { sendEmail } from '@/utils/send-email';
import { useLanguage } from "@/context/LanguageContext";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact: FC = () => {
  const { t } = useLanguage();
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
          {t("form.name")}
        </label>
        <input
          type='text'
          placeholder={t("form.placeholder.name")}
          className='w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-5 text-base text-slate-700 outline-none focus:border-[#6b8af6] focus:ring-2 focus:ring-[#6b8af6]/20 transition-all'
          {...register('name', { required: true })}
        />
      </div>
      <div className='mb-5'>
        <label
          htmlFor='email'
          className='mb-2 block text-sm font-semibold text-slate-600 uppercase tracking-wide'
        >
          {t("form.email")}
        </label>
        <input
          type='email'
          placeholder={t("form.placeholder.email")}
          className='w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-5 text-base text-slate-700 outline-none focus:border-[#6b8af6] focus:ring-2 focus:ring-[#6b8af6]/20 transition-all'
          {...register('email', { required: true })}
        />
      </div>
      <div className='mb-6'>
        <label
          htmlFor='message'
          className='mb-2 block text-sm font-semibold text-slate-600 uppercase tracking-wide'
        >
          {t("form.message")}
        </label>
        <textarea
          rows={5}
          placeholder={t("form.placeholder.message")}
          className='w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3 px-5 text-base text-slate-700 outline-none focus:border-[#6b8af6] focus:ring-2 focus:ring-[#6b8af6]/20 transition-all'
          {...register('message', { required: true })}
        ></textarea>
      </div>
      <div>
        <button className='w-full rounded-xl bg-[#6b8af6] py-3 px-8 text-base font-semibold text-white shadow-md shadow-[#6b8af6]/20 hover:bg-[#5271df] hover:shadow-lg hover:shadow-[#6b8af6]/30 hover:-translate-y-0.5 transition-all duration-300 outline-none'>
          {t("btn.send")}
        </button>
      </div>
    </form>
  );
};

export default Contact;