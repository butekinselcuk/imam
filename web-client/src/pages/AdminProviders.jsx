import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import api from '../utils/api';

const AdminProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/providers', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProviders(res.data);
    } catch {
      setError('Sağlayıcılar yüklenemedi.');
    }
    setLoading(false);
  };

  useEffect(() => { fetchProviders(); }, []);

  const handleVerify = async (id, isVerified) => {
    setMsg(''); setError('');
    try {
      await api.put(`/api/admin/providers/${id}`, { isVerified }, {
         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
       });
      setMsg('Durum güncellendi.');
      fetchProviders();
    } catch {
      setError('Durum güncellenemedi.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-700 mb-4">Sağlayıcı Onaylama</h2>
      {loading ? <div>Yükleniyor...</div> : (
        <table className="w-full bg-white rounded-xl shadow mb-4">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-3 text-left">Ad Soyad</th>
              <th className="p-3 text-left">E-posta</th>
              <th className="p-3 text-left">Onay Durumu</th>
              <th className="p-3 text-left">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {providers.map(p => (
              <tr key={p.id} className="border-b">
                <td className="p-3">{p.user?.name}</td>
                <td className="p-3">{p.user?.email}</td>
                <td className="p-3">{p.isVerified ? 'Onaylı' : 'Bekliyor'}</td>
                <td className="p-3">
                  {p.isVerified ? (
                    <button onClick={() => handleVerify(p.id, false)} className="bg-red-500 text-white px-3 py-1 rounded">Onayı Kaldır</button>
                  ) : (
                    <button onClick={() => handleVerify(p.id, true)} className="bg-green-600 text-white px-3 py-1 rounded">Onayla</button>
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

export default AdminProviders;