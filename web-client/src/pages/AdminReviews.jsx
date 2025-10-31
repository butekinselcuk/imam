import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import api from '../utils/api';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/reviews', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setReviews(res.data);
    } catch {
      setError('Yorumlar yüklenemedi.');
    }
    setLoading(false);
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleApprove = async (id, isApproved) => {
    setMsg(''); setError('');
    try {
      await api.put(`/api/admin/reviews/${id}`, { isApproved }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMsg('Durum güncellendi.');
      fetchReviews();
    } catch {
      setError('Durum güncellenemedi.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-700 mb-4">Yorum Onaylama</h2>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input type="text" placeholder="Kullanıcı, hizmet, sağlayıcı veya yorum ara..." value={filterText} onChange={e => setFilterText(e.target.value)} className="border rounded p-2 flex-1" />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border rounded p-2">
          <option value="">Tüm Durumlar</option>
          <option value="approved">Onaylı</option>
          <option value="pending">Bekliyor</option>
        </select>
      </div>
      {loading ? <div>Yükleniyor...</div> : (
        <table className="w-full bg-white rounded-xl shadow mb-4">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-3 text-left">Kullanıcı</th>
              <th className="p-3 text-left">Hizmet</th>
              <th className="p-3 text-left">Sağlayıcı</th>
              <th className="p-3 text-left">Puan</th>
              <th className="p-3 text-left">Yorum</th>
              <th className="p-3 text-left">Onay Durumu</th>
              <th className="p-3 text-left">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {reviews.filter(r =>
              (!filterText ||
                (r.user?.name || '').toLowerCase().includes(filterText.toLowerCase()) ||
                (r.service?.title || '').toLowerCase().includes(filterText.toLowerCase()) ||
                (r.provider?.user?.name || '').toLowerCase().includes(filterText.toLowerCase()) ||
                (r.comment || '').toLowerCase().includes(filterText.toLowerCase())
              ) &&
              (!filterStatus || (filterStatus === 'approved' ? r.isApproved : !r.isApproved))
            ).map(r => (
              <tr key={r.id} className="border-b">
                <td className="p-3">{r.user?.name}</td>
                <td className="p-3">{r.service?.title}</td>
                <td className="p-3">{r.provider?.user?.name}</td>
                <td className="p-3">{r.rating}</td>
                <td className="p-3">{r.comment}</td>
                <td className="p-3">{r.isApproved ? 'Onaylı' : 'Bekliyor'}</td>
                <td className="p-3">
                  {r.isApproved ? (
                    <button onClick={() => handleApprove(r.id, false)} className="bg-red-500 text-white px-3 py-1 rounded">Onayı Kaldır</button>
                  ) : (
                    <button onClick={() => handleApprove(r.id, true)} className="bg-green-600 text-white px-3 py-1 rounded">Onayla</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {msg && <div className="text-green-600 mb-2">{msg}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}
    </div>
  );
};

export default AdminReviews;