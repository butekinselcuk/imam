import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import api from '../utils/api';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await api.get('/api/admin/categories', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setCategories(res.data);
      } catch {
        setError('Kategoriler yüklenemedi.');
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setMsg(''); setError('');
    try {
      const res = await api.post('/api/admin/categories', { name, description: desc }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCategories([...categories, res.data.category]);
      setName(''); setDesc('');
      setMsg('Kategori eklendi.');
    } catch {
      setError('Kategori eklenemedi.');
    }
  };

  const handleDelete = async (id) => {
    setMsg(''); setError('');
    try {
      await api.delete(`/api/admin/categories/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCategories(categories.filter(c => c.id !== id));
      setMsg('Kategori silindi.');
    } catch {
      setError('Silinemedi.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-700 mb-4">Kategori (Hizmet Başlığı) Yönetimi</h2>
      <form onSubmit={handleAdd} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 mb-8 max-w-md">
        <input value={name} onChange={e => setName(e.target.value)} className="border rounded p-2" placeholder="Kategori/Hizmet Başlığı" required />
        <textarea value={desc} onChange={e => setDesc(e.target.value)} className="border rounded p-2" placeholder="Açıklama" required rows={3} />
        <button type="submit" className="bg-green-600 text-white py-2 rounded">Ekle</button>
      </form>
      <div className="bg-white rounded-xl shadow p-6 max-w-2xl w-full">
        <h2 className="font-semibold text-lg mb-4">Mevcut Kategoriler</h2>
        {loading ? <div>Yükleniyor...</div> : (
          <ul>
            {categories.map(c => (
              <li key={c.id} className="border-b py-2 flex justify-between items-center">
                <span>{c.name} - {c.description}</span>
                <button onClick={() => handleDelete(c.id)} className="bg-red-500 text-white px-3 py-1 rounded">Sil</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {msg && <div className="text-green-600 mb-2">{msg}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}
    </div>
  );
};

export default AdminCategories;