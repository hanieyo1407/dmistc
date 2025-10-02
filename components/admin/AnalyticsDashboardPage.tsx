import React from 'react';
import PortalHeader from '../member/PortalHeader';
import UserGroupIcon from '../icons/UserGroupIcon';
import BriefcaseIcon from '../icons/BriefcaseIcon';
import CalendarPlusIcon from '../icons/CalendarPlusIcon';

interface AnalyticsDashboardPageProps {
    onBack: () => void;
}

const StatCard: React.FC<{ title: string, value: string, icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">{icon}</div>
        <div>
            <p className="text-3xl font-bold text-text-main-light dark:text-white">{value}</p>
            <p className="text-text-muted-light dark:text-text-muted-dark">{title}</p>
        </div>
    </div>
);

const ChartPlaceholder: React.FC<{ title: string, heightClass?: string }> = ({ title, heightClass = 'h-64' }) => (
    <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
        <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-4">{title}</h3>
        <div className={`flex items-center justify-center bg-light-bg dark:bg-dark-bg rounded-lg ${heightClass}`}>
            <p className="text-text-muted-light dark:text-text-muted-dark text-sm">Ma Charts azizakhala apa.</p>
        </div>
    </div>
);

const AnalyticsDashboardPage: React.FC<AnalyticsDashboardPageProps> = ({ onBack }) => {
    return (
        <div>
            <PortalHeader title="Full Analytics Dashboard" onBack={onBack} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Members" value="152" icon={<UserGroupIcon className="w-8 h-8 text-primary"/>} />
                <StatCard title="Projects Submitted" value="89" icon={<BriefcaseIcon className="w-8 h-8 text-primary"/>} />
                <StatCard title="Events Hosted" value="24" icon={<CalendarPlusIcon className="w-8 h-8 text-primary"/>} />
            </div>

            <div className="space-y-8">
                <ChartPlaceholder title="Member Growth Over Time" />
                
                <div className="grid lg:grid-cols-2 gap-8">
                    <ChartPlaceholder title="Project Submissions by Category" />
                    <ChartPlaceholder title="Event Attendance Trends" />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboardPage;
