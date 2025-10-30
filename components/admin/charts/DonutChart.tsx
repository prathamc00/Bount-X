import React from 'react';

interface DonutChartProps {
    data: { name: string; value: number; color: string }[];
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    let accumulatedPercentage = 0;

    return (
        <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle
                    className="text-slate-700"
                    strokeWidth="15"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                />
                {data.map((segment, index) => {
                    const dashArray = (segment.value / 100) * circumference;
                    const dashOffset = circumference - (accumulatedPercentage / 100) * circumference;
                    accumulatedPercentage += segment.value;

                    return (
                        <circle
                            key={index}
                            strokeWidth="15"
                            strokeDasharray={`${dashArray} ${circumference}`}
                            strokeDashoffset={dashOffset}
                            strokeLinecap="butt"
                            stroke={segment.color}
                            fill="transparent"
                            r={radius}
                            cx="60"
                            cy="60"
                            transform="rotate(-90 60 60)"
                            style={{ transition: 'stroke-dashoffset 0.5s' }}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

export default DonutChart;
