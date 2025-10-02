import React from 'react';
import type { User } from '../../types';
import UserProfileIcon from '../icons/UserProfileIcon';
import UsersIcon from '../icons/UsersIcon';
import CheckBadgeIcon from '../icons/CheckBadgeIcon';
import ChartBarIcon from '../icons/ChartBarIcon';
import CogIcon from '../icons/CogIcon';
import { clubMembers, pendingProjects, events } from '../../data/mockData';

interface AdminDashboardProps {
    user: User;
    onNavigateProfile: () => void;
    onNavigateTo: (view: any) => void;
}

const MetricCard: React.FC<{title: string; value: string; color: 'primary' | 'secondary' | 'accent'}> = ({title, value, color}) => {
    const colorClasses = {
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
    }
    return (
        <div className="bg-light-bg dark:bg-dark-bg p-4 rounded-lg text-center border border-light-border dark:border-dark-border">
            <p className={`text-4xl font-bold ${colorClasses[color]}`}>{value}</p>
            <p className="text-text-muted-light dark:text-text-muted-dark text-sm mt-1">{title}</p>
        </div>
    );
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onNavigateProfile, onNavigateTo }) => {
    return (
        <>
            <div className="mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold font-poppins text-text-main-light dark:text-white">
                    Administrator <span className="custom-gradient-text">Portal</span>
                </h1>
                <p className="mt-2 text-lg text-text-muted-light dark:text-text-muted-dark">Welcome, {user.name} ({user.role.replace('_', ' ')})</p>
            </div>
             <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                     <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
                         <h2 className="text-xl font-bold text-text-main-light dark:text-white mb-4">System Analytics</h2>
                         <div className="grid sm:grid-cols-3 gap-6">
                            <MetricCard title="Total Members" value={String(clubMembers.length)} color="primary" />
                            <MetricCard title="Pending Projects" value={String(pendingProjects.length)} color="secondary" />
                            <MetricCard title="Active Events" value={String(events.length)} color="accent" />
                         </div>
                    </div>
                    <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
                         <h2 className="text-xl font-bold text-text-main-light dark:text-white mb-4">Member Engagement Trends</h2>
                         <div className="h-48 flex items-center justify-center text-text-muted-light dark:text-text-muted-dark">
                            Ma chart components azizakhala apa.
                         </div>
                    </div>
                </div>
                 <div className="space-y-8">
                     <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
                         <h2 className="text-xl font-bold text-text-main-light dark:text-white mb-4">Admin Tools</h2>
                         <div className="flex flex-col space-y-3">
                            <button onClick={() => onNavigateTo('manageMembers')} className="flex items-center gap-3 w-full bg-primary/20 hover:bg-primary/40 text-primary font-semibold p-3 rounded-lg text-left transition-colors"><UsersIcon className="w-5 h-5" /> Manage Members</button>
                            <button onClick={() => onNavigateTo('approveProjects')} className="flex items-center gap-3 w-full bg-secondary/20 hover:bg-secondary/40 text-secondary font-semibold p-3 rounded-lg text-left transition-colors"><CheckBadgeIcon className="w-5 h-5" /> Approve Projects</button>
                            <button onClick={() => onNavigateTo('analytics')} className="flex items-center gap-3 w-full bg-accent/20 hover:bg-accent/40 text-accent font-semibold p-3 rounded-lg text-left transition-colors"><ChartBarIcon className="w-5 h-5" /> View Full Analytics</button>
                            {user.role === 'SYSTEM_ADMIN' && (
                                 <button onClick={() => onNavigateTo('settings')} className="flex items-center gap-3 w-full bg-error/20 hover:bg-error/40 text-error font-semibold p-3 rounded-lg text-left transition-colors"><CogIcon className="w-5 h-5" /> System Settings</button>
                            )}
                             <button onClick={onNavigateProfile} className="flex items-center gap-3 w-full bg-gray-500/20 hover:bg-gray-500/40 text-text-muted-light dark:text-text-muted-dark font-semibold p-3 rounded-lg text-left transition-colors mt-2 border-t border-light-border dark:border-dark-border"><UserProfileIcon className="w-5 h-5" /> My Profile</button>
                         </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
