import React, { useState } from 'react';
import type { User } from '../types';
import AdminDashboard from './admin/AdminDashboard';
import MemberManagementPage from './admin/MemberManagementPage';
import ApproveProjectsPage from './executive/ApproveProjectsPage';
import AnalyticsDashboardPage from './admin/AnalyticsDashboardPage';
import SystemSettingsPage from './admin/SystemSettingsPage';

interface AdminPortalProps {
    user: User;
    onNavigate: (view: 'dashboard' | 'profile') => void;
}

type AdminView = 'dashboard' | 'manageMembers' | 'approveProjects' | 'analytics' | 'settings';

const AdminPortal: React.FC<AdminPortalProps> = ({ user, onNavigate }) => {
    const [view, setView] = useState<AdminView>('dashboard');

    const handleBackToDashboard = () => setView('dashboard');

    const renderView = () => {
        switch (view) {
            case 'manageMembers':
                return <MemberManagementPage onBack={handleBackToDashboard} />;
            case 'approveProjects':
                return <ApproveProjectsPage onBack={handleBackToDashboard} />;
            case 'analytics':
                return <AnalyticsDashboardPage onBack={handleBackToDashboard} />;
            case 'settings':
                return <SystemSettingsPage onBack={handleBackToDashboard} />;
            case 'dashboard':
            default:
                return (
                    <AdminDashboard
                        user={user}
                        onNavigateProfile={() => onNavigate('profile')}
                        onNavigateTo={setView}
                    />
                );
        }
    };

    return (
        <section id="admin-portal" className="py-12 sm:py-16 animate-fade-in-up">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {renderView()}
            </div>
        </section>
    );
};

export default AdminPortal;
