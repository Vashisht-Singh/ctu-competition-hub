import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-slate-200/80 py-6 text-center text-xs text-slate-500">
        <p className="font-bold text-slate-700">CTU Competition Hub &bull; CT University, Ludhiana, Punjab, India</p>
        <p className="mt-1 text-[11px] text-slate-400">Directorate of Student Welfare (DSW) &bull; Enterprise Competition Management System</p>
      </footer>
    </div>
  );
};
