import React, { useState } from 'react';
// import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import api from '../utils/api';

const ProviderCard = ({ user, providerId, location, services, image, onCardClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { user: currentUser } = useAuthContext();

  const handleReserve = (service, e) => {
    e.stopPropagation();
    setSelectedService(service);
    setShowModal(true);
    setSuccessMsg('');
    setErrorMsg('');
    setDate('');
  };

  const submitReservation = async (e) => {
    e.stopPropagation();
    if (!date) { setErrorMsg('Tarih seçmelisiniz.'); return; }
    if (!currentUser) { setErrorMsg('Giriş yapmalısınız.'); return; }
    if (!providerId || !selectedService?.id || !currentUser.id) {
      setErrorMsg('Eksik bilgi: Kullanıcı, sağlayıcı veya hizmet seçimi hatalı.');
      console.log('userId:', currentUser.id, 'providerId:', providerId, 'providerServiceId:', selectedService?.id);
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/api/providers/bookings', {
        userId: currentUser.id,
        providerId: providerId,
        providerServiceId: selectedService.id,
        date
      });
      if (res.status === 201) {
        setSuccessMsg('Rezervasyon talebiniz iletildi, onay bekliyor.');
        setErrorMsg('');
        setTimeout(() => {
          setShowModal(false);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 2500);
        }, 1000);
      } else {
        setErrorMsg(res.data?.message || 'Rezervasyon oluşturulamadı.');
      }
    } catch (err) {
      console.log('Rezervasyon Hatası:', err.response?.data, err.message);
      setErrorMsg(err.response?.data?.message || 'Rezervasyon oluşturulamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl shadow-xl p-8 flex flex-col items-center transition transform hover:-translate-y-1 hover:shadow-2xl bg-white min-h-[260px] cursor-pointer" onClick={onCardClick}>
      {/* Avatar */}
      {(!imgError && !!image && image.trim() !== "") ? (
        <img
          src={image}
          alt={user?.name || 'Sağlayıcı'}
          className="w-20 h-20 mb-3 rounded-full object-cover border-4 border-white shadow"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-20 h-20 mb-3 rounded-full flex items-center justify-center text-3xl font-bold text-white border-4 border-white shadow" style={{background: '#7c3aed'}}>
          {user?.name ? user.name.split(' ').map(w => w[0]?.toUpperCase()).join(' ').slice(0,3) : 'U'}
        </div>
      )}
      <h4 className="font-bold text-base mb-1 text-center">{user?.name || 'Sağlayıcı'}</h4>
      <div className="text-xs text-gray-500 mb-1 text-center">{location || '-'}</div>
      {showSuccess && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-2 font-semibold text-center animate-fade-in">Rezervasyon talebiniz iletildi, onay bekliyor.</div>
      )}
      {services && services.length > 0 ? (
        <div className="flex flex-col gap-2 w-full mt-2">
          {services.map((service, idx) => (
            <div key={idx} className="bg-blue-50 rounded-xl shadow p-3 flex flex-col items-center border border-blue-100">
              <span className="font-bold text-blue-800 text-base mb-1">{service.title}</span>
              <span className="text-green-700 font-semibold mb-1">{service.price} ₺</span>
              <button
                className="bg-cyan-600 text-white rounded-xl px-3 py-1 font-semibold hover:bg-cyan-700 transition"
                onClick={e => {
                  e.stopPropagation();
                  window.location.href = `/providers/${providerId}`;
                }}
              >
                Hizmeti Görüntüle
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-xs text-gray-400 mt-2">Hizmet bulunamadı.</div>
      )}
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={e => { e.stopPropagation(); setShowModal(false); }}>
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-2">Rezervasyon Yap</h2>
            <div className="mb-2 font-semibold">{selectedService?.title}</div>
            <div className="mb-2 text-green-700 font-bold">{selectedService?.price} ₺</div>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border rounded p-2 mb-4 w-full" onClick={e => e.stopPropagation()} />
            {errorMsg && <div className="text-red-600 mb-2">{errorMsg}</div>}
            {successMsg && <div className="text-green-600 mb-2">{successMsg}</div>}
            <div className="flex gap-4 w-full">
              <button onClick={submitReservation} className="bg-blue-600 text-white rounded-xl px-4 py-2 font-semibold w-full" disabled={loading}>{loading ? 'Gönderiliyor...' : 'Onayla'}</button>
              <button onClick={e => { e.stopPropagation(); setShowModal(false); }} className="bg-gray-300 rounded-xl px-4 py-2 font-semibold w-full">İptal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderCard;