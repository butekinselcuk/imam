import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import api from '../utils/api';

const ROLES = ['user', 'mod', 'admin'];

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(res.data);
    } catch {
      setError('Kullanıcılar yüklenemedi.');
    }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleRoleChange = async (id, role) => {
    setMsg(''); setError('');
    try {
      await api.put(`/api/admin/users/${id}`, { role }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMsg('Rol güncellendi.');
      fetchUsers();
    } catch {
      setError('Rol güncellenemedi.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-700 mb-4">Kullanıcı Yönetimi</h2>
      {loading ? <div>Yükleniyor...</div> : (
        <table className="w-full bg-white rounded-xl shadow mb-4">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-3 text-left">Ad Soyad</th>
              <th className="p-3 text-left">E-posta</th>
              <th className="p-3 text-left">Rol</th>
              <th className="p-3 text-left">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">
                  <select value={u.role} onChange={e => handleRoleChange(u.id, e.target.value)} className="border rounded p-1">
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </td>
                <td className="p-3 text-red-600">(Silme için ek fonksiyon eklenebilir)</td>
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

export default AdminUsers;