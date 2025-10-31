import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import api from '../utils/api';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProviderList = () => {
  const [providers, setProviders] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imgErrorMap, setImgErrorMap] = useState({});
  const query = useQuery();
  const categoryId = query.get('categoryId');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const catRes = await api.get(`/api/categories`);
        const cat = (catRes.data || []).find(c => c.id === categoryId);
        setCategory(cat);
        const provRes = await api.get(`/api/providers`);
        // Sadece bu kategoriye hizmeti olan sağlayıcılar
        const filtered = (provRes.data || []).filter(p => (p.providerServices || []).some(s => s.categoryId === categoryId));
        setProviders(filtered);
        setError('');
      } catch {
        setError('Veriler yüklenemedi.');
      }
      setLoading(false);
    };
    if (categoryId) fetchData();
  }, [categoryId]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-green-50 px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">{category ? category.name : 'Sağlayıcılar'}</h1>
      <p className="text-gray-600 mb-8">{category?.description}</p>
      {loading ? (
        <div>Yükleniyor...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : providers.length === 0 ? (
        <div className="text-gray-500">Bu kategoriye ait sağlayıcı bulunamadı.</div>
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {providers.map((p, i) => {
            const minService = p.providerServices && p.providerServices.filter(s => s.categoryId === categoryId).sort((a, b) => a.price - b.price)[0];
            const hasImage = !!p.image && p.image.trim() !== '';
            const showImage = hasImage && !imgErrorMap[p.id];
            const initials = (p.user?.name || 'Sağlayıcı')
              .split(' ')
              .map(w => w[0]?.toUpperCase())
              .join('')
              .slice(0, 2);
            return (
              <div key={i} className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center">
                {showImage ? (
                  <img
                    src={p.image}
                    alt={p.user?.name || 'Sağlayıcı'}
                    className="w-24 h-24 mb-3 rounded-full object-cover border-4 border-white shadow"
                    onError={() => setImgErrorMap(prev => ({ ...prev, [p.id]: true }))}
                  />
                ) : (
                  <div className="w-24 h-24 mb-3 rounded-full flex items-center justify-center text-3xl font-bold text-white border-4 border-white shadow" style={{ background: '#7c3aed' }}>
                    {initials}
                  </div>
                )}
                <div className="font-bold text-lg text-center mb-1">{p.user?.name || 'Sağlayıcı'}</div>
                <div className="text-xs text-gray-500 mb-2 text-center">{p.location || '-'}</div>
                <div className="text-gray-700 text-sm mb-2 text-center">{minService ? minService.description : 'Açıklama yok.'}</div>
                <div className="bg-green-500 text-white font-semibold rounded px-3 py-1 mb-2">{minService ? `${minService.price}₺` : '-'}</div>
                <Link to={`/providers/${p.id}`} className="w-full">
                  <button className="w-full bg-blue-600 text-white rounded-xl px-4 py-2 font-semibold hover:bg-blue-700 transition">Hizmetleri Gör</button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProviderList;