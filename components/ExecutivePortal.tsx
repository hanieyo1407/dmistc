import React, { useState } from 'react';
import type { User } from '../types';
import ChairpersonDashboard from './executive/ChairpersonDashboard';
import ProjectCoordinatorDashboard from './executive/ProjectCoordinatorDashboard';
import TreasurerDashboard from './executive/TreasurerDashboard';
import CommunicationOfficerDashboard from './executive/CommunicationOfficerDashboard';
import GenericExecutiveDashboard from './executive/GenericExecutiveDashboard';
import CommunityChatPage from './member/CommunityChatPage';
import ApproveRegistrationsPage from './executive/ApproveRegistrationsPage';
import ApproveProjectsPage from './executive/ApproveProjectsPage';
import FinancialReportPage from './executive/FinancialReportPage';
import CreateAnnouncementPage from './executive/CreateAnnouncementPage';
import CreateEventPage from './executive/CreateEventPage';

interface ExecutivePortalProps {
    user: User;
    onNavigate: (view: 'dashboard' | 'profile') => void;
}

type ExecutiveView = 
    | 'dashboard' 
    | 'chat' 
    | 'approveRegistrations'
    | 'approveProjects'
    | 'financialReport'
    | 'createAnnouncement'
    | 'createEvent';


const ExecutivePortal: React.FC<ExecutivePortalProps> = ({ user, onNavigate }) => {
    const [currentView, setCurrentView] = useState<ExecutiveView>('dashboard');

    const handleBackToDashboard = () => setCurrentView('dashboard');

    const renderDashboardByRole = () => {
        const dashboardProps = {
            user,
            onNavigateProfile: () => onNavigate('profile'),
            onNavigateTo: setCurrentView,
        };
        switch (user.executiveRole) {
            case 'CHAIRPERSON':
                return <ChairpersonDashboard {...dashboardProps} />;
            case 'PROJECT_COORDINATOR':
                return <ProjectCoordinatorDashboard {...dashboardProps} />;
            case 'TREASURER':
                return <TreasurerDashboard {...dashboardProps} />;
            case 'COMMUNICATION_OFFICER':
                return <CommunicationOfficerDashboard {...dashboardProps} />;
            default:
                return <GenericExecutiveDashboard {...dashboardProps} />;
        }
    };

    const renderView = () => {
        switch (currentView) {
            case 'chat':
                return <CommunityChatPage user={user} onBack={handleBackToDashboard} />;
            case 'approveRegistrations':
                 return <ApproveRegistrationsPage onBack={handleBackToDashboard} />;
            case 'approveProjects':
                 return <ApproveProjectsPage onBack={handleBackToDashboard} />;
            case 'financialReport':
                 return <FinancialReportPage onBack={handleBackToDashboard} />;
            case 'createAnnouncement':
                return <CreateAnnouncementPage onBack={handleBackToDashboard} author={user.executiveRole || 'Executive'} />;
            case 'createEvent':
                return <CreateEventPage onBack={handleBackToDashboard} />;
            case 'dashboard':
            default:
                return renderDashboardByRole();
        }
    };

    return (
        <section className="py-12 sm:py-16 animate-fade-in-up">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {renderView()}
            </div>
        </section>
    );
};

export default ExecutivePortal;
