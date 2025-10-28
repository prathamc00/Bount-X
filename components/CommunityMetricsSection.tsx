import React, { useState, useEffect } from 'react';
import { CommunityMetric } from '../types';
import { communityMetrics } from '../data/mockData';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const AnimatedCounter: React.FC<{ value: number; duration?: number }> = ({ value, duration = 1500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalFrames = duration / (1000 / 60);
    const increment = end / totalFrames;

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(parseFloat(start.toFixed(1)));
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const MetricCard: React.FC<{ metric: CommunityMetric; index: number }> = ({ metric, index }) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.5 });
  
  return (
    <div
      ref={ref}
      className={`bordered-card rounded-xl p-6 text-center transition-all duration-300 ${isVisible ? 'fade-in visible' : 'fade-in'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <p className="text-slate-400 text-sm font-medium">{metric.label}</p>
      <p className="text-5xl font-bold text-fuchsia-400 my-2">
        {isVisible && <AnimatedCounter value={metric.value} />}
        {metric.unit && <span className="text-4xl">{metric.unit}</span>}
      </p>
    </div>
  );
};

const CommunityMetricsSection: React.FC = () => {
    const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

    return (
    <section id="metrics" className="py-20 sm:py-28 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-12 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-white tracking-tight">Community Velocity</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">Abstract technical visualizations of our collective momentum and growth.</p>
        </div>
        {communityMetrics.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {communityMetrics.map((metric, index) => (
              <MetricCard key={metric.id} metric={metric} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center bordered-card rounded-xl p-12">
            <h3 className="text-xl font-bold text-white">Metrics Coming Soon</h3>
            <p className="mt-2 text-slate-400">We are gathering data to showcase our community's growth. Check back later.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunityMetricsSection;