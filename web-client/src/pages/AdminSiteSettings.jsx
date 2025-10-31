import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import api from '../utils/api';

const AdminSiteSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const res = await api.get('/api/admin/site-settings', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setSettings(res.data);
      } catch {
        setError('Ayarlar yüklenemedi.');
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true); setMsg(''); setError('');
    try {
      await api.put('/api/admin/site-settings', settings, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMsg('Ayarlar kaydedildi.');
    } catch {
      setError('Ayarlar kaydedilemedi.');
    }
    setSaving(false);
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl flex flex-col gap-4">
      <h2 className="text-xl font-bold text-blue-700 mb-2">Site Ayarları</h2>
      <label className="font-semibold">Site Başlığı</label>
      <input type="text" className="p-2 border rounded" value={settings.siteTitle || ''} onChange={e => handleChange('siteTitle', e.target.value)} />
      <label className="font-semibold">SEO Başlığı</label>
      <input type="text" className="p-2 border rounded" value={settings.seoTitle || ''} onChange={e => handleChange('seoTitle', e.target.value)} />
      <label className="font-semibold">SEO Açıklaması</label>
      <textarea className="p-2 border rounded" value={settings.seoDescription || ''} onChange={e => handleChange('seoDescription', e.target.value)} rows={2} />
      <label className="font-semibold">SEO Anahtar Kelimeler</label>
      <input type="text" className="p-2 border rounded" value={settings.seoKeywords || ''} onChange={e => handleChange('seoKeywords', e.target.value)} />
      <label className="font-semibold">Logo URL</label>
      <input type="text" className="p-2 border rounded" value={settings.logoUrl || ''} onChange={e => handleChange('logoUrl', e.target.value)} />
      <label className="font-semibold">Favicon URL</label>
      <input type="text" className="p-2 border rounded" value={settings.faviconUrl || ''} onChange={e => handleChange('faviconUrl', e.target.value)} />
      <label className="font-semibold">İletişim E-posta</label>
      <input type="email" className="p-2 border rounded" value={settings.contactEmail || ''} onChange={e => handleChange('contactEmail', e.target.value)} />
      <label className="font-semibold">Footer Metni</label>
      <input type="text" className="p-2 border rounded" value={settings.footerText || ''} onChange={e => handleChange('footerText', e.target.value)} />
      <button onClick={handleSave} className="bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition disabled:opacity-60" disabled={saving}>Kaydet</button>
      {msg && <div className="text-green-600 text-center">{msg}</div>}
      {error && <div className="text-red-600 text-center">{error}</div>}
    </div>
  );
};

export default AdminSiteSettings;