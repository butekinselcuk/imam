import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import api from '../utils/api';
import Select from 'react-select';

const genderOptions = [
  { value: 'Erkek', label: 'Erkek' },
  { value: 'Kadın', label: 'Kadın' },
  { value: 'Belirtilmedi', label: 'Belirtilmedi' }
];
const reviewLevelOptions = [
  { value: 'Başlangıç', label: 'Başlangıç' },
  { value: 'Orta seviye', label: 'Orta seviye' },
  { value: 'Uzman', label: 'Uzman' }
];
const defaultMultiOptions = arr => arr ? arr.map(x => ({ value: x, label: x })) : [];

const ProviderProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  // Çoklu seçimler için state
  const [languages, setLanguages] = useState([]);
  const [methods, setMethods] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [target, setTarget] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    api.get('/api/providers/me', {
           headers: {
             Authorization: `Bearer ${localStorage.getItem('token')}`,
             providerid: localStorage.getItem('providerId')
           }
         })
      .then(res => {
        setProfile(res.data);
        setLanguages(defaultMultiOptions(res.data.languages));
        setMethods(defaultMultiOptions(res.data.methods));
        setQualifications(defaultMultiOptions(res.data.qualifications));
        setTarget(defaultMultiOptions(res.data.target));
        setLoading(false);
      });
  }, []);

  // ProviderId yoksa çek ve kaydet
  useEffect(() => {
    if (!localStorage.getItem('providerId')) {
      api.get('/api/providers').then(res => {
        const user = JSON.parse(localStorage.getItem('user'));
        const me = res.data.find(p => p.userId === user.id);
        if (me) {
          localStorage.setItem('providerId', me.id);
          window.location.reload();
        }
      });
    }
  }, []);

  const handleChange = e => setProfile({ ...profile, [e.target.name]: e.target.value });
  const handleSelect = (setter) => (selected) => setter(selected);
  const handleImage = e => setImageFile(e.target.files[0]);

  const handleSave = async e => {
    e.preventDefault();
    setMsg('');
    const data = {
      ...profile,
      languages: languages.map(x => x.value),
      methods: methods.map(x => x.value),
      qualifications: qualifications.map(x => x.value),
      target: target.map(x => x.value)
    };
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, Array.isArray(v) ? JSON.stringify(v) : v));
    if (imageFile) formData.append('image', imageFile);
    try {
      await api.put('/api/providers/profile', formData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setMsg('Profil güncellendi.');
    } catch {
      setMsg('Profil güncellenemedi.');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-green-50 px-2 sm:px-4 py-10">
      <form onSubmit={handleSave} className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-blue-800 mb-2">Profil Bilgilerim</h1>
        {/* Temel Bilgiler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold">Ad Soyad</label>
            <input name="name" value={profile.user?.name || ''} onChange={e => setProfile({ ...profile, user: { ...profile.user, name: e.target.value } })} className="border rounded p-2 w-full" />
          </div>
          <div>
            <label className="font-semibold">E-posta</label>
            <input name="email" value={profile.user?.email || ''} onChange={e => setProfile({ ...profile, user: { ...profile.user, email: e.target.value } })} className="border rounded p-2 w-full" />
          </div>
        </div>
        {/* Kişisel Bilgiler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold">Doğum Tarihi</label>
            <input name="birthDate" type="date" value={profile.birthDate || ''} onChange={handleChange} className="border rounded p-2 w-full" />
          </div>
          <div>
            <label className="font-semibold">Cinsiyet</label>
            <Select options={genderOptions} value={genderOptions.find(opt => opt.value === profile.gender)} onChange={opt => setProfile({ ...profile, gender: opt?.value })} isClearable />
          </div>
        </div>
        {/* Diller, Yöntemler, Nitelikler, Hedef Kitle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold">Diller</label>
            <Select isMulti options={languages} value={languages} onChange={handleSelect(setLanguages)} placeholder="Dilleri seçin veya yazın" isClearable isSearchable />
          </div>
          <div>
            <label className="font-semibold">Yöntemler</label>
            <Select isMulti options={methods} value={methods} onChange={handleSelect(setMethods)} placeholder="Yöntemleri seçin veya yazın" isClearable isSearchable />
          </div>
          <div>
            <label className="font-semibold">Nitelikler</label>
            <Select isMulti options={qualifications} value={qualifications} onChange={handleSelect(setQualifications)} placeholder="Nitelikleri seçin veya yazın" isClearable isSearchable />
          </div>
          <div>
            <label className="font-semibold">Hedef Kitle</label>
            <Select isMulti options={target} value={target} onChange={handleSelect(setTarget)} placeholder="Hedef kitleyi seçin veya yazın" isClearable isSearchable />
          </div>
        </div>
        {/* Diğer Bilgiler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold">İnceleme Seviyesi</label>
            <Select options={reviewLevelOptions} value={reviewLevelOptions.find(opt => opt.value === profile.reviewLevel)} onChange={opt => setProfile({ ...profile, reviewLevel: opt?.value })} isClearable />
          </div>
          <div>
            <label className="font-semibold">Hizmetlerde (Yıl)</label>
            <input name="servicesYear" value={profile.servicesYear || ''} onChange={handleChange} className="border rounded p-2 w-full" />
          </div>
        </div>
        {/* Adres Bilgileri */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold">Şehir</label>
            <input name="city" value={profile.city || ''} onChange={handleChange} className="border rounded p-2 w-full" />
          </div>
          <div>
            <label className="font-semibold">Ülke</label>
            <input name="country" value={profile.country || ''} onChange={handleChange} className="border rounded p-2 w-full" />
          </div>
          <div className="md:col-span-2">
            <label className="font-semibold">Adres</label>
            <input name="address" value={profile.address || ''} onChange={handleChange} className="border rounded p-2 w-full" />
          </div>
        </div>
        {/* Görsel Yükleme */}
        <div className="flex flex-col items-center">
          <label className="font-semibold mb-2">Profil Fotoğrafı</label>
          <input type="file" accept="image/*" onChange={handleImage} className="mb-2" />
          {profile.image && <img src={profile.image} alt="Profil" className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 shadow" />}
        </div>
        <button type="submit" className="bg-blue-600 text-white py-3 rounded-xl font-bold text-lg mt-4">Kaydet</button>
        {msg && <div className="text-green-600 mt-2">{msg}</div>}
      </form>
    </div>
  );
};

export default ProviderProfile;