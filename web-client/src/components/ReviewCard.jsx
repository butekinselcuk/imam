import React from 'react';

const ReviewCard = ({ user, rating, comment, createdAt, service }) => (
  <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center min-w-[320px] max-w-xs mx-auto transition hover:-translate-y-1 hover:shadow-2xl">
    <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2 text-2xl font-bold text-white" style={{background: '#7c3aed'}}>
      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
    </div>
    <div className="text-4xl text-purple-400 mb-2">“</div>
    <p className="text-gray-700 text-center mb-2">{comment}</p>
    <div className="flex items-center gap-2 mb-2">
      <span className="font-bold text-purple-700">— {user?.name}</span>
      <span className="text-yellow-500 font-bold">{rating && '★'.repeat(rating)}</span>
    </div>
    {service?.title && <div className="text-xs text-gray-500 mb-1">Hizmet: {service.title}</div>}
    {createdAt && <div className="text-xs text-gray-400">{new Date(createdAt).toLocaleDateString('tr-TR')}</div>}
  </div>
);

export default ReviewCard; 