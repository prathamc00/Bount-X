import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon } from './Icons';

interface HeaderProps {
  onApplyClick: () => void;
}

const navItems = [
  { label: 'Meetups', href: '#meetups' },
  { label: 'Hackathons', href: '#hackathons' },
  { label: 'Build to Hack', href: '#build-to-hack' },
];

const Header: React.FC<HeaderProps> = ({ onApplyClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      const sections = navItems.map(item => document.getElementById(item.href.substring(1)));
      let currentSection = '';
      
      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop - 100;
          if (window.scrollY >= sectionTop) {
            currentSection = section.id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-lg border-b border-slate-700' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex-shrink-0">
            <h1 className="text-2xl font-bold font-mono text-white tracking-tighter">Bount-X</h1>
          </a>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className={`text-sm font-medium transition-colors duration-300 ${activeSection === item.href.substring(1) ? 'text-violet-400' : 'text-slate-200 hover:text-violet-400'}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center">
            <button
              onClick={onApplyClick}
              className="hidden md:inline-flex relative items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-violet-400 transition-all duration-300 ease-in-out border-2 border-violet-400 rounded-md group"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-violet-400 transition-all duration-300 ease-in-out transform -translate-x-full group-hover:translate-x-0"></span>
              <span className="relative z-10 text-sm font-semibold transition-colors duration-300 ease-in-out group-hover:text-slate-900">Join as Member</span>
            </button>
            <div className="md:hidden ml-4">
              <button onClick={() => setIsOpen(!isOpen)} className="text-slate-200 hover:text-violet-400">
                {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-20 left-0 w-full bg-slate-900/95 backdrop-blur-lg transition-transform duration-300 ease-in-out ${isOpen ? 'transform translate-y-0' : 'transform -translate-y-[150%]'}`}>
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-slate-200 hover:text-violet-400 rounded-md"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => { onApplyClick(); setIsOpen(false); }}
              className="w-full mt-4 relative items-center justify-center px-6 py-3 overflow-hidden font-medium text-violet-400 transition-all duration-300 ease-in-out border-2 border-violet-400 rounded-md group"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-violet-400 transition-all duration-300 ease-in-out transform -translate-x-full group-hover:translate-x-0"></span>
              <span className="relative z-10 text-sm font-semibold transition-colors duration-300 ease-in-out group-hover:text-slate-900">Join as Member</span>
            </button>
          </div>
        </div>
    </header>
  );
};

export default Header;