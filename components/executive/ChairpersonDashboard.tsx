import React from 'react';
import type { User } from '../../types';
import TaskManager from '../TaskManager';
import UserProfileIcon from '../icons/UserProfileIcon';
import MegaphoneIcon from '../icons/MegaphoneIcon';
import CalendarPlusIcon from '../icons/CalendarPlusIcon';
import TrendingUpIcon from '../icons/TrendingUpIcon';
import CheckBadgeIcon from '../icons/CheckBadgeIcon';
import DocumentTextIcon from '../icons/DocumentTextIcon';
import ChatIcon from '../icons/ChatIcon';
import UserPlusIcon from '../icons/UserPlusIcon';
import { pendingProjects, pendingRegistrations, events } from '../../data/mockData';

interface ChairpersonDashboardProps {
    user: User;
    onNavigateProfile: () => void;
    onNavigateTo: (view: any) => void;
}

const MetricCard: React.FC<{title: string; value: string; icon: React.ReactNode}> = ({title, value, icon}) => (
    <div className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border p-4 rounded-lg flex items-center gap-4">
        <div className="text-primary">{icon}</div>
        <div>
            <p className="text-2xl font-bold text-text-main-light dark:text-white">{value}</p>
            <p className="text-text-muted-light dark:text-text-muted-dark text-sm">{title}</p>
        </div>
    </div>
);


const ChairpersonDashboard: React.FC<ChairpersonDashboardProps> = ({ user, onNavigateProfile, onNavigateTo }) => {
    return (
        <>
            <div className="mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold font-poppins text-text-main-light dark:text-white">
                    Chairperson's <span className="custom-gradient-text">Dashboard</span>
                </h1>
                <p className="mt-2 text-lg text-text-muted-light dark:text-text-muted-dark">Welcome, {user.name}. Overview of the club's status.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               <MetricCard title="Member Growth (30d)" value="+12%" icon={<TrendingUpIcon className="w-8 h-8"/>} />
               <MetricCard title="Pending Projects" value={String(pendingProjects.length)} icon={<CheckBadgeIcon className="w-8 h-8"/>} />
               <MetricCard title="Upcoming Events" value={String(events.length)} icon={<CalendarPlusIcon className="w-8 h-8"/>} />
               <MetricCard title="New Registrations" value={String(pendingRegistrations.length)} icon={<UserPlusIcon className="w-8 h-8"/>} />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <TaskManager title="Chairperson's To-Do List" />
                </div>
                <div className="space-y-8">
                     <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
                        <h2 className="text-xl font-bold text-text-main-light dark:text-white mb-4">Key Actions</h2>
                        <div className="flex flex-col space-y-3">
                            <button onClick={() => onNavigateTo('approveRegistrations')} className="flex items-center gap-3 w-full bg-success/20 hover:bg-success/40 text-success font-semibold p-3 rounded-lg text-left transition-colors"><UserPlusIcon className="w-5 h-5" /> Approve Registrations</button>
                            <button onClick={() => onNavigateTo('createAnnouncement')} className="flex items-center gap-3 w-full bg-primary/20 hover:bg-primary/40 text-primary font-semibold p-3 rounded-lg text-left transition-colors"><MegaphoneIcon className="w-5 h-5" /> Post an Announcement</button>
                            <button onClick={() => onNavigateTo('createEvent')} className="flex items-center gap-3 w-full bg-secondary/20 hover:bg-secondary/40 text-secondary font-semibold p-3 rounded-lg text-left transition-colors"><CalendarPlusIcon className="w-5 h-5" /> Schedule a Meeting</button>
                            <button onClick={() => alert('Report viewer coming soon!')} className="flex items-center gap-3 w-full bg-accent/20 hover:bg-accent/40 text-accent font-semibold p-3 rounded-lg text-left transition-colors"><DocumentTextIcon className="w-5 h-5" /> Review Club Reports</button>
                            <button onClick={() => onNavigateTo('chat')} className="flex items-center gap-3 w-full bg-gray-500/20 hover:bg-gray-500/40 text-text-muted-light dark:text-text-muted-dark font-semibold p-3 rounded-lg text-left transition-colors"><ChatIcon className="w-5 h-5" /> Public Chat</button>
                            <button onClick={onNavigateProfile} className="flex items-center gap-3 w-full bg-gray-500/20 hover:bg-gray-500/40 text-text-muted-light dark:text-text-muted-dark font-semibold p-3 rounded-lg text-left transition-colors mt-2 border-t border-light-border dark:border-dark-border"><UserProfileIcon className="w-5 h-5" /> My Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChairpersonDashboard;
