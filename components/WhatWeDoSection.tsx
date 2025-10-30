import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { CodeIcon, UsersIcon, TrophyIcon } from './Icons';

const WhatWeDoSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const features = [
    {
      icon: CodeIcon,
      title: 'Build Open Source Projects',
      description: 'Join forces with talented hackers to start, contribute to, and maintain impactful open-source projects. Learn real-world collaboration and ship code that matters.'
    },
    {
      icon: TrophyIcon,
      title: 'Dominate Challenges (CTF & Gaming)',
      description: 'We host regular, high-stakes CTF (Capture The Flag) games and technical challenges designed to sharpen your skills in a fun, competitive environment. Level up your game and claim the flag.'
    },
    {
      icon: UsersIcon,
      title: 'Connect & Network',
      description: 'From informal monthly meetups to marathon hackathons, we provide the perfect settings to meet future co-founders, collaborators, and mentors.'
    }
  ];

  return (
    <section id="what-we-do" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-12 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">What We Do</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">We provide the structure and the community; you bring the curiosity and the keyboard.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center transition-all duration-300 ${isVisible ? 'fade-in visible' : 'fade-in'}`} style={{ transitionDelay: `${index * 150}ms`}}>
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-fuchsia-500/10 rounded-full">
                <feature.icon className="w-8 h-8 text-fuchsia-600 dark:text-fuchsia-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;