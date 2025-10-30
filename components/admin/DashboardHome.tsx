import React from 'react';
import { BriefcaseIcon, CalendarIcon, ChevronDownIcon, ChartBarIcon, CodeIcon } from '../Icons';

const kpiData = [
    { title: 'New Members (30d)', value: 'N/A', subtitle: 'No data available' },
    { title: 'Applications Pending', value: 'N/A', subtitle: 'No data available' },
    { title: 'Upcoming Events', value: 'N/A', subtitle: 'No data available' },
    { title: 'Active Projects', value: 'N/A', subtitle: 'No data available' },
];

const competitorRankings: any[] = [];
const topSources: any[] = [];


const DashboardHome: React.FC = () => {
    return (
        <div className="animate-fade-in-up space-y-6">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-semibold text-neutral-800">Dashboard</h1>
                <div className="flex items-center gap-2">
                    <FilterButton icon={BriefcaseIcon} text="All Activities" />
                    <FilterButton icon={CalendarIcon} text="Last 30 Days" />
                    <FilterButton icon={CodeIcon} text="All Skills" />
                </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map(item => <KpiCard key={item.title} {...item} />)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <MemberGrowthChart />
                </div>
                <div>
                    <SkillDistribution />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <CommunityActivityChart />
                </div>
                <div>
                    <TopProjects />
                </div>
            </div>
        </div>
    );
};


const FilterButton: React.FC<{ icon: React.FC<any>, text: string }> = ({ icon: Icon, text }) => (
    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-200 rounded-md text-sm text-neutral-700 hover:bg-neutral-50">
        <Icon className="w-4 h-4 text-neutral-500" />
        <span>{text}</span>
        <ChevronDownIcon className="w-4 h-4 text-neutral-500" />
    </button>
);

const KpiCard: React.FC<(typeof kpiData)[0]> = ({ title, value, subtitle }) => (
    <div className="bg-white border border-neutral-200 rounded-lg p-4">
        <h3 className="text-sm text-neutral-600">{title}</h3>
        <p className="text-3xl font-semibold text-neutral-800 my-1">{value}</p>
        <p className="text-xs text-neutral-500">{subtitle}</p>
    </div>
);

const MemberGrowthChart: React.FC = () => (
    <div className="bg-white border border-neutral-200 rounded-lg p-6 h-full flex flex-col min-h-[300px]">
        <h3 className="text-md font-semibold text-neutral-800 mb-4">Member Growth</h3>
        <div className="flex-grow flex items-center justify-center text-neutral-500 text-sm">
            <ChartBarIcon className="w-8 h-8 mr-2 text-neutral-400" />
            No member data to display.
        </div>
    </div>
);

const CommunityActivityChart: React.FC = () => (
     <div className="bg-white border border-neutral-200 rounded-lg p-6 h-full flex flex-col min-h-[240px]">
        <h3 className="text-md font-semibold text-neutral-800 mb-4">Community Activity</h3>
        <div className="flex-grow flex items-center justify-center text-neutral-500 text-sm">
             <ChartBarIcon className="w-8 h-8 mr-2 text-neutral-400" />
            No activity data to display.
        </div>
    </div>
);

const SkillDistribution: React.FC = () => (
    <div className="bg-white border border-neutral-200 rounded-lg p-6 h-full flex flex-col">
        <h3 className="text-md font-semibold text-neutral-800 mb-4">Skill Distribution</h3>
        {competitorRankings.length > 0 ? (
            <div className="space-y-3">
                <div className="flex justify-between text-xs text-neutral-500">
                    <span>Rank</span>
                    <span>Competitor</span>
                    <span>Market Share</span>
                </div>
                {competitorRankings.map(item => (
                    <div key={item.rank} className="flex items-center text-sm">
                        <span className="w-8 text-neutral-500">{item.rank}</span>
                        <span className="flex-grow font-medium text-neutral-700">{item.name}</span>
                        <span className="font-semibold text-neutral-800">{item.value}</span>
                    </div>
                ))}
            </div>
        ) : (
            <div className="flex-grow flex items-center justify-center text-neutral-500 text-sm">
                No skill data available.
            </div>
        )}
    </div>
);

const TopProjects: React.FC = () => (
    <div className="bg-white border border-neutral-200 rounded-lg p-6 h-full flex flex-col">
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold text-neutral-800">Top Projects</h3>
            <a href="#" className="text-sm text-blue-600 font-medium">View All</a>
        </div>
        {topSources.length > 0 ? (
            <div className="space-y-3">
                 <div className="flex justify-between text-xs text-neutral-500">
                    <span className="w-8">Rank</span>
                    <span className="flex-grow">Web Page</span>
                    <span>Total Citations</span>
                </div>
                {topSources.map(item => (
                    <div key={item.rank} className="flex items-start text-sm">
                        <span className="w-8 text-neutral-500 pt-1">{item.rank}</span>
                        <div className="flex-grow">
                            <p className="font-medium text-neutral-700">{item.name}</p>
                            <p className="text-xs text-neutral-500">{item.url}</p>
                        </div>
                        <span className="font-semibold text-neutral-800 pt-1">{item.citations}</span>
                    </div>
                ))}
            </div>
        ) : (
             <div className="flex-grow flex items-center justify-center text-neutral-500 text-sm">
                No project data available.
            </div>
        )}
    </div>
);

export default DashboardHome;