import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'

const Notifications = () => {
  const [tab, setTab] = useState('notifications'); // notifications | messages
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [msgFilter, setMsgFilter] = useState('inbox'); // inbox | sent
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [nameMap, setNameMap] = useState({}); // userId -> name (sağlayıcı kullanıcıları)
  const [providerIdNameMap, setProviderIdNameMap] = useState({}); // providerId -> provider user name
  const navigate = useNavigate();

  // Yardımcı: Avatar baş harfleri
  const initials = (name) => {
    if (!name) return '??';
    return name.split(' ').map(w => w[0]?.toUpperCase()).join('').slice(0,2);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        const userId = user ? user.id : null;
        let providerId = localStorage.getItem('providerId');
        // Sağlayıcılar listesini çekip userId->name eşlemesi çıkar
        try {
          const provRes = await api.get('/api/providers');
          const map = {};
          const mapByProvId = {};
          (provRes.data || []).forEach(p => {
            if (p?.user?.id) map[p.user.id] = p.user.name || 'Sağlayıcı';
            if (p?.id) mapByProvId[p.id] = p?.user?.name || 'Sağlayıcı';
          });
          setNameMap(map);
          setProviderIdNameMap(mapByProvId);
        } catch {
          setNameMap({});
          setProviderIdNameMap({});
        }
        // Bildirimleri (kullanıcı ve sağlayıcıya göre) birleştir
        let allNotifs = [];
        try {
          if (user && user.role === 'mod' && !providerId) {
            const res = await api.get('/api/providers');
            const me = (res.data || []).find(p => p.userId === user.id);
            if (me) {
              providerId = me.id;
              localStorage.setItem('providerId', me.id);
            }
          }
          if (userId && providerId) {
            const [userRes, providerRes] = await Promise.all([
              api.get('/api/notifications', { headers: { Authorization: `Bearer ${token}` }, params: { userId } }),
              api.get('/api/notifications', { headers: { Authorization: `Bearer ${token}` }, params: { providerId } })
            ]);
            const merged = [...userRes.data, ...providerRes.data].filter((v,i,a) => a.findIndex(t => t.id === v.id) === i);
            allNotifs = merged;
          } else {
            const params = userId ? { userId } : providerId ? { providerId } : {};
            const one = await api.get('/api/notifications', { headers: { Authorization: `Bearer ${token}` }, params });
            allNotifs = one.data;
          }
        } catch {
          allNotifs = [];
        }
        setNotifications(allNotifs);
        // Mesajları çek
        let msgs = [];
        try {
          const res = await api.get('/api/messages', { headers: { Authorization: `Bearer ${token}` } });
          msgs = res.data || [];
        } catch {
          msgs = [];
        }
        setMessages(msgs);
        setLoading(false);
      } catch (err) {
        console.error('Veri yüklenirken hata:', err);
        setError('Veriler yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };
    init();
  }, [navigate]);

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await api.put(`/api/notifications/${id}/read`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error('Okundu işaretlenemedi:', err);
    }
  };

  const sendReply = async () => {
    if (!selectedMsg || !replyText.trim()) return;
    setSending(true);
    try {
      const token = localStorage.getItem('token');
      // Alıcı: seçili mesajdaki karşı taraf
      const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
      const myId = user?.id;
      const otherId = selectedMsg.senderId === myId ? selectedMsg.receiverId : selectedMsg.senderId;
      await api.post('/api/messages', { receiverId: otherId, content: replyText.trim() }, { headers: { Authorization: `Bearer ${token}` } });
      setReplyText('');
      // Basit: mesaj listesini tekrar çek
      const res = await api.get('/api/messages', { headers: { Authorization: `Bearer ${token}` } });
      setMessages(res.data || []);
    } catch (err) {
      console.error('Mesaj gönderilemedi:', err);
    } finally {
      setSending(false);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleString('tr-TR');

  const inboxMessages = (() => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const myId = user?.id;
    return messages.filter(m => m.receiverId === myId);
  })();
  const sentMessages = (() => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const myId = user?.id;
    return messages.filter(m => m.senderId === myId);
  })();
  const visibleMsgs = msgFilter === 'inbox' ? inboxMessages : sentMessages;

  if (loading) return <div className="max-w-6xl mx-auto p-6">Yükleniyor...</div>;
  if (error) return <div className="max-w-6xl mx-auto p-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-2 sm:px-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Bildirimler ve Mesajlar</h1>
          <div className="bg-white rounded-xl shadow p-1 flex">
            <button className={`px-4 py-2 rounded-xl font-semibold ${tab==='notifications'?'bg-blue-600 text-white':'text-blue-700'}`} onClick={()=>setTab('notifications')}>Bildirimler</button>
            <button className={`px-4 py-2 rounded-xl font-semibold ${tab==='messages'?'bg-blue-600 text-white':'text-blue-700'}`} onClick={()=>setTab('messages')}>Mesajlar</button>
          </div>
        </div>

        {tab === 'notifications' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-white rounded-2xl shadow p-4">
              <h2 className="text-lg font-bold text-blue-700 mb-3">Liste</h2>
              {notifications.length === 0 ? (
                <div className="text-gray-500">Bildirim yok.</div>
              ) : (
                <ul>
                  {notifications.map(n => (
                    <li key={n.id} className={`p-3 rounded-xl mb-2 cursor-pointer border ${selectedNotif?.id===n.id?'border-blue-400':'border-gray-200'} ${!n.isRead?'bg-blue-50':''}`}
                        onClick={()=>setSelectedNotif(n)}>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold mr-3">N</div>
                        <div className="flex-1">
                          <div className="font-semibold text-blue-800 line-clamp-1">{n.message}</div>
                          <div className="text-xs text-gray-500">{formatDate(n.createdAt)}</div>
                          {(n.providerId || n.userId) && (
                            <div className="text-xs text-gray-500 mt-1">
                              {n.providerId && (<span>Sağlayıcı: {providerIdNameMap[n.providerId] || '—'}</span>)}
                              {n.providerId && n.userId && <span> • </span>}
                              {n.userId && (<span>Gönderen: {(JSON.parse(localStorage.getItem('user')||'{}').id===n.userId)? JSON.parse(localStorage.getItem('user')||'{}').name : 'Kullanıcı'}</span>)}
                            </div>
                          )}
                        </div>
                        {!n.isRead && <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"/>}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
              {selectedNotif ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold mr-3">N</div>
                      <div>
                        <div className="font-bold text-blue-800">Bildirim Detayı</div>
                        <div className="text-xs text-gray-500">{formatDate(selectedNotif.createdAt)}</div>
                        {(selectedNotif.providerId || selectedNotif.userId) && (
                          <div className="text-xs text-gray-500 mt-1">
                            {selectedNotif.providerId && (<span>Sağlayıcı: {providerIdNameMap[selectedNotif.providerId] || '—'}</span>)}
                            {selectedNotif.providerId && selectedNotif.userId && <span> • </span>}
                            {selectedNotif.userId && (<span>Gönderen: {(JSON.parse(localStorage.getItem('user')||'{}').id===selectedNotif.userId)? JSON.parse(localStorage.getItem('user')||'{}').name : 'Kullanıcı'}</span>)}
                          </div>
                        )}
                      </div>
                    </div>
                    {!selectedNotif.isRead && (
                      <button className="bg-blue-600 text-white rounded px-3 py-2 font-semibold" onClick={()=>markAsRead(selectedNotif.id)}>Okundu İşaretle</button>
                    )}
                  </div>
                  <div className="text-gray-800 whitespace-pre-line">{selectedNotif.message}</div>
                </div>
              ) : (
                <div className="text-gray-500">Soldan bir bildirim seçin.</div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-white rounded-2xl shadow p-4">
              <div className="flex gap-2 mb-3">
                <button className={`px-3 py-1 rounded-xl text-sm font-semibold ${msgFilter==='inbox'?'bg-blue-600 text-white':'bg-blue-50 text-blue-700'}`} onClick={()=>setMsgFilter('inbox')}>Gelen Kutusu</button>
                <button className={`px-3 py-1 rounded-xl text-sm font-semibold ${msgFilter==='sent'?'bg-blue-600 text-white':'bg-blue-50 text-blue-700'}`} onClick={()=>setMsgFilter('sent')}>Gönderilmiş</button>
              </div>
              {visibleMsgs.length === 0 ? (
                <div className="text-gray-500">Mesaj yok.</div>
              ) : (
                <ul>
                  {visibleMsgs.map(m => {
                    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
                    const myId = user?.id;
                    const otherId = m.senderId === myId ? m.receiverId : m.senderId;
                    const otherName = nameMap[otherId] || (otherId === myId ? user?.name : 'Kullanıcı');
                    return (
                      <li key={m.id} className={`p-3 rounded-xl mb-2 cursor-pointer border ${selectedMsg?.id===m.id?'border-cyan-400':'border-gray-200'}`}
                          onClick={()=>setSelectedMsg(m)}>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold mr-3">{initials(otherName)}</div>
                          <div className="flex-1">
                            <div className="font-semibold text-blue-800 line-clamp-1">{otherName}</div>
                            <div className="text-xs text-gray-500 line-clamp-1">{m.content}</div>
                          </div>
                          <div className="text-xs text-gray-400 ml-2">{formatDate(m.createdAt)}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
              {selectedMsg ? (
                <div>
                  {(() => {
                    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
                    const myId = user?.id;
                    const fromId = selectedMsg.senderId;
                    const toId = selectedMsg.receiverId;
                    const fromName = nameMap[fromId] || (fromId === myId ? user?.name : 'Kullanıcı');
                    const toName = nameMap[toId] || (toId === myId ? user?.name : 'Kullanıcı');
                    return (
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold mr-3">{initials(fromName)}</div>
                          <div>
                            <div className="font-bold text-blue-800">{fromName}</div>
                            <div className="text-xs text-gray-500">→ {toName}</div>
                            <div className="text-xs text-gray-500">{formatDate(selectedMsg.createdAt)}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                  <div className="text-gray-800 whitespace-pre-line mb-6">{selectedMsg.content}</div>
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-semibold text-blue-800 mb-2">Yanıtla</h3>
                    <textarea className="border rounded p-2 w-full" rows={4} value={replyText} onChange={e=>setReplyText(e.target.value)} placeholder="Mesajınızı yazın..."/>
                    <div className="mt-2">
                      <button className="bg-cyan-600 text-white rounded px-4 py-2 font-semibold disabled:opacity-60" disabled={sending || !replyText.trim()} onClick={sendReply}>Gönder</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">Soldan bir mesaj seçin.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;