import React from 'react';
import type { User } from '../types';
import UserProfileIcon from './icons/UserProfileIcon';
import { clubMembers, pendingProjects, events, clubUpdates } from './../data/mockData';
import BriefcaseIcon from './icons/BriefcaseIcon';
import UserGroupIcon from './icons/UserGroupIcon';
import CalendarPlusIcon from './icons/CalendarPlusIcon';
import TimelineIcon from './icons/TimelineIcon';


interface AdvisorPortalProps {
    user: User;
    onNavigate: (view: 'dashboard' | 'profile') => void;
}

const MetricCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border p-4 rounded-lg flex items-center gap-4">
        <div className="text-primary">{icon}</div>
        <div>
            <p className="text-2xl font-bold text-text-main-light dark:text-white">{value}</p>
            <p className="text-text-muted-light dark:text-text-muted-dark text-sm">{title}</p>
        </div>
    </div>
);


const AdvisorPortal: React.FC<AdvisorPortalProps> = ({ user, onNavigate }) => {
    const latestUpdates = clubUpdates.slice(0, 3);

    return (
        <section id="advisor-dashboard" className="py-12 sm:py-16 animate-fade-in-up">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold font-poppins text-text-main-light dark:text-white">
                        Advisor <span className="custom-gradient-text">Overview</span>
                    </h1>
                     <p className="mt-2 text-lg text-text-muted-light dark:text-text-muted-dark">Welcome, {user.name}. Here is a summary of the club's progress.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <MetricCard title="Total Members" value={clubMembers.length} icon={<UserGroupIcon className="w-8 h-8"/>} />
                    <MetricCard title="Pending Projects" value={pendingProjects.length} icon={<BriefcaseIcon className="w-8 h-8"/>} />
                    <MetricCard title="Upcoming Events" value={events.length} icon={<CalendarPlusIcon className="w-8 h-8"/>} />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
                            <h2 className="text-xl font-bold text-text-main-light dark:text-white mb-4 flex items-center gap-2">
                                <TimelineIcon className="w-6 h-6 text-secondary" />
                                Recent Club Activity
                            </h2>
                            <ul className="space-y-4">
                                {latestUpdates.map(update => (
                                    <li key={update.id} className="border-l-4 border-secondary/50 pl-4">
                                        <p className="font-semibold text-text-main-light dark:text-white">{update.title}</p>
                                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{update.content.substring(0, 100)}...</p>
                                        <p className="text-xs text-gray-500 mt-1">{update.date} - by {update.author}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                     <div className="space-y-8">
                         <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
                            <h2 className="text-xl font-bold text-text-main-light dark:text-white mb-4">Quick Links</h2>
                            <div className="flex flex-col space-y-3">
                                 <button onClick={() => onNavigate('profile')} className="flex items-center justify-center gap-2 w-full bg-accent/20 hover:bg-accent/40 text-accent font-semibold p-3 rounded-lg text-center transition-colors">
                                    <UserProfileIcon className="w-5 h-5" /> My Profile
                                </button>
                                 <button onClick={() => alert('Feature coming soon!')} className="w-full bg-primary/20 hover:bg-primary/40 text-primary font-semibold p-3 rounded-lg text-center transition-colors">View All Projects</button>
                                  <button onClick={() => alert('Feature coming soon!')} className="w-full bg-secondary/20 hover:bg-secondary/40 text-secondary font-semibold p-3 rounded-lg text-center transition-colors">View Member Directory</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AdvisorPortal;
