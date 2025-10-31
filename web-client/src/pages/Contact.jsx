import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
// import axios from 'axios';
import api from '../utils/api';

const Contact = () => {
  const { data: page, loading: loadingPage, error: errorPage } = useFetch('/api/static-pages/contact');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInfo(''); setError('');
    try {
      await api.post('/api/contact', { name, email, message });
      setInfo('Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapılacaktır.');
      setName(''); setEmail(''); setMessage('');
    } catch (err) {
      setError('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">İletişim</h1>
      {loadingPage ? (
        <div>Yükleniyor...</div>
      ) : errorPage ? (
        <div className="text-red-500">İletişim bilgisi yüklenemedi.</div>
      ) : page ? (
        <div className="text-lg text-gray-700 max-w-2xl text-center mb-6" dangerouslySetInnerHTML={{ __html: page.content }} />
      ) : null}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow w-full max-w-md flex flex-col gap-4">
        <input type="text" placeholder="Adınız" value={name} onChange={e => setName(e.target.value)} className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <input type="email" placeholder="E-posta" value={email} onChange={e => setEmail(e.target.value)} className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <textarea placeholder="Mesajınız" value={message} onChange={e => setMessage(e.target.value)} className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" rows={4} required />
        <button type="submit" className="bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition">Gönder</button>
        {info && <div className="text-green-600 text-center">{info}</div>}
        {error && <div className="text-red-600 text-center">{error}</div>}
      </form>
    </div>
  );
};

export default Contact;