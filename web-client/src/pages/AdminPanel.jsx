import React, { useState } from 'react';
import AdminStaticPages from './AdminStaticPages';
import AdminUsers from './AdminUsers';
import AdminSiteSettings from './AdminSiteSettings';
import AdminProviders from './AdminProviders';
import AdminReviews from './AdminReviews';
import AdminCategories from './AdminCategories';
import AdminReports from './AdminReports';
import AdminLogs from './AdminLogs';
import AdminBackup from './AdminBackup';

const MENU = [
  { key: 'site', label: 'Site Ayarları' },
  { key: 'content', label: 'İçerik Yönetimi' },
  { key: 'categories', label: 'Kategori Yönetimi' },
  { key: 'users', label: 'Kullanıcı Yönetimi' },
  { key: 'providers', label: 'Sağlayıcı Onaylama' },
  { key: 'reviews', label: 'Yorum Onaylama' },
  { key: 'reports', label: 'Raporlar' },
  { key: 'logs', label: 'Sistem Logları' },
  { key: 'backup', label: 'Veritabanı Yedekleme' }
];

const Placeholder = ({ label }) => (
  <div className="flex-1 flex flex-col items-center justify-center text-gray-500 text-xl">{label} ekranı yakında...</div>
);

const AdminPanel = () => {
  const [selected, setSelected] = useState('content');

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-green-50">
      {/* Sol Menü */}
      <aside className="w-64 bg-white shadow-xl flex flex-col py-8 px-4 gap-2">
        <h1 className="text-2xl font-bold text-blue-800 mb-8">Admin Paneli</h1>
        {MENU.map(m => (
          <button
            key={m.key}
            onClick={() => setSelected(m.key)}
            className={`text-left px-4 py-3 rounded font-semibold transition ${selected === m.key ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50 text-gray-700'}`}
          >
            {m.label}
          </button>
        ))}
      </aside>
      {/* İçerik Alanı */}
      <main className="flex-1 p-8">
        {selected === 'site' && <AdminSiteSettings />}
        {selected === 'content' && <AdminStaticPages />}
        {selected === 'categories' && <AdminCategories />}
        {selected === 'users' && <AdminUsers />}
        {selected === 'providers' && <AdminProviders />}
        {selected === 'reviews' && <AdminReviews />}
        {selected === 'reports' && <AdminReports />}
        {selected === 'logs' && <AdminLogs />}
        {selected === 'backup' && <AdminBackup />}
      </main>
    </div>
  );
};

export default AdminPanel;