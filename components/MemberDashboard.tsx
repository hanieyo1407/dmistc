import React, { useState } from 'react';
import type { User } from '../types';
import ProjectSubmissionForm from './ProjectSubmissionForm';
import UserProfileIcon from './icons/UserProfileIcon';
import UploadIcon from './icons/UploadIcon';
import VoteIcon from './icons/VoteIcon';
import LibraryIcon from './icons/LibraryIcon';
import ChatIcon from './icons/ChatIcon';
import MegaphoneIcon from './icons/MegaphoneIcon';
import WalletIcon from './icons/WalletIcon';
import ProjectLibraryPage from './member/ProjectLibraryPage';
import ProjectVotingPage from './member/ProjectVotingPage';
import LeaderVotingPage from './member/LeaderVotingPage';
import ClubUpdatesPage from './member/ClubUpdatesPage';
import CommunityChatPage from './member/CommunityChatPage';
import MembershipPaymentPage from './member/MembershipPaymentPage';
import ProjectSubmissionSuccessPage from './member/ProjectSubmissionSuccessPage';

interface MemberDashboardProps {
    user: User;
    onNavigate: (view: 'dashboard' | 'profile') => void;
}

type MemberView = 'dashboard' | 'submitProject' | 'projectLibrary' | 'voteProjects' | 'voteLeaders' | 'updates' | 'chat' | 'payment' | 'submitProjectSuccess';

const ActionCard: React.FC<{ title: string; icon: React.ReactNode; onClick: () => void; color: 'primary' | 'secondary' | 'accent' | 'gray' }> = ({ title, icon, onClick, color }) => {
    const colorClasses = {
        primary: 'bg-primary/10 hover:bg-primary/20 text-primary border-primary/20',
        secondary: 'bg-secondary/10 hover:bg-secondary/20 text-secondary border-secondary/20',
        accent: 'bg-accent/10 hover:bg-accent/20 text-accent border-accent/20',
        gray: 'bg-gray-500/10 hover:bg-gray-500/20 text-gray-500 dark:text-gray-300 border-gray-500/20',
    };

    return (
        <button onClick={onClick} className={`flex flex-col items-center justify-center p-6 rounded-xl text-center transition-all duration-300 transform hover:-translate-y-1 ${colorClasses[color]} border`}>
            <div className="mb-3">{icon}</div>
            <h3 className="font-semibold text-text-main-light dark:text-text-main-dark">{title}</h3>
        </button>
    );
};

const DashboardGrid: React.FC<{ user: User; onNavigate: (view: MemberView) => void; onNavigateProfile: () => void }> = ({ user, onNavigate, onNavigateProfile }) => (
    <>
        <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold font-poppins text-text-main-light dark:text-white">
                Welcome Back, <span className="custom-gradient-text">{user.profile.firstName}</span>
            </h1>
            <p className="mt-2 text-lg text-text-muted-light dark:text-text-muted-dark">This is your club hub. Access everything you need below.</p>
        </div>

        <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-text-main-light dark:text-white mb-6">Member Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <ActionCard title="Propose Project" icon={<UploadIcon className="w-8 h-8"/>} onClick={() => onNavigate('submitProject')} color="primary" />
                <ActionCard title="Vote for Projects" icon={<VoteIcon className="w-8 h-8"/>} onClick={() => onNavigate('voteProjects')} color="primary" />
                <ActionCard title="Vote for Leaders" icon={<VoteIcon className="w-8 h-8"/>} onClick={() => onNavigate('voteLeaders')} color="secondary" />
                <ActionCard title="Club Updates" icon={<MegaphoneIcon className="w-8 h-8"/>} onClick={() => onNavigate('updates')} color="secondary" />
                <ActionCard title="Project Library" icon={<LibraryIcon className="w-8 h-8"/>} onClick={() => onNavigate('projectLibrary')} color="accent" />
                <ActionCard title="Community Chat" icon={<ChatIcon className="w-8 h-8"/>} onClick={() => onNavigate('chat')} color="accent" />
                <ActionCard title="Membership Payment" icon={<WalletIcon className="w-8 h-8"/>} onClick={() => onNavigate('payment')} color="gray" />
                <ActionCard title="My Profile" icon={<UserProfileIcon className="w-8 h-8"/>} onClick={onNavigateProfile} color="gray" />
            </div>
        </div>
    </>
);


const MemberDashboard: React.FC<MemberDashboardProps> = ({ user, onNavigate }) => {
    const [currentView, setCurrentView] = useState<MemberView>('dashboard');
    const [submittedProjectName, setSubmittedProjectName] = useState('');

    const handleSuccessSubmit = (projectName: string) => {
        setSubmittedProjectName(projectName);
        setCurrentView('submitProjectSuccess');
    }

    const renderView = () => {
        switch (currentView) {
            case 'submitProject':
                return <ProjectSubmissionForm onCancel={() => setCurrentView('dashboard')} onSuccess={handleSuccessSubmit} />;
            case 'submitProjectSuccess':
                return <ProjectSubmissionSuccessPage projectTitle={submittedProjectName} onBackToDashboard={() => setCurrentView('dashboard')} onAddNew={() => setCurrentView('submitProject')} />;
            case 'projectLibrary':
                return <ProjectLibraryPage onBack={() => setCurrentView('dashboard')} />;
            case 'voteProjects':
                return <ProjectVotingPage onBack={() => setCurrentView('dashboard')} />;
            case 'voteLeaders':
                return <LeaderVotingPage onBack={() => setCurrentView('dashboard')} />;
            case 'updates':
                return <ClubUpdatesPage onBack={() => setCurrentView('dashboard')} />;
            case 'chat':
                return <CommunityChatPage user={user} onBack={() => setCurrentView('dashboard')} />;
            case 'payment':
                return <MembershipPaymentPage onBack={() => setCurrentView('dashboard')} />;
            case 'dashboard':
            default:
                return <DashboardGrid user={user} onNavigate={setCurrentView} onNavigateProfile={() => onNavigate('profile')} />;
        }
    }

    return (
        <section id="dashboard" className="py-12 sm:py-16 animate-fade-in-up">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {renderView()}
            </div>
        </section>
    );
};

export default MemberDashboard;