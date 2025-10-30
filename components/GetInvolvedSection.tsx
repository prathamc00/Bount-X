import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { ArrowRightIcon } from './Icons';

const GetInvolvedSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  const actions = [
    {
      title: 'Build Open Source Projects with us.',
      description: 'Contribute to our collective projects.',
      linkText: '(Link to GitHub/Projects Page)',
      href: '#' // Placeholder
    },
    {
      title: 'Host a Hackathon with us.',
      description: 'Partner with us for an event.',
      linkText: '(Link to Partnership/Contact Form)',
      href: '#' // Placeholder
    },
    {
      title: 'Host a Hackers Meetup with us.',
      description: 'Organize a local gathering.',
      linkText: '(Link to Event Submission/Organizers Form)',
      href: '#' // Placeholder
    },
  ];

  return (
    <section id="get-involved" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-12 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">Get Involved Today</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {actions.map((action, index) => (
             <div 
              key={index} 
              className={`bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-8 flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isVisible ? 'fade-in visible' : 'fade-in'}`} 
              style={{ transitionDelay: `${index * 150}ms`}}
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex-grow">{action.title}</h3>
              <a href={action.href} className="group inline-flex items-center font-semibold text-fuchsia-600 dark:text-fuchsia-400 hover:text-fuchsia-500 transition-colors mt-auto">
                <span>{action.linkText}</span>
                <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;