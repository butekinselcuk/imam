import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api'

const formatPrice = (value) => new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
  maximumFractionDigits: 0
}).format(Number(value || 0));

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/api/services/${id}`);
        setService(res.data);
      } catch (err) {
        console.error('Servis detay yüklenirken hata:', err);
        setError('Servis detayları yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
          <strong className="font-bold">Hata!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
        <Link to="/services" className="inline-block mt-4 text-blue-600">Hizmetlere Dön</Link>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Servis bulunamadı.</p>
        <Link to="/services" className="inline-block mt-4 text-blue-600">Hizmetlere Dön</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-3">
        <Link to="/services" className="hover:text-blue-600">Hizmetler</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">{service.title}</span>
      </div>

      {/* Hero görsel + fiyat rozeti */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-64">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundColor: service.color || '#f3f4f6', backgroundImage: service.image ? `url(${service.image})` : 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <h1 className="text-3xl font-bold text-white drop-shadow-sm">{service.title}</h1>
            {service.category && (
              <span className="inline-block mt-2 text-xs px-2 py-1 bg-white/80 text-gray-700 rounded-full">
                {service.category.name}
              </span>
            )}
          </div>
          <div className="absolute top-4 right-4">
            <span className="inline-block px-3 py-1 rounded-full bg-green-600 text-white text-sm shadow-md">
              {formatPrice(service.price)}
            </span>
          </div>
        </div>

        {/* İçerik */}
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed">{service.description}</p>

          {service.providerService ? (
            <div className="mt-8 border-t pt-6">
              <h2 className="text-2xl font-semibold">Bu hizmeti sunan sağlayıcı</h2>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <p className="text-sm text-gray-600">Yöntem</p>
                  <p className="font-medium">{service.providerService.method || 'Belirtilmemiş'}</p>
                  <p className="text-sm text-gray-600 mt-2">Hedef Kitle</p>
                  <p className="font-medium">{service.providerService.targetAudience || 'Genel'}</p>
                  <p className="text-sm text-gray-600 mt-2">Fiyat</p>
                  <p className="font-semibold text-blue-600">{formatPrice(service.providerService.price ?? service.price)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <p className="text-sm text-gray-600">Sağlayıcı</p>
                  <p className="font-medium">
                    {service.providerService.provider?.expertise || 'Sağlayıcı bilgisi'}
                  </p>
                  {service.providerService.provider?.id && (
                    <Link 
                      to={`/providers/${service.providerService.provider.id}`} 
                      className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Sağlayıcı Profilini Gör
                    </Link>
                  )}
                </div>
              </div>

              {service.providerService.provider?.id && (
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link 
                    to={`/providers/${service.providerService.provider.id}`} 
                    className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 shadow"
                  >
                    Şimdi Rezervasyon Yap
                  </Link>
                  <Link 
                    to={`/providers/${service.providerService.provider.id}`} 
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Sağlayıcıya Mesaj Gönder
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-8 border-t pt-6">
              <h2 className="text-2xl font-semibold">Sağlayıcı bilgisi</h2>
              <p className="text-gray-600 mt-2">Bu hizmet için kayıtlı bir sağlayıcı bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;