import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const CommunityShowcaseSection: React.FC = () => {
    const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

    return (
        <section className="relative py-20 sm:py-28 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div ref={ref} className={`max-w-3xl mx-auto text-center transition-all duration-700 ${isVisible ? 'fade-in visible' : 'fade-in'}`}>
                    <h2 className="text-xl font-mono text-fuchsia-600 dark:text-fuchsia-400">Our Core Mission</h2>
                    <p className="mt-4 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                        Discover the Joy of Code, Together.
                    </p>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
                        Every week, we gather to build, learn, and break in a supportive, zero-judgment environment. Whether you're a seasoned professional or just wrote your first line of code, there is a place for you at Bount-X.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CommunityShowcaseSection;