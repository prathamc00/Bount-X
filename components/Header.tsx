import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useTheme } from '../context/ThemeContext';
import { MenuIcon, XIcon, SearchIcon, SunIcon, MoonIcon } from './Icons';

const Search = lazy(() => import('./Search'));

interface HeaderProps {
  onApplyClick: () => void;
}

const navItems = [
  { label: 'Meetups', href: '#meetups' },
  { label: 'Hackathons', href: '#hackathons' },
  { label: 'Build to Hack', href: '#build-to-hack' },
];

const ThemeToggleButton: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <button
            onClick={toggleTheme}
            className="hidden md:inline-flex items-center justify-center h-10 w-10 text-slate-500 dark:text-slate-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>
    );
};

const Header: React.FC<HeaderProps> = ({ onApplyClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="flex-shrink-0">
              <h1 className="text-2xl font-bold font-mono text-slate-900 dark:text-white tracking-tighter">Bount-X</h1>
            </a>
            <nav aria-label="Main navigation" className="hidden md:flex md:items-center md:space-x-8">
              {navItems.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href} 
                  aria-current={activeSection === item.href.substring(1) ? 'page' : undefined}
                  className={`text-sm font-medium transition-colors duration-300 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 ${activeSection === item.href.substring(1) ? 'text-fuchsia-600 dark:text-fuchsia-400' : 'text-slate-700 dark:text-slate-200 hover:text-fuchsia-600 dark:hover:text-fuchsia-400'}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:inline-flex items-center justify-center h-10 w-10 text-slate-500 dark:text-slate-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
                aria-label="Open search"
              >
                <SearchIcon className="w-5 h-5" />
              </button>
              <ThemeToggleButton />
              <button
                onClick={onApplyClick}
                className="hidden md:inline-flex items-center justify-center px-5 py-2.5 font-medium text-white transition-all duration-300 ease-in-out rounded-md btn-gradient focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
              >
                <span className="relative z-10 text-sm font-semibold">Join as Member</span>
              </button>
              <div className="md:hidden ml-2 flex items-center">
                 <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="text-slate-500 dark:text-slate-200 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950 p-2"
                  aria-label="Open search"
                >
                  <SearchIcon className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setIsOpen(!isOpen)} 
                  className="text-slate-500 dark:text-slate-200 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950 ml-2"
                  aria-controls="mobile-menu"
                  aria-expanded={isOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div id="mobile-menu" className={`md:hidden absolute top-20 left-0 w-full bg-slate-100/95 dark:bg-slate-950/95 backdrop-blur-lg transition-transform duration-300 ease-in-out ${isOpen ? 'transform translate-y-0' : 'transform -translate-y-[150%]'}`}>
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href} 
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 rounded-md"
                >
                  {item.label}
                </a>
              ))}
               <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-4 flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Switch Theme</span>
                    <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                        {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                    </button>
                </div>
              <button
                onClick={() => { onApplyClick(); setIsOpen(false); }}
                className="w-full mt-4 items-center justify-center px-5 py-3 font-medium text-white transition-all duration-300 ease-in-out rounded-md btn-gradient focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
              >
                <span className="relative z-10 text-sm font-semibold">Join as Member</span>
              </button>
            </div>
          </div>
      </header>
      <Suspense fallback={null}>
        <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </Suspense>
    </>
  );
};

export default Header;