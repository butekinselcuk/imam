import React from 'react';
import useFetch from '../hooks/useFetch';

const AdminReports = () => {
  const { data, loading, error } = useFetch('/api/admin/reports');

  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Raporlar ve İstatistikler</h2>
      {loading ? (
        <div>Yükleniyor...</div>
      ) : error ? (
        <div className="text-red-500">Veriler alınamadı.</div>
      ) : data ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl">
            <StatCard title="Kullanıcı Sayısı" value={data.userCount} color="bg-blue-100" />
            <StatCard title="Sağlayıcı Sayısı" value={data.providerCount} color="bg-green-100" />
            <StatCard title="Toplam Randevu" value={data.bookingCount} color="bg-yellow-100" />
            <StatCard title="Toplam Ödeme" value={data.paymentCount} color="bg-purple-100" />
            <StatCard title="Toplam Gelir" value={data.totalRevenue + ' ₺'} color="bg-pink-100" />
          </div>
          <div className="w-full max-w-3xl mt-10">
            <h3 className="text-lg font-bold mb-2 text-blue-700">Aylık Gelir (₺)</h3>
            <BarChart data={data.monthlyRevenue} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mt-10">
            <InfoCard title="En Popüler Hizmet" info={data.topService ? `${data.topService.title} (${data.topService.category}) - ${data.topService.provider}` : 'Veri yok'} value={data.topService?.bookingCount || 0} />
            <InfoCard title="En Popüler Kategori" info={data.topCategory ? data.topCategory.name : 'Veri yok'} value={data.topCategory?.serviceCount || 0} />
          </div>
        </>
      ) : null}
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className={`rounded-2xl shadow-xl p-8 flex flex-col items-center ${color}`}>
    <div className="text-3xl font-extrabold mb-2 text-blue-900">{value}</div>
    <div className="text-lg font-semibold text-gray-700">{title}</div>
  </div>
);

const InfoCard = ({ title, info, value }) => (
  <div className="rounded-2xl shadow-xl p-6 flex flex-col items-center bg-white">
    <div className="text-lg font-bold text-blue-800 mb-1">{title}</div>
    <div className="text-gray-700 mb-2 text-center">{info}</div>
    <div className="text-2xl font-extrabold text-green-700">{value}</div>
  </div>
);

const BarChart = ({ data }) => {
  if (!data || data.length === 0) return <div>Veri yok</div>;
  const max = Math.max(...data.map(d => d.total));
  return (
    <div className="flex items-end gap-2 h-40 w-full bg-gray-50 rounded-xl p-4">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center flex-1">
          <div
            className="w-8 rounded-t bg-blue-500 transition-all"
            style={{ height: `${max ? (d.total / max) * 100 : 0}%` }}
            title={d.total + ' ₺'}
          ></div>
          <div className="text-xs mt-2 text-gray-600">{d.month}/{d.year.toString().slice(2)}</div>
        </div>
      ))}
    </div>
  );
};

export default AdminReports; 