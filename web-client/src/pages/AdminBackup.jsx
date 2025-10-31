import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'

const AdminBackup = () => {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBackups = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await api.get('/api/admin/backups', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setBackups(response.data);
        setLoading(false);
      } catch (err) {
        setError('Yedekler yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchBackups();
  }, [navigate]);

  const createBackup = async () => {
    try {
      setIsCreating(true);
      setError(null);
      setSuccess(null);
      
      const token = localStorage.getItem('token');
      const response = await api.post('/api/admin/backups', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setBackups([...backups, response.data]);
      setSuccess('Veritabanı yedeği başarıyla oluşturuldu.');
    } catch (err) {
      setError('Yedek oluşturulurken bir hata oluştu.');
    } finally {
      setIsCreating(false);
    }
  };

  const downloadBackup = async (backupId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/api/admin/backups/${backupId}/download`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
      });
      
      // Dosyayı indirme
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `backup-${backupId}.sql`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Yedek indirilirken bir hata oluştu.');
    }
  };

  const deleteBackup = async (backupId) => {
    if (!window.confirm('Bu yedeği silmek istediğinizden emin misiniz?')) {
      return;
    }
    
    try {
      setError(null);
      setSuccess(null);
      
      const token = localStorage.getItem('token');
      await api.delete(`/api/admin/backups/${backupId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setBackups(backups.filter(backup => backup.id !== backupId));
      setSuccess('Yedek başarıyla silindi.');
    } catch (err) {
      setError('Yedek silinirken bir hata oluştu.');
    }
  };

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const restoreBackup = async (e) => {
    e.preventDefault();
    
    if (!uploadFile) {
      setError('Lütfen bir yedek dosyası seçin.');
      return;
    }
    
    if (!window.confirm('Veritabanını geri yüklemek istediğinizden emin misiniz? Bu işlem mevcut verilerin üzerine yazacaktır.')) {
      return;
    }
    
    try {
      setIsRestoring(true);
      setError(null);
      setSuccess(null);
      
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('backup', uploadFile);
      
      await api.post('/api/admin/backups/restore', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      
      setSuccess('Veritabanı başarıyla geri yüklendi.');
      setUploadFile(null);
      
      // Yedekleri yeniden yükle
      const response = await api.get('/api/admin/backups', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setBackups(response.data);
    } catch (err) {
      setError('Veritabanı geri yüklenirken bir hata oluştu.');
    } finally {
      setIsRestoring(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Veritabanı Yönetimi</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Hata!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Başarılı!</strong>
          <span className="block sm:inline"> {success}</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Yedek Oluşturma */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Yedek Oluştur</h2>
          <p className="text-gray-600 mb-4">
            Veritabanının tam bir yedeğini oluşturun. Bu işlem, tüm verileri ve şemayı içeren bir SQL dosyası oluşturacaktır.
          </p>
          <button
            onClick={createBackup}
            disabled={isCreating}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${isCreating ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {isCreating ? 'Yedekleniyor...' : 'Yedek Oluştur'}
          </button>
        </div>
        
        {/* Yedek Geri Yükleme */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Yedek Geri Yükle</h2>
          <p className="text-gray-600 mb-4">
            Önceden oluşturulmuş bir yedeği geri yükleyin. Bu işlem mevcut veritabanının üzerine yazacaktır.
          </p>
          <form onSubmit={restoreBackup}>
            <div className="mb-4">
              <input
                type="file"
                accept=".sql"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              disabled={isRestoring || !uploadFile}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${isRestoring || !uploadFile ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {isRestoring ? 'Geri Yükleniyor...' : 'Geri Yükle'}
            </button>
          </form>
        </div>
      </div>
      
      {/* Yedek Listesi */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Yedek Listesi</h2>
        
        {backups.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Henüz yedek bulunmamaktadır.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                  <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Boyut</th>
                  <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Oluşturan</th>
                  <th className="px-4 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {backups.map(backup => (
                  <tr key={backup.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{formatDate(backup.createdAt)}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{formatSize(backup.size)}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{backup.createdBy}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => downloadBackup(backup.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          İndir
                        </button>
                        <button
                          onClick={() => deleteBackup(backup.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBackup;