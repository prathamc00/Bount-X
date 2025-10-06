
import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MeetupsSection from './components/MeetupsSection';
import HackathonsSection from './components/HackathonsSection';
import BuildToHackSection from './components/BuildToHackSection';
import CommunityMetricsSection from './components/CommunityMetricsSection';
import Footer from './components/Footer';
import ApplicationModal from './components/ApplicationModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="bg-slate-900 font-sans relative overflow-x-hidden">
      <div className="animated-grid"></div>
      
      <Header onApplyClick={handleOpenModal} />

      <main className="relative z-10">
        <HeroSection onApplyClick={handleOpenModal} />
        <MeetupsSection />
        <HackathonsSection />
        <BuildToHackSection onApplyClick={handleOpenModal} />
        <CommunityMetricsSection />
      </main>

      <Footer />

      <ApplicationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default App;
