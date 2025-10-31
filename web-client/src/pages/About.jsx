import React from 'react';
import useFetch from '../hooks/useFetch';

const About = () => {
  const { data: page, loading, error } = useFetch('/api/static-pages/about');
  const { data: siteSettings } = useFetch('/api/admin/site-settings');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 px-4 py-16">
      {loading ? (
        <div>Yükleniyor...</div>
      ) : error ? (
        <div className="text-red-500">Hakkımızda içeriği yüklenemedi.</div>
      ) : page ? (
        <>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">{page.title}</h1>
          <div className="text-lg text-gray-700 max-w-2xl text-center mb-6" dangerouslySetInnerHTML={{ __html: page.content }} />
          <div className="mt-8 text-gray-500 text-sm text-center max-w-xl">
            {siteSettings?.footerText || `© ${new Date().getFullYear()} ${siteSettings?.siteTitle || 'Hizmet Platformu'}. Tüm hakları saklıdır.`}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default About; 