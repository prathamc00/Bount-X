import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CommunityShowcaseSection from './components/CommunityShowcaseSection';
import MeetupsSection from './components/MeetupsSection';
import HackathonsSection from './components/HackathonsSection';
import BuildToHackSection from './components/BuildToHackSection';
import Footer from './components/Footer';
import { ApplicationFormData } from './types';
import { CodeIcon, DesignIcon, HackerIcon } from './components/Icons';
import WhatWeDoSection from './components/WhatWeDoSection';
import JoinTheCollectiveSection from './components/JoinTheCollectiveSection';
import GetInvolvedSection from './components/GetInvolvedSection';

const ApplicationModal = lazy(() => import('./components/ApplicationModal'));
const LandingPage = lazy(() => import('./components/LandingPage'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const ConstellationBackground = lazy(() => import('./components/ConstellationBackground'));


// Sub-component for Application Status Page
const ApplicationStatus: React.FC<{
  application: ApplicationFormData;
  onReset: () => void;
}> = ({ application, onReset }) => {
  const SkillIcon = {
    Hacker: HackerIcon,
    Designer: DesignIcon,
    Developer: CodeIcon,
  }[application.skill || 'Developer'];

  return (
    <div className="font-sans bg-slate-50 dark:bg-slate-950 min-h-screen flex items-center justify-center p-4 relative">
      <div className="w-full max-w-2xl mx-auto z-10">
        <div className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl p-8 animate-fade-in-up">
          <div className="text-center">
             <span className="inline-block bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 text-sm font-semibold px-4 py-1 rounded-full">
              Pending Review
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-4">Application Submitted</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Your application is under review. We'll contact you via email within 48 hours.</p>
          </div>
          
          <div className="border-t border-b border-slate-200 dark:border-slate-700 my-8 py-6 px-2 space-y-4">
            <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Name</span>
                <span className="text-slate-900 dark:text-white font-semibold">{application.name}</span>
            </div>
             <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Email</span>
                <span className="text-slate-900 dark:text-white font-semibold">{application.email}</span>
            </div>
             <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Phone</span>
                <span className="text-slate-900 dark:text-white font-semibold">{application.phone}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Primary Skill</span>
                <span className="flex items-center text-slate-900 dark:text-white font-semibold">
                    <SkillIcon className="w-4 h-4 mr-2 text-fuchsia-600 dark:text-fuchsia-400"/>
                    {application.skill}
                </span>
            </div>
             <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Experience</span>
                <span className="text-slate-900 dark:text-white font-semibold">{application.experience}</span>
            </div>
            <div className="flex justify-between items-center break-all">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Projects</span>
                <a href={application.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold hover:underline">{application.portfolioUrl}</a>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm">Need to submit a new application?</p>
            <button 
                onClick={onReset}
                className="mt-2 text-fuchsia-600 dark:text-fuchsia-400 font-semibold hover:text-fuchsia-500 dark:hover:text-fuchsia-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 rounded"
            >
                Reset Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [application, setApplication] = useState<ApplicationFormData | null>(null);
  const [siteEntered, setSiteEntered] = useState(sessionStorage.getItem('bountx_entered') === 'true');
  const [view, setView] = useState<'site' | 'admin'>('site');
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    try {
      const storedApp = localStorage.getItem('bountx_application');
      if (storedApp) {
        setApplication(JSON.parse(storedApp));
      }
    } catch (error) {
      console.error("Failed to parse application from localStorage", error);
      localStorage.removeItem('bountx_application');
    }
  }, []);
  
  useEffect(() => {
    const handleHashChange = () => {
      setView(window.location.hash === '#admin' ? 'admin' : 'site');
    };
    window.addEventListener('hashchange', handleHashChange, false);
    handleHashChange(); // Check on initial load
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleEnterSite = () => {
    sessionStorage.setItem('bountx_entered', 'true');
    setSiteEntered(true);
  };

  const handleOpenModal = () => {
    triggerRef.current = document.activeElement as HTMLElement;
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
     setIsModalOpen(false);
     triggerRef.current?.focus();
  }

  const handleApplicationSubmit = (formData: ApplicationFormData) => {
    localStorage.setItem('bountx_application', JSON.stringify(formData));
    setApplication(formData);
    handleCloseModal();
  };

  const handleResetApplication = () => {
    localStorage.removeItem('bountx_application');
    setApplication(null);
  };
  
  if (view === 'admin') {
    return (
       <Suspense fallback={<div className="w-screen h-screen bg-slate-950" />}>
        <AdminDashboard />
      </Suspense>
    )
  }

  if (application) {
    return <ApplicationStatus application={application} onReset={handleResetApplication} />;
  }
  
  if (!siteEntered) {
    return (
      <Suspense fallback={<div className="w-screen h-screen bg-slate-950" />}>
        <LandingPage onEnter={handleEnterSite} />
      </Suspense>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 font-sans relative overflow-x-hidden animate-fade-in-slow">
      {/* Global Background Elements */}
      <Suspense fallback={null}>
        <ConstellationBackground />
      </Suspense>
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 grid-background animate-move-grid" />
      </div>

      <Header onApplyClick={handleOpenModal} />

      <main className="relative z-10">
        <HeroSection onApplyClick={handleOpenModal} />
        <CommunityShowcaseSection />
        <WhatWeDoSection />
        <MeetupsSection />
        <HackathonsSection />
        <BuildToHackSection onApplyClick={handleOpenModal} />
        <JoinTheCollectiveSection />
        <GetInvolvedSection />
      </main>

      <Footer />

      <Suspense fallback={null}>
        <ApplicationModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmitSuccess={handleApplicationSubmit} />
      </Suspense>
    </div>
  );
};

export default App;