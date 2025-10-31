import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const genderOptions = ['Erkek', 'Kadın', 'Belirtilmedi'];
const reviewLevelOptions = ['Başlangıç', 'Orta seviye', 'Uzman'];

const ProviderPanel = () => {
  const [categories, setCategories] = useState([]);
  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [method, setMethod] = useState('');
  const [target, setTarget] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingMsg, setBookingMsg] = useState('');
  const [title, setTitle] = useState('');
  const { user } = useAuthContext();
  const [providerId, setProviderId] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [languages, setLanguages] = useState('');
  const [methods, setMethods] = useState('');
  const [gender, setGender] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [reviewLevel, setReviewLevel] = useState('');
  const [servicesYear, setServicesYear] = useState('');
  const [profileMsg, setProfileMsg] = useState('');
  const navigate = useNavigate();

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [catRes, servRes] = await Promise.all([
        api.get('/api/categories'),
        api.get('/api/providers/my-services', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      ]);
      setCategories(catRes.data);
      setMyServices(servRes.data);
    } catch {
      setError('Veriler yüklenemedi.');
    }
    setLoading(false);
  };

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      console.log('fetchBookings providerId:', providerId);
      if (!providerId) return setBookings([]);
      const res = await api.get(`/api/providers/bookings?providerId=${providerId}`);
      console.log('fetchBookings response:', res.data);
      setBookings(res.data);
    } catch {
      setBookings([]);
    }
    setLoadingBookings(false);
  };

  useEffect(() => {
    fetchAll();
    // Sağlayıcı id'sini backend'den çek
    if (user) {
      api.get('/api/providers').then(res => {
        const me = res.data.find(p => p.userId === user.id);
        if (me) {
          setProviderId(me.id);
          localStorage.setItem('providerId', me.id); // providerId localStorage'a kaydet
          setLanguages(me.languages ? me.languages.join(', ') : '');
          setMethods(me.methods ? me.methods.join(', ') : '');
          setGender(me.gender || '');
          setQualifications(me.qualifications ? me.qualifications.join(', ') : '');
          setTarget(me.target ? me.target.join(', ') : '');
          setReviewLevel(me.reviewLevel || '');
          setServicesYear(me.servicesYear || '');
        }
      });
    }
  }, [user]);

  // providerId değişince rezervasyonları çek
  useEffect(() => {
    if (providerId) fetchBookings();
  }, [providerId]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setMsg(''); setError('');
    try {
      await api.post('/api/providers/services', { categoryId, price, description: desc, method, target, title }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMsg('Hizmet eklendi.');
      setCategoryId(''); setPrice(''); setDesc(''); setMethod(''); setTarget(''); setTitle('');
      fetchAll();
    } catch {
      setError('Hizmet eklenemedi.');
    }
  };

  const handleBookingAction = async (id, status) => {
    setBookingMsg('');
    try {
      await api.put(`/api/providers/bookings/${id}`, { status });
      setBookingMsg('Rezervasyon güncellendi.');
      fetchBookings();
    } catch {
      setBookingMsg('Rezervasyon güncellenemedi.');
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileMsg('');
    try {
      await api.put('/api/providers/profile', {
        languages: languages.split(',').map(s => s.trim()).filter(Boolean),
        methods: methods.split(',').map(s => s.trim()).filter(Boolean),
        gender,
        qualifications: qualifications.split(',').map(s => s.trim()).filter(Boolean),
        target: target.split(',').map(s => s.trim()).filter(Boolean),
        reviewLevel,
        servicesYear
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProfileMsg('Profil güncellendi.');
    } catch {
      setProfileMsg('Profil güncellenemedi.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-green-50 px-4 py-16">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Sağlayıcı Paneli</h1>
      <button className="bg-blue-600 text-white py-2 px-6 rounded mb-6" onClick={() => navigate('/provider-profile')}>Profilimi Düzenle</button>
      <form onSubmit={handleAdd} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 mb-8 max-w-md w-full">
        <h2 className="font-semibold text-lg">Hizmet Ekle</h2>
        <input value={title} onChange={e => setTitle(e.target.value)} className="border rounded p-2" placeholder="Hizmet Adı (örn. Aile Terapisi)" required />
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="border rounded p-2" required>
          <option value="">Kategori/Hizmet Başlığı Seç</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input value={price} onChange={e => setPrice(e.target.value)} className="border rounded p-2" placeholder="Fiyat (₺)" required type="number" min="0" />
        <textarea value={desc} onChange={e => setDesc(e.target.value)} className="border rounded p-2" placeholder="Açıklama" required rows={3} />
        <input value={method} onChange={e => setMethod(e.target.value)} className="border rounded p-2" placeholder="Yöntem (örn. Çevrim içi, Şahsen)" />
        <input value={target} onChange={e => setTarget(e.target.value)} className="border rounded p-2" placeholder="Hedef Kitle (örn. Yetişkin, Çocuk)" />
        <button type="submit" className="bg-green-600 text-white py-2 rounded">Ekle</button>
        {msg && <div className="text-green-600">{msg}</div>}
        {error && <div className="text-red-600">{error}</div>}
      </form>
      <div className="bg-white rounded-xl shadow p-6 max-w-2xl w-full mb-8">
        <h2 className="font-semibold text-lg mb-4">Eklediğim Hizmetler</h2>
        {loading ? <div>Yükleniyor...</div> : (
          <ul>
            {myServices.map(s => (
              <li key={s.id} className="border-b py-2">
                {categories.find(c => c.id === s.categoryId)?.name} - {s.price}₺ - {s.description} - {s.method} - {s.target}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="bg-white rounded-xl shadow p-6 max-w-3xl w-full">
        <h2 className="font-semibold text-lg mb-4">Rezervasyonlarım</h2>
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input type="text" placeholder="Hizmet adı ara..." value={filterText} onChange={e => setFilterText(e.target.value)} className="border rounded p-2 flex-1" />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border rounded p-2">
            <option value="">Tüm Durumlar</option>
            <option value="pending">Bekliyor</option>
            <option value="approved">Onaylandı</option>
            <option value="declined">Reddedildi</option>
            <option value="completed">Tamamlandı</option>
          </select>
          <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="border rounded p-2" />
        </div>
        {loadingBookings ? <div>Yükleniyor...</div> : bookings.length === 0 ? <div>Rezervasyon yok.</div> : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2">Kullanıcı</th>
                <th>Hizmet</th>
                <th>Tarih</th>
                <th>Durum</th>
                <th>Aksiyon</th>
              </tr>
            </thead>
            <tbody>
              {bookings.filter(b =>
                (!filterText || (b.providerService?.title || '').toLowerCase().includes(filterText.toLowerCase())) &&
                (!filterStatus || b.status === filterStatus) &&
                (!filterDate || new Date(b.date).toISOString().slice(0,10) === filterDate)
              ).map(b => (
                <tr key={b.id} className="border-b">
                  <td className="py-2">{b.user?.name}</td>
                  <td>{b.providerService?.title || '-'}</td>
                  <td>{new Date(b.date).toLocaleString('tr-TR')}</td>
                  <td>{b.status}</td>
                  <td>
                    {b.status === 'pending' && (
                      <>
                        <button onClick={() => handleBookingAction(b.id, 'approved')} className="bg-green-600 text-white px-2 py-1 rounded mr-2">Onayla</button>
                        <button onClick={() => handleBookingAction(b.id, 'declined')} className="bg-red-600 text-white px-2 py-1 rounded">Reddet</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {bookingMsg && <div className="text-green-600 mt-2">{bookingMsg}</div>}
      </div>
    </div>
  );
};

export default ProviderPanel;