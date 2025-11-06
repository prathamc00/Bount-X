import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-t from-slate-50 dark:from-slate-950 via-slate-50/90 dark:via-slate-950/90 to-transparent pt-20 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
             <h1 className="text-xl font-bold font-mono text-slate-900 dark:text-white">Bount-X</h1>
             <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;