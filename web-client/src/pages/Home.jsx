import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ProviderCard from '../components/ProviderCard';
import Stats from '../components/Stats';
import ReviewCard from '../components/ReviewCard';
import useFetch from '../hooks/useFetch';
import useAuth from '../hooks/useAuth';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const { data: providers, loading: loadingProviders, error: errorProviders } = useFetch('/api/providers');
  const { data: reviews, loading: loadingReviews, error: errorReviews } = useFetch('/api/reviews');
  const { data: categories } = useFetch('/api/categories');
  const { user } = useAuth();
  const { data: siteSettings } = useFetch('/api/admin/site-settings');

  const providerCount = providers ? providers.length : 0;
  const categoryCount = categories ? categories.length : 0;
  const customerCount = 5000;
  const satisfaction = '98%';

  const categoryRowRef = useRef(null);
  const scrollCategories = (dir) => {
    if (categoryRowRef.current) {
      const scrollAmount = 300;
      categoryRowRef.current.scrollBy({ left: dir === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    }
  };

  const reviewRowRef = useRef(null);
  const scrollReviews = (dir) => {
    if (reviewRowRef.current) {
      const scrollAmount = 400;
      reviewRowRef.current.scrollBy({ left: dir === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-green-50 px-2 sm:px-4 pb-16">
      <Helmet>
        <title>{siteSettings?.siteTitle || siteSettings?.seoTitle || 'Hizmet Platformu'}</title>
        <meta name="description" content={siteSettings?.seoDescription || 'Türkiye için çok katmanlı hizmet platformu'} />
      </Helmet>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-800 mb-6 text-center drop-shadow leading-tight">{siteSettings?.siteTitle || siteSettings?.seoTitle || "Türkiye'nin Çok Katmanlı Hizmet Platformu"}</h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-10 text-center max-w-2xl">
        {siteSettings?.seoDescription || "Uzmanlarla güvenli, hızlı ve kolayca buluşun. Dini, sosyal ve psikolojik danışmanlık hizmetleri tek platformda. Hemen kayıt olun, profesyonel destek alın."}
      </p>
      {!user && (
        <div className="flex flex-col md:flex-row gap-4 mb-10 w-full max-w-md md:max-w-none justify-center">
          <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg text-lg transition">Kayıt Ol</Link>
          <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg text-lg transition">Giriş Yap</Link>
        </div>
      )}
      {/* Arama kutusu */}
      <div className="w-full max-w-2xl mb-8 md:mb-10">
        <input type="text" placeholder="Hizmet veya uzman ara..." className="w-full p-3 md:p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 shadow" />
      </div>
      {/* Ana Kategoriler */}
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">Kategoriler</h2>
      <div className="relative w-full max-w-6xl mb-10">
        <button onClick={() => scrollCategories('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-100 transition">
          <span className="text-2xl">&#8592;</span>
        </button>
        <div ref={categoryRowRef} className="flex flex-row gap-4 overflow-x-auto pb-2 px-12 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {categories && categories.map((cat, i) => (
            <Link key={i} to={`/providers?categoryId=${cat.id}`} className="hover:no-underline min-w-[220px] max-w-[240px] flex-shrink-0">
              <div className="rounded-2xl shadow-xl p-8 flex flex-col items-center transition transform hover:-translate-y-1 hover:shadow-2xl bg-white">
                <img src={cat.image || 'https://cdn-icons-png.flaticon.com/512/2922/2922510.png'} alt={cat.name} className="w-24 h-24 mb-4 rounded-full object-cover border-4 border-white shadow" />
                <h3 className="font-bold text-lg mb-2 text-center">{cat.name}</h3>
                <p className="text-gray-700 text-center text-sm mb-2">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <button onClick={() => scrollCategories('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-100 transition">
          <span className="text-2xl">&#8594;</span>
        </button>
      </div>
      {/* Popüler Sağlayıcılar */}
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">Popüler Sağlayıcılar</h2>
      {loadingProviders ? (
        <div>Yükleniyor...</div>
      ) : errorProviders ? (
        <div className="text-red-500">Sağlayıcılar yüklenemedi.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 w-full max-w-6xl">
          {providers && providers.flatMap((p, i) =>
            (p.providerServices || []).map((service, idx) => (
              <ProviderCard
                key={p.id + '-' + service.id}
                user={p.user}
                providerId={p.id}
                location={p.location || '-'}
                services={[service]}
                image={p.image}
                onCardClick={() => window.location.href = `/providers/${p.id}`}
              />
            ))
          )}
        </div>
      )}
      {/* İstatistikler */}
      <Stats providerCount={providerCount} categoryCount={categoryCount} customerCount={customerCount} satisfaction={satisfaction} />
      {/* Müşteri Yorumları */}
      <h2 className="text-2xl font-bold text-center mb-4">Müşteri Yorumları</h2>
      {loadingReviews ? (
        <div>Yükleniyor...</div>
      ) : errorReviews ? (
        <div className="text-red-500">Yorumlar yüklenemedi.</div>
      ) : (
        <div className="relative w-full max-w-6xl mb-12">
          <button onClick={() => scrollReviews('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-100 transition">
            <span className="text-2xl">&#8592;</span>
          </button>
          <div ref={reviewRowRef} className="flex flex-row gap-6 overflow-x-auto pb-2 px-12 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {reviews && reviews.map((r, i) => (
              <ReviewCard
                key={i}
                user={r.user}
                rating={r.rating}
                comment={r.comment}
                createdAt={r.createdAt}
                service={r.service}
              />
            ))}
          </div>
          <button onClick={() => scrollReviews('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-100 transition">
            <span className="text-2xl">&#8594;</span>
          </button>
        </div>
      )}
      {/* Footer */}
      <footer className="w-full text-center text-gray-500 mt-12 pt-8 border-t">{siteSettings?.footerText || `© 2024 ${siteSettings?.siteTitle || 'Hizmet Platformu'}`}</footer>
    </div>
  );
};

export default Home; 