import React from 'react';
import type { User } from '../../types';
import TaskManager from '../TaskManager';
import UserProfileIcon from '../icons/UserProfileIcon';
import LibraryIcon from '../icons/LibraryIcon';
import CheckBadgeIcon from '../icons/CheckBadgeIcon';
import ChatIcon from '../icons/ChatIcon';

interface ProjectCoordinatorDashboardProps {
    user: User;
    onNavigateProfile: () => void;
    onNavigateTo: (view: any) => void;
}

const ProjectCoordinatorDashboard: React.FC<ProjectCoordinatorDashboardProps> = ({ user, onNavigateProfile, onNavigateTo }) => {
    return (
        <>
            <div className="mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold font-poppins text-text-main-light dark:text-white">
                    Project Coordinator <span className="custom-gradient-text">Hub</span>
                </h1>
                <p className="mt-2 text-lg text-text-muted-light dark:text-text-muted-dark">Welcome, {user.name}. Manage all club projects here.</p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <TaskManager title="Project Coordination Tasks" />
                    <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
                        <h2 className="text-xl font-bold text-text-main-light dark:text-white mb-4">Recent Project Submissions</h2>
                        <p className="text-text-muted-light dark:text-text-muted-dark">Project submission feed coming soon...</p>
                    </div>
                </div>
                <div className="space-y-8">
                     <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
                        <h2 className="text-xl font-bold text-text-main-light dark:text-white mb-4">Actions</h2>
                        <div className="flex flex-col space-y-3">
                            <button onClick={() => onNavigateTo('approveProjects')} className="flex items-center gap-3 w-full bg-primary/20 hover:bg-primary/40 text-primary font-semibold p-3 rounded-lg text-left transition-colors"><CheckBadgeIcon className="w-5 h-5" /> Review Submissions</button>
                            <button onClick={() => alert('Feature coming soon!')} className="flex items-center gap-3 w-full bg-secondary/20 hover:bg-secondary/40 text-secondary font-semibold p-3 rounded-lg text-left transition-colors"><LibraryIcon className="w-5 h-5" /> Update Project Library</button>
                            <button onClick={() => onNavigateTo('chat')} className="flex items-center gap-3 w-full bg-accent/20 hover:bg-accent/40 text-accent font-semibold p-3 rounded-lg text-left transition-colors"><ChatIcon className="w-5 h-5" /> Public Chat</button>
                            <button onClick={onNavigateProfile} className="flex items-center gap-3 w-full bg-gray-500/20 hover:bg-gray-500/40 text-text-muted-light dark:text-text-muted-dark font-semibold p-3 rounded-lg text-left transition-colors mt-2 border-t border-light-border dark:border-dark-border"><UserProfileIcon className="w-5 h-5" /> My Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectCoordinatorDashboard;
