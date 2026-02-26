import { Outlet } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { AuthProvider } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { initializeMockData } from '../utils/mockData';
import { Toaster } from 'sonner';

export function RootLayout() {
  useEffect(() => {
    initializeMockData();
  }, []);

  return (
    <AuthProvider>
      <ScrollToTop />
      <Toaster position="top-right" richColors />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}