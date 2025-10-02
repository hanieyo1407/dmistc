import React from 'react';
import type { User } from '../../types';
import TaskManager from '../TaskManager';
import UserProfileIcon from '../icons/UserProfileIcon';
import FinanceIcon from '../icons/FinanceIcon';
import CurrencyDollarIcon from '../icons/CurrencyDollarIcon';
import ChatIcon from '../icons/ChatIcon';

interface TreasurerDashboardProps {
    user: User;
    onNavigateProfile: () => void;
    onNavigateTo: (view: any) => void;
}

const TreasurerDashboard: React.FC<TreasurerDashboardProps> = ({ user, onNavigateProfile, onNavigateTo }) => {
    return (
        <>
            <div className="mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold font-poppins text-text-main-light dark:text-white">
                    Treasurer's <span className="custom-gradient-text">Desk</span>
                </h1>
                <p className="mt-2 text-lg text-text-muted-light dark:text-text-muted-dark">Welcome, {user.name}. Manage club finances.</p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <TaskManager title="Financial Tasks" />
                     <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
                        <h2 className="text-xl font-bold text-text-main-light dark:text-white mb-4">Financial Overview</h2>
                         <div className="h-48 flex items-center justify-center text-text-muted-light dark:text-text-muted-dark">
                            Detailed chart available in the full report.
                         </div>
                    </div>
                </div>
                <div className="space-y-8">
                     <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
                        <h2 className="text-xl font-bold text-text-main-light dark:text-white mb-4">Actions</h2>
                        <div className="flex flex-col space-y-3">
                            <button onClick={() => onNavigateTo('financialReport')} className="flex items-center gap-3 w-full bg-secondary/20 hover:bg-secondary/40 text-secondary font-semibold p-3 rounded-lg text-left transition-colors"><FinanceIcon className="w-5 h-5" /> Generate Financial Report</button>
                            <button onClick={() => alert('Feature coming soon!')} className="flex items-center gap-3 w-full bg-primary/20 hover:bg-primary/40 text-primary font-semibold p-3 rounded-lg text-left transition-colors"><CurrencyDollarIcon className="w-5 h-5" /> Manage Budgets</button>
                            <button onClick={() => onNavigateTo('chat')} className="flex items-center gap-3 w-full bg-accent/20 hover:bg-accent/40 text-accent font-semibold p-3 rounded-lg text-left transition-colors"><ChatIcon className="w-5 h-5" /> Public Chat</button>
                            <button onClick={onNavigateProfile} className="flex items-center gap-3 w-full bg-gray-500/20 hover:bg-gray-500/40 text-text-muted-light dark:text-text-muted-dark font-semibold p-3 rounded-lg text-left transition-colors mt-2 border-t border-light-border dark:border-dark-border"><UserProfileIcon className="w-5 h-5" /> My Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TreasurerDashboard;
