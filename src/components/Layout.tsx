import React from 'react';
import Navbar from './Navbar';
import StatusBar from './StatusBar';
import { useSafety } from '../context/SafetyContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { alertActive } = useSafety();

  return (
    <div className={`min-h-screen flex flex-col ${alertActive ? 'bg-red-100' : 'bg-gray-50'}`}>
      <StatusBar />
      <main className="flex-grow container mx-auto px-4 py-6 transition-all duration-500">
        {children}
      </main>
      <Navbar />
    </div>
  );
};

export default Layout;