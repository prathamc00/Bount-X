import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CommunityShowcaseSection from './components/CommunityShowcaseSection';
import MeetupsSection from './components/MeetupsSection';
import HackathonsSection from './components/HackathonsSection';
import BuildToHackSection from './components/BuildToHackSection';
import CommunityMetricsSection from './components/CommunityMetricsSection';
import Footer from './components/Footer';
import ApplicationModal from './components/ApplicationModal';
import { ApplicationFormData } from './types';
import { CodeIcon, DesignIcon, HackerIcon } from './components/Icons';

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
    <div className="font-sans bg-slate-950 min-h-screen flex items-center justify-center p-4 relative">
      <div className="w-full max-w-2xl mx-auto z-10">
        <div className="bordered-card rounded-xl shadow-2xl p-8 animate-fade-in-up">
          <div className="text-center">
             <span className="inline-block bg-fuchsia-500/10 text-fuchsia-400 text-sm font-semibold px-4 py-1 rounded-full">
              Pending Review
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">Application Submitted</h1>
            <p className="text-slate-400 mt-2">Your application is under review. We'll contact you via email within 48 hours.</p>
          </div>
          
          <div className="border-t border-b border-slate-700 my-8 py-6 px-2 space-y-4">
            <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Name</span>
                <span className="text-white font-semibold">{application.name}</span>
            </div>
             <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Email</span>
                <span className="text-white font-semibold">{application.email}</span>
            </div>
             <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Phone</span>
                <span className="text-white font-semibold">{application.phone}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Primary Skill</span>
                <span className="flex items-center text-white font-semibold">
                    <SkillIcon className="w-4 h-4 mr-2 text-fuchsia-400"/>
                    {application.skill}
                </span>
            </div>
             <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Experience</span>
                <span className="text-white font-semibold">{application.experience}</span>
            </div>
            <div className="flex justify-between items-center break-all">
                <span className="text-slate-400 font-medium">Projects</span>
                <a href={application.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-fuchsia-400 font-semibold hover:underline">{application.portfolioUrl}</a>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-slate-400 text-sm">Need to submit a new application?</p>
            <button 
                onClick={onReset}
                className="mt-2 text-fuchsia-400 font-semibold hover:text-fuchsia-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 rounded"
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
  
  if (application) {
    return <ApplicationStatus application={application} onReset={handleResetApplication} />;
  }

  return (
    <div className="bg-slate-950 font-sans relative overflow-x-hidden">
      <Header onApplyClick={handleOpenModal} />

      <main className="relative z-10">
        <HeroSection onApplyClick={handleOpenModal} />
        <CommunityShowcaseSection />
        <MeetupsSection />
        <HackathonsSection />
        <BuildToHackSection onApplyClick={handleOpenModal} />
        <CommunityMetricsSection />
      </main>

      <Footer />

      <ApplicationModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmitSuccess={handleApplicationSubmit} />
    </div>
  );
};

export default App;