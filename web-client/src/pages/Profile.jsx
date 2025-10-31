import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import api from '../utils/api';

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  const { data: user, loading: loadingUser } = useFetch('/api/user/profile');
  const { data: bookings, loading: loadingBookings } = useFetch('/api/user/bookings');
  const { data: myReviews, loading: loadingReviews, error: errorReviews } = useFetch(user ? `/api/reviews?userId=${user.id}` : null);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [showProviderForm, setShowProviderForm] = useState(false);
  const [bio, setBio] = useState('');
  const [expertise, setExpertise] = useState('');
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const [provider, setProvider] = useState(null);
  const [providerLoading, setProviderLoading] = useState(true);

  const [filterText, setFilterText] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [tab, setTab] = useState('profile');
  const [filterRating, setFilterRating] = useState('');

  useEffect(() => {
    const fetchProvider = async () => {
      setProviderLoading(true);
      try {
        const res = await api.get('/api/providers', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const myProvider = res.data.find(p => p.user?.id === user.id);
        setProvider(myProvider || null);
      } catch {
        setProvider(null);
      }
      setProviderLoading(false);
    };
    if (user) fetchProvider();
  }, [user]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMsg('');
    setPasswordError('');
    try {
      await api.put('/api/user/password', {
        currentPassword,
        newPassword
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPasswordMsg('Şifre başarıyla değiştirildi.');
      setCurrentPassword('');
      setNewPassword('');
      setShowPasswordForm(false);
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Şifre değiştirilemedi.');
    }
  };

  const handleProviderApply = async (e) => {
    e.preventDefault();
    setMsg(''); setError('');
    try {
      const formData = new FormData();
      formData.append('bio', bio);
      formData.append('expertise', expertise);
      if (file) formData.append('file', file);
      await api.post('/api/providers/apply', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMsg('Başvurunuz alınmıştır, admin onayından sonra aktifleşecektir.');
      setShowProviderForm(false);
    } catch {
      setError('Başvuru gönderilemedi.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-green-50 px-4 py-16">
      <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center mb-8 w-full max-w-xl">
        <div className="flex gap-4 mb-4">
          <button onClick={() => setTab('profile')} className={`px-4 py-2 rounded ${tab === 'profile' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Profil</button>
          <button onClick={() => setTab('reviews')} className={`px-4 py-2 rounded ${tab === 'reviews' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Yorumlarım</button>
        </div>
        {tab === 'profile' && (
          <>
            <h1 className="text-2xl font-bold text-blue-800 mb-2">Profilim</h1>
            {loadingUser ? (
              <div>Yükleniyor...</div>
            ) : user ? (
              <>
                <div className="font-semibold text-lg mb-1">{user.name}</div>
                <div className="text-gray-600 mb-2">{user.email}</div>
                <div className="text-xs text-gray-400 mb-4">Rol: {user.role}</div>
                <button onClick={() => setShowPasswordForm(!showPasswordForm)} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Şifre Değiştir</button>
                {showPasswordForm && (
                  <form onSubmit={handlePasswordChange} className="mt-4 w-full max-w-xs flex flex-col gap-3">
                    <input type="password" placeholder="Mevcut Şifre" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="p-2 border rounded" required />
                    <input type="password" placeholder="Yeni Şifre" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="p-2 border rounded" required />
                    <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">Kaydet</button>
                    {passwordMsg && <div className="text-green-600 text-center">{passwordMsg}</div>}
                    {passwordError && <div className="text-red-600 text-center">{passwordError}</div>}
                  </form>
                )}
                {user.role === 'user' && !provider && (
                  <div className="my-6">
                    {!showProviderForm ? (
                      <button onClick={() => setShowProviderForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Sağlayıcı Başvurusu Yap</button>
                    ) : (
                      <form onSubmit={handleProviderApply} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 mt-4 max-w-md">
                        <label className="font-semibold">Biyografi</label>
                        <textarea value={bio} onChange={e => setBio(e.target.value)} className="border rounded p-2" required rows={3} />
                        <label className="font-semibold">Uzmanlık</label>
                        <input value={expertise} onChange={e => setExpertise(e.target.value)} className="border rounded p-2" required />
                        <label className="font-semibold">Belge (opsiyonel)</label>
                        <input type="file" onChange={e => setFile(e.target.files[0])} />
                        <button type="submit" className="bg-green-600 text-white py-2 rounded">Başvuruyu Gönder</button>
                        {msg && <div className="text-green-600">{msg}</div>}
                        {error && <div className="text-red-600">{error}</div>}
                      </form>
                    )}
                  </div>
                )}
                {provider && (
                  <div className="my-6 bg-white rounded-xl shadow p-6 max-w-md">
                    <div className="mb-2 font-semibold">Sağlayıcı Başvuru Durumu: {provider.isVerified ? <span className="text-green-600">Onaylı</span> : <span className="text-yellow-600">Onay Bekliyor</span>}</div>
                    <div className="mb-2">Biyografi: {provider.bio}</div>
                    <div className="mb-2">Uzmanlık: {provider.expertise}</div>
                    {provider.isVerified && (
                      <a href="/provider-panel" className="bg-blue-600 text-white px-4 py-2 rounded inline-block mt-2">Sağlayıcı Paneline Git</a>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-red-500">Kullanıcı bulunamadı.</div>
            )}
          </>
        )}
        {tab === 'reviews' && (
          <div className="w-full">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Yorumlarım</h2>
            <div className="flex gap-2 mb-4">
              <input type="text" placeholder="Yorumda ara..." value={filterText} onChange={e => setFilterText(e.target.value)} className="border rounded p-2 flex-1" />
              <select value={filterRating} onChange={e => setFilterRating(e.target.value)} className="border rounded p-2">
                <option value="">Tüm Puanlar</option>
                {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} ★</option>)}
              </select>
            </div>
            {loadingReviews ? <div>Yükleniyor...</div> : errorReviews ? <div className="text-red-500">Yorumlar alınamadı.</div> : myReviews && myReviews.length > 0 ? (
              <ul className="space-y-4">
                {myReviews.filter(r =>
                  (!filterText || (r.comment || '').toLowerCase().includes(filterText.toLowerCase())) &&
                  (!filterRating || r.rating === Number(filterRating))
                ).map((r, i) => (
                  <li key={i} className="border rounded-xl p-4 flex flex-col gap-1 bg-gray-50">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-purple-700">{r.service?.title}</span>
                      <span className="text-yellow-500 font-bold">{'★'.repeat(r.rating)}</span>
                    </div>
                    <div className="text-gray-700 mb-1">{r.comment}</div>
                    <div className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString('tr-TR')}</div>
                  </li>
                ))}
              </ul>
            ) : <div className="text-gray-500">Henüz yorumunuz yok.</div>}
          </div>
        )}
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Randevularım</h2>
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
        {loadingBookings ? (
          <div>Yükleniyor...</div>
        ) : bookings && bookings.length > 0 ? (
          <ul className="space-y-4">
            {bookings.filter(b =>
              (!filterText || (b.providerService?.title || '').toLowerCase().includes(filterText.toLowerCase())) &&
              (!filterStatus || b.status === filterStatus) &&
              (!filterDate || new Date(b.date).toISOString().slice(0,10) === filterDate)
            ).map((b, i) => (
              <li key={i} className="border rounded-xl p-4 flex flex-col gap-1">
                <div className="font-semibold">{b.providerService?.title}</div>
                <div className="text-gray-600 text-sm">Sağlayıcı: {b.provider?.user?.name}</div>
                <div className="text-gray-500 text-xs">Tarih: {new Date(b.date).toLocaleString('tr-TR')}</div>
                <div className="text-xs text-blue-700">Durum: {b.status}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">Henüz randevunuz yok.</div>
        )}
      </div>
    </div>
  );
};

export default Profile;