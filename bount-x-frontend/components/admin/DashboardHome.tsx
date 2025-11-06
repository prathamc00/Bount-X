import React, { useState, useEffect } from 'react';
import { BriefcaseIcon, CalendarIcon, ChevronDownIcon, ChartBarIcon, CodeIcon } from '../Icons';
import { apiService } from '../../services/api';

const competitorRankings: any[] = [];
const topSources: any[] = [];


const DashboardHome: React.FC = () => {
    const [kpiData, setKpiData] = useState([
        { title: 'New Members (30d)', value: 'Loading...', subtitle: 'Fetching data...' },
        { title: 'Applications Pending', value: 'Loading...', subtitle: 'Fetching data...' },
        { title: 'Upcoming Events', value: 'Loading...', subtitle: 'Fetching data...' },
        { title: 'Active Projects', value: 'Loading...', subtitle: 'Fetching data...' },
    ]);
    const [memberGrowthData, setMemberGrowthData] = useState<any[]>([]);
    const [skillData, setSkillData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            // Load KPIs
            const kpis = await apiService.getKPIs();
            setKpiData([
                { title: 'New Members (30d)', value: kpis.newMembers.toString(), subtitle: 'New registrations' },
                { title: 'Applications Pending', value: kpis.applicationsPending.toString(), subtitle: 'Awaiting review' },
                { title: 'Upcoming Events', value: kpis.upcomingEvents.toString(), subtitle: 'Scheduled events' },
                { title: 'Active Projects', value: kpis.activeProjects.toString(), subtitle: 'In development' },
            ]);

            // Load member growth data
            try {
                const growthData = await apiService.getMemberGrowth();
                setMemberGrowthData(growthData.data || []);
            } catch (err) {
                console.warn('Failed to load member growth data:', err);
            }

            // Load skill distribution
            try {
                const skillDistribution = await apiService.getSkillDistribution();
                setSkillData(skillDistribution.data || []);
            } catch (err) {
                console.warn('Failed to load skill distribution:', err);
            }

        } catch (error) {
            console.error('Failed to load dashboard data:', error);
            setKpiData([
                { title: 'New Members (30d)', value: 'Error', subtitle: 'Failed to load' },
                { title: 'Applications Pending', value: 'Error', subtitle: 'Failed to load' },
                { title: 'Upcoming Events', value: 'Error', subtitle: 'Failed to load' },
                { title: 'Active Projects', value: 'Error', subtitle: 'Failed to load' },
            ]);
        } finally {
            setLoading(false);
        }
    };

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
                    <SkillDistribution data={skillData} />
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

const SkillDistribution: React.FC<{ data: any[] }> = ({ data }) => (
    <div className="bg-white border border-neutral-200 rounded-lg p-6 h-full flex flex-col">
        <h3 className="text-md font-semibold text-neutral-800 mb-4">Skill Distribution</h3>
        {data.length > 0 ? (
            <div className="space-y-3">
                <div className="flex justify-between text-xs text-neutral-500">
                    <span>Skill</span>
                    <span>Count</span>
                </div>
                {data.map((item, index) => (
                    <div key={index} className="flex items-center text-sm">
                        <span className="flex-grow font-medium text-neutral-700">{item.skill}</span>
                        <span className="font-semibold text-neutral-800">{item.count}</span>
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