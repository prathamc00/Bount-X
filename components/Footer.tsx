import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
             <h1 className="text-xl font-bold font-mono text-white tracking-tighter">Bount-X</h1>
             <p className="text-sm text-slate-400 mt-1">&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div className="text-sm text-slate-400 font-medium">
            Backed By: <span className="text-violet-400 font-bold">Zetpeak</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;