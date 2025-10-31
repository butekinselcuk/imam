import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import ProviderDetail from './pages/ProviderDetail';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import AdminStaticPages from './pages/AdminStaticPages';
import AdminPanel from './pages/AdminPanel';
import AdminLogs from './pages/AdminLogs';
import AdminBackup from './pages/AdminBackup';
import ProviderPanel from './pages/ProviderPanel';
import ProviderList from './pages/ProviderList';
import ProviderProfile from './pages/ProviderProfile';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Notifications from './pages/Notifications';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/providers/:id" element={<ProviderDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/static-pages" element={isAdmin() ? <AdminStaticPages /> : <Home />} />
            <Route path="/admin" element={isAdmin() ? <AdminPanel /> : <Home />} />
            <Route path="/admin/logs" element={isAdmin() ? <AdminLogs /> : <Home />} />
            <Route path="/admin/backup" element={isAdmin() ? <AdminBackup /> : <Home />} />
            <Route path="/provider-panel" element={<ProviderPanel />} />
            <Route path="/providers" element={<ProviderList />} />
            <Route path="/provider-profile" element={<ProviderProfile />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

function isAdmin() {
  try {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role === 'admin';
  } catch {
    return false;
  }
}

export default App;
