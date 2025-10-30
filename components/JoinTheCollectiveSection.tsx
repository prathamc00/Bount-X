import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const JoinTheCollectiveSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="collective" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 md:p-12 lg:p-16 text-center transition-all duration-700 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">
            Join the Collective
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Bount-X is a melting pot of skill levels and backgrounds. We replace ego with collaboration.
            Meet the hackers who are better than you—and the hackers who are learning right alongside you. A Real Home for Hackers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default JoinTheCollectiveSection;