import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useAuth from '../hooks/useAuth';
// import axios from 'axios';
import api from '../utils/api';

const tagClass = 'inline-block bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2';
const tagClassAlt = 'inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2';

const ProviderDetail = () => {
  const { id } = useParams();
  const { data: provider, loading, error } = useFetch(`/api/providers/${id}`);
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const { data: reviews, loading: loadingReviews, error: errorReviews } = useFetch(`/api/reviews?providerId=${id}`);
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loadingReserve, setLoadingReserve] = useState(false);
  // Mesajlaşma modalı ve durumları
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSending, setMessageSending] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState('');
  const [messageError, setMessageError] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [sort, setSort] = useState('date');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewServiceId, setReviewServiceId] = useState('');
  const [reviewMsg, setReviewMsg] = useState('');
  const [reviewError, setReviewError] = useState('');
  const { data: myBookings } = useFetch(user ? `/api/user/bookings` : null);
  const [imgError, setImgError] = useState(false);

  const handleReserve = (service) => {
    setSelectedService(service);
    setShowModal(true);
    setSuccessMsg('');
    setErrorMsg('');
    setDate('');
  };

  const submitReservation = async () => {
    if (!date) { setErrorMsg('Tarih seçmelisiniz.'); return; }
    setLoadingReserve(true);
    try {
      await api.post('/api/providers/bookings', {
        userId: user.id,
        providerId: provider.id,
        providerServiceId: selectedService.id,
        date
      });
      setSuccessMsg('Rezervasyon talebiniz iletildi, onay bekliyor.');
      setShowModal(false);
    } catch (err) {
      setErrorMsg('Rezervasyon oluşturulamadı.');
    } finally {
      setLoadingReserve(false);
    }
  };

  // Mesaj gönderme
  const sendMessage = async () => {
    if (!messageText.trim()) { setMessageError('Mesaj boş olamaz.'); return; }
    setMessageSending(true);
    setMessageError('');
    setMessageSuccess('');
    try {
      await api.post('/api/messages', {
        receiverId: provider?.user?.id,
        content: messageText.trim()
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Alıcıya bildirim
      await api.post('/api/providers/notifications', {
        providerId: provider.id,
        message: 'Yeni mesajınız var.'
      });
      // Gönderene de bilgi amaçlı bildirim
      await api.post('/api/providers/notifications', {
        userId: user.id,
        message: 'Mesajınız gönderildi.'
      });
      setMessageSuccess('Mesaj gönderildi.');
      setShowMessageModal(false);
      setMessageText('');
    } catch (err) {
      setMessageError('Mesaj gönderilemedi.');
    } finally {
      setMessageSending(false);
    }
  };

  // Kullanıcı daha önce yorum yaptı mı?
  const alreadyReviewed = user && reviews && reviews.some(r => r.user?.id === user.id);

  // Kullanıcının bu sağlayıcıdan onaylı/tamamlanmış rezervasyonları
  const eligibleServiceIds = myBookings ? myBookings.filter(b => b.providerId === provider.id && ['approved','completed'].includes(b.status)).map(b => b.providerServiceId).filter(Boolean) : [];

  if (loading) return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Sağlayıcı bulunamadı.</div>;
  if (!provider) return null;

  // Dummy örnek veri (gerçek projede provider'dan gelmeli)
  const exampleProfile = {
    location: provider.location || 'Konum yok',
    languages: provider.languages || ['Türkçe'],
    methods: provider.methods || ['Çevrim içi'],
    gender: provider.gender || 'Belirtilmedi',
    qualifications: provider.qualifications || ['Uzman'],
    target: provider.target || ['Yetişkin'],
    bio: provider.bio || 'Açıklama yok',
    image: provider.image,
    name: provider.user?.name || 'Sağlayıcı',
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-green-50 px-2 sm:px-4 py-10">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sol Blok */}
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center md:w-1/3 w-full mb-6 md:mb-0">
          {/* Avatar */}
          {(!imgError && !!exampleProfile.image && exampleProfile.image.trim() !== "") ? (
            <img
              src={exampleProfile.image}
              alt={exampleProfile.name}
              className="w-32 h-32 mb-4 rounded-full object-cover border-4 border-blue-200 shadow"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-32 h-32 mb-4 rounded-full flex items-center justify-center text-4xl font-bold text-white border-4 border-blue-200 shadow" style={{background: '#7c3aed'}}>
              {exampleProfile.name.split(' ').map(w => w[0]?.toUpperCase()).join(' ').slice(0,3)}
            </div>
          )}
          <h1 className="text-2xl font-bold text-blue-800 mb-2 text-center">{exampleProfile.name}</h1>
          <div className="text-gray-600 mb-2 text-center">{exampleProfile.location}</div>
          <div className="flex flex-wrap justify-center mb-2">
            {exampleProfile.languages.map((lang, i) => <span key={i} className={tagClass}>{lang}</span>)}
          </div>
          <div className="flex flex-wrap justify-center mb-2">
            {exampleProfile.methods.map((m, i) => <span key={i} className={tagClassAlt}>{m}</span>)}
          </div>
          <div className="flex flex-wrap justify-center mb-2">
            <span className={tagClass}>{exampleProfile.gender}</span>
          </div>
          <div className="flex flex-wrap justify-center mb-2">
            {exampleProfile.qualifications.map((q, i) => <span key={i} className={tagClassAlt}>{q}</span>)}
          </div>
          <div className="flex flex-wrap justify-center mb-2">
            {exampleProfile.target.map((t, i) => <span key={i} className={tagClass}>{t}</span>)}
          </div>
        </div>
        {/* Sağ Blok */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Butonlar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <button
              className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-xl shadow hover:bg-cyan-700 transition text-lg"
              onClick={() => {
                if (!user) { window.location.href = '/login'; return; }
                setSelectedService(provider?.providerServices?.[0] || null);
                setSuccessMsg('');
                setErrorMsg('');
                setDate('');
                setShowModal(true);
              }}
            >
              Servisimi rezerve et
            </button>
            <button
              className="bg-white border-2 border-cyan-600 text-cyan-700 font-bold py-3 px-8 rounded-xl shadow hover:bg-cyan-50 transition text-lg"
              onClick={() => {
                if (!user) { window.location.href = '/login'; return; }
                setMessageError('');
                setMessageSuccess('');
                setShowMessageModal(true);
              }}
            >
              Bana bir mesaj gönder
            </button>
          </div>
          {/* Açıklama */}
          <div className="bg-white rounded-2xl shadow p-6 mb-4">
            <h2 className="text-xl font-bold text-blue-700 mb-2">Hakkında</h2>
            <p className="text-gray-700 mb-2 whitespace-pre-line">{exampleProfile.bio}</p>
          </div>
          {/* Odak Alanı */}
          <div className="bg-white rounded-2xl shadow p-6 mb-4">
            <h2 className="text-xl font-bold text-blue-700 mb-2">Odak Alanı</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Yetişkin Ruh Sağlığı</li>
              <li>İslami Psikoloji</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Hizmetler */}
      <div className="w-full max-w-6xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Verdiği Hizmetler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {provider.providerServices && provider.providerServices.length > 0 ? (
            provider.providerServices.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center">
                <div className="w-20 h-20 mb-3 rounded-full flex items-center justify-center text-2xl font-bold text-white border-4 border-blue-200 shadow" style={{background: '#7c3aed'}}>
                  {provider.user?.name.split(' ').map(w => w[0]?.toUpperCase()).join(' ').slice(0,3)}
                </div>
                <h3 className="text-lg font-bold text-blue-800 mb-2">{s.title || '-'}</h3>
                <p className="text-gray-700 text-center mb-2">{s.description || '-'}</p>
                <div className="bg-green-500 text-white font-semibold rounded px-4 py-2 mb-2">{s.price ? `${s.price} ₺ / seans` : ''}</div>
                <button className="bg-blue-600 text-white py-2 rounded font-semibold mt-2 w-full" onClick={() => handleReserve(s)}>Rezerve Et</button>
              </div>
            ))
          ) : (
            <div className="text-gray-500 col-span-full">Hizmet bulunamadı.</div>
          )}
        </div>
      </div>
      {/* Rezervasyon Modalı */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md flex flex-col gap-4 relative">
            <button className="absolute top-2 right-4 text-2xl" onClick={() => setShowModal(false)}>×</button>
            <h2 className="text-xl font-bold mb-2">Rezervasyon Yap</h2>
            {/* Hizmet seçimi */}
            {provider?.providerServices?.length > 0 && (
              <select
                value={selectedService?.id || ''}
                onChange={(e) => {
                  const svc = provider.providerServices.find(s => s.id === e.target.value);
                  setSelectedService(svc || null);
                }}
                className="border rounded p-2"
              >
                <option value="">Hizmet seçin</option>
                {provider.providerServices.map(s => (
                  <option key={s.id} value={s.id}>{s.title || 'Hizmet'} - {s.price ? `${s.price} ₺` : '-'}</option>
                ))}
              </select>
            )}
            <div className="font-semibold">Hizmet: {selectedService?.title || '-'}</div>
            <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} className="border rounded p-2" />
            {errorMsg && <div className="text-red-600 text-sm">{errorMsg}</div>}
            <button onClick={submitReservation} disabled={loadingReserve || !selectedService} className="bg-blue-600 text-white py-2 rounded font-semibold mt-2 disabled:opacity-60">Gönder</button>
          </div>
        </div>
      )}
      {successMsg && <div className="text-green-600 font-semibold mt-6">{successMsg}</div>}
      {/* Mesaj Gönder Modalı */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md flex flex-col gap-4 relative">
            <button className="absolute top-2 right-4 text-2xl" onClick={() => setShowMessageModal(false)}>×</button>
            <h2 className="text-xl font-bold mb-2">Mesaj Gönder</h2>
            <div className="text-sm text-gray-600">Alıcı: {provider?.user?.name}</div>
            <textarea
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              rows={4}
              className="border rounded p-2"
              placeholder="Mesajınızı yazın..."
            />
            {messageError && <div className="text-red-600 text-sm">{messageError}</div>}
            {messageSuccess && <div className="text-green-600 text-sm">{messageSuccess}</div>}
            <button onClick={sendMessage} disabled={messageSending} className="bg-cyan-600 text-white py-2 rounded font-semibold mt-2 disabled:opacity-60">Gönder</button>
          </div>
        </div>
      )}
      {/* Yorumlar */}
      <h2 className="text-xl font-bold text-blue-700 mb-4 mt-10">Yorumlar</h2>
      <div className="flex gap-2 mb-4">
        <input type="text" placeholder="Yorumda ara..." value={filterText} onChange={e => setFilterText(e.target.value)} className="border rounded p-2 flex-1" />
        <select value={filterRating} onChange={e => setFilterRating(e.target.value)} className="border rounded p-2">
          <option value="">Tüm Puanlar</option>
          {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} ★</option>)}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)} className="border rounded p-2">
          <option value="date">En Yeni</option>
          <option value="dateOld">En Eski</option>
          <option value="rating">Puan (Yüksekten Düşüğe)</option>
          <option value="ratingLow">Puan (Düşükten Yükseğe)</option>
        </select>
      </div>
      {loadingReviews ? <div>Yükleniyor...</div> : errorReviews ? <div className="text-red-500">Yorumlar alınamadı.</div> : reviews && reviews.length > 0 ? (
        <ul className="space-y-4 w-full max-w-2xl">
          {reviews
            .filter(r =>
              (!filterText || (r.comment || '').toLowerCase().includes(filterText.toLowerCase())) &&
              (!filterRating || r.rating === Number(filterRating))
            )
            .sort((a, b) => {
              if (sort === 'date') return new Date(b.createdAt) - new Date(a.createdAt);
              if (sort === 'dateOld') return new Date(a.createdAt) - new Date(b.createdAt);
              if (sort === 'rating') return b.rating - a.rating;
              if (sort === 'ratingLow') return a.rating - b.rating;
              return 0;
            })
            .map((r, i) => (
              <li key={i} className="border rounded-xl p-4 flex flex-col gap-1 bg-gray-50">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-purple-700">{r.user?.name}</span>
                  <span className="text-yellow-500 font-bold">{'★'.repeat(r.rating)}</span>
                </div>
                <div className="text-gray-700 mb-1">{r.comment}</div>
                <div className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString('tr-TR')}</div>
                {r.service?.title && <div className="text-xs text-gray-500">Hizmet: {r.service.title}</div>}
              </li>
            ))}
        </ul>
      ) : <div className="text-gray-500">Henüz yorum yok.</div>}
      {user && !alreadyReviewed && eligibleServiceIds.length > 0 && (
        <div className="mb-6 w-full max-w-2xl">
          <button onClick={() => setShowReviewForm(v => !v)} className="bg-green-600 text-white px-4 py-2 rounded mb-2">Yorum Yap / Puan Ver</button>
          {showReviewForm && (
            <form onSubmit={async e => {
              e.preventDefault(); setReviewMsg(''); setReviewError('');
              if (!reviewServiceId) { setReviewError('Hizmet seçmelisiniz.'); return; }
              try {
                await api.post('/api/reviews', {
                  userId: user.id,
                  providerId: provider.id,
                  serviceId: reviewServiceId,
                  rating: reviewRating,
                  comment: reviewText
                }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
                setReviewMsg('Yorum kaydedildi, admin onayı bekliyor.');
                setShowReviewForm(false); setReviewText(''); setReviewRating(5); setReviewServiceId('');
              } catch (err) {
                setReviewError(err.response?.data?.message || 'Yorum eklenemedi.');
              }
            }} className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
              <select value={reviewServiceId} onChange={e => setReviewServiceId(e.target.value)} className="border rounded p-2" required>
                <option value="">Hizmet Seç</option>
                {provider.providerServices && provider.providerServices.filter(s => eligibleServiceIds.includes(s.id) && s.serviceId).map(s => (
                  <option key={s.id} value={s.serviceId}>{s.title}</option>
                ))}
              </select>
              <select value={reviewRating} onChange={e => setReviewRating(Number(e.target.value))} className="border rounded p-2" required>
                {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} ★</option>)}
              </select>
              <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} className="border rounded p-2" placeholder="Yorumunuz..." required rows={3} />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Gönder</button>
              {reviewMsg && <div className="text-green-600 mt-2">{reviewMsg}</div>}
              {reviewError && <div className="text-red-600 mt-2">{reviewError}</div>}
            </form>
          )}
        </div>
      )}
      {user && !alreadyReviewed && eligibleServiceIds.length === 0 && (
        <div className="mb-6 w-full max-w-2xl text-gray-500">Yorum yapabilmek için bu sağlayıcıdan onaylanmış bir rezervasyonunuz olmalı.</div>
      )}
    </div>
  );
};

export default ProviderDetail;