import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import api from '../utils/api';

const PAGES = [
  { key: 'about', label: 'Hakkımızda' },
  { key: 'services_info', label: 'Hizmetler' },
  { key: 'contact', label: 'İletişim' }
];

const AdminStaticPages = () => {
  const [pages, setPages] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          PAGES.map(p => api.get(`/api/static-pages/${p.key}`))
        );
        const data = {};
        results.forEach((res, i) => {
          data[PAGES[i].key] = res.data;
        });
        setPages(data);
      } catch (err) {
        setError('İçerikler yüklenemedi.');
      }
      setLoading(false);
    };
    fetchPages();
  }, []);

  const handleChange = (key, field, value) => {
    setPages(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: value }
    }));
  };

  const handleSave = async (key) => {
    setSaving(true); setMsg(''); setError('');
    try {
      await api.put(`/api/admin/static-pages/${key}`, {
        title: pages[key].title,
        content: pages[key].content
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMsg('Başarıyla kaydedildi.');
    } catch (err) {
      setError('Kaydedilemedi.');
    }
    setSaving(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-green-50 px-4 py-16">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">Statik Sayfa İçerik Yönetimi</h1>
      {PAGES.map(p => (
        <div key={p.key} className="bg-white rounded-2xl shadow-xl p-8 mb-8 w-full max-w-2xl flex flex-col gap-4">
          <h2 className="text-xl font-bold text-blue-700 mb-2">{p.label}</h2>
          <input
            type="text"
            className="p-3 border rounded font-semibold"
            value={pages[p.key]?.title || ''}
            onChange={e => handleChange(p.key, 'title', e.target.value)}
            placeholder="Başlık"
          />
          <textarea
            className="p-3 border rounded min-h-[120px]"
            value={pages[p.key]?.content || ''}
            onChange={e => handleChange(p.key, 'content', e.target.value)}
            placeholder="İçerik"
            rows={6}
          />
          <button
            onClick={() => handleSave(p.key)}
            className="bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition disabled:opacity-60"
            disabled={saving}
          >Kaydet</button>
        </div>
      ))}
      {msg && <div className="text-green-600 text-center mb-2">{msg}</div>}
      {error && <div className="text-red-600 text-center mb-2">{error}</div>}
    </div>
  );
};

export default AdminStaticPages;