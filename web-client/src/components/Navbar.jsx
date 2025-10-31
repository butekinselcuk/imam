import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import useFetch from '../hooks/useFetch';
import api from '../utils/api'

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const { data: siteSettings } = useFetch('/api/admin/site-settings');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  function getRole() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch {
      return null;
    }
  }
  const role = getRole();

  // Bildirimleri çek
  useEffect(() => {
    if (!isLoggedIn) return;
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const userId = user ? user.id : null;
    let providerId = localStorage.getItem('providerId');
    console.log('Bildirim debug:', { userId, providerId });
    // Eğer kullanıcı provider ise ve providerId yoksa backend'den çek
    if (user && user.role === 'mod' && !providerId) {
      api.get('/api/providers').then(res => {
        const me = res.data.find(p => p.userId === user.id);
        if (me) {
          providerId = me.id;
          localStorage.setItem('providerId', me.id);
        }
        if (userId && providerId) {
        Promise.all([
          api.get('/api/notifications', { 
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { userId } 
          }),
          api.get('/api/notifications', { 
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { providerId } 
          })
          ]).then(([userRes, providerRes]) => {
            const all = [...userRes.data, ...providerRes.data].filter((v,i,a) => a.findIndex(t => t.id === v.id) === i);
            console.log('Bildirim response (user+provider):', all);
            setNotifications(all);
          }).catch(() => setNotifications([]));
        } else {
          const params = userId ? { userId } : providerId ? { providerId } : {};
          api.get('/api/notifications', { 
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params 
          })
            .then(res => {
              console.log('Bildirim response (tek):', res.data);
              setNotifications(res.data);
            })
            .catch(() => setNotifications([]));
        }
      });
    } else {
      if (userId && providerId) {
        Promise.all([
          api.get('/api/notifications', { 
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { userId } 
          }),
          api.get('/api/notifications', { 
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            params: { providerId } 
          })
        ]).then(([userRes, providerRes]) => {
          const all = [...userRes.data, ...providerRes.data].filter((v,i,a) => a.findIndex(t => t.id === v.id) === i);
          console.log('Bildirim response (user+provider):', all);
          setNotifications(all);
        }).catch(() => setNotifications([]));
      } else {
        const params = userId ? { userId } : providerId ? { providerId } : {};
        api.get('/api/notifications', { 
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params 
        })
          .then(res => {
            console.log('Bildirim response (tek):', res.data);
            setNotifications(res.data);
          })
          .catch(() => setNotifications([]));
      }
    }
  }, [isLoggedIn]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Bildirimi okundu olarak işaretle
  const handleReadNotification = async (id) => {
    try {
      await api.put(`/api/notifications/${id}/read`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Okundu sonrası bildirimleri tekrar çek
      if (isLoggedIn) {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        const userId = user ? user.id : null;
        let providerId = localStorage.getItem('providerId');
        const params = userId ? { userId } : providerId ? { providerId } : {};
        api.get('/api/notifications', { 
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          params
        })
          .then(res => setNotifications(res.data))
          .catch(() => setNotifications([]));
      }
    } catch {}
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="font-bold text-xl md:text-2xl text-blue-700">{siteSettings?.siteTitle || siteSettings?.seoTitle || 'Hizmet Platformu'}</Link>
        <div className="hidden md:flex space-x-4 md:space-x-6 items-center">
          <Link to="/" className="text-blue-700 font-medium hover:underline">Ana Sayfa</Link>
          <Link to="/about" className="text-gray-700 font-medium hover:underline">Hakkımızda</Link>
          <Link to="/services" className="text-gray-700 font-medium hover:underline">Hizmetler</Link>
          <Link to="/contact" className="text-gray-700 font-medium hover:underline">İletişim</Link>
          {isLoggedIn && <Link to="/profile" className="text-purple-700 font-medium hover:underline">Profil</Link>}
+         {isLoggedIn && <Link to="/notifications" className="text-blue-700 font-medium hover:underline">Bildirimler</Link>}
          {role === 'admin' && <Link to="/admin" className="text-orange-600 font-medium hover:underline">Admin Paneli</Link>}
          {isLoggedIn && (
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)} className="relative focus:outline-none">
                {/* Modern zil ikonu SVG */}
                <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-700">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 animate-ping w-3 h-3 rounded-full"></span>
                )}
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 w-3 h-3 rounded-full border-2 border-white"></span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-xl z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b font-bold">Bildirimler</div>
                  {notifications.length === 0 ? (
                    <div className="p-4 text-gray-500">Bildirim yok.</div>
                  ) : notifications.map((n, i) => (
                    <div key={i} className={`p-4 border-b cursor-pointer ${!n.isRead ? 'bg-blue-50 font-bold border-blue-200' : 'bg-white'}`}
                      onClick={() => handleReadNotification(n.id)}>
                      <div className="text-sm">{n.message}</div>
                      <div className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleString('tr-TR')}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-red-600 font-medium hover:underline ml-2">Çıkış Yap</button>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 font-medium hover:underline">Giriş</Link>
              <Link to="/register" className="text-green-600 font-medium hover:underline">Kayıt Ol</Link>
            </>
          )}
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menüyü Aç/Kapat">
          {/* Hamburger icon */}
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-700">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Mobil menü ve overlay */}
      {open && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-20 z-40" onClick={() => setOpen(false)}></div>
          <div className="fixed top-0 left-0 right-0 bg-white rounded-b-2xl shadow-lg z-50 p-6 flex flex-col space-y-4 animate-fade-in">
            <Link to="/" className="text-blue-700 font-semibold text-lg py-2" onClick={() => setOpen(false)}>Ana Sayfa</Link>
            <Link to="/about" className="text-gray-700 font-semibold text-lg py-2" onClick={() => setOpen(false)}>Hakkımızda</Link>
            <Link to="/services" className="text-gray-700 font-semibold text-lg py-2" onClick={() => setOpen(false)}>Hizmetler</Link>
            <Link to="/contact" className="text-gray-700 font-semibold text-lg py-2" onClick={() => setOpen(false)}>İletişim</Link>
            {isLoggedIn && <Link to="/profile" className="text-purple-700 font-semibold text-lg py-2" onClick={() => setOpen(false)}>Profil</Link>}
+           {isLoggedIn && <Link to="/notifications" className="text-blue-700 font-semibold text-lg py-2" onClick={() => setOpen(false)}>Bildirimler</Link>}
            {role === 'admin' && <Link to="/admin" className="text-orange-600 font-semibold text-lg py-2" onClick={() => setOpen(false)}>Admin Paneli</Link>}
            {isLoggedIn ? (
              <button onClick={() => { setOpen(false); handleLogout(); }} className="text-red-600 font-semibold text-lg py-2 text-left">Çıkış Yap</button>
            ) : (
              <>
                <Link to="/login" className="text-blue-600 font-semibold text-lg py-2" onClick={() => setOpen(false)}>Giriş</Link>
                <Link to="/register" className="text-green-600 font-semibold text-lg py-2" onClick={() => setOpen(false)}>Kayıt Ol</Link>
              </>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;