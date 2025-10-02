import React from 'react';
import type { User } from '../types';
import MemberDashboard from './MemberDashboard';
import AdminPortal from './AdminPortal';
import ExecutivePortal from './ExecutivePortal';
import AdvisorPortal from './AdvisorPortal';
import ProfilePage from './ProfilePage';

interface MemberPortalProps {
    user: User;
    view: 'dashboard' | 'profile';
    onNavigate: (view: 'dashboard' | 'profile') => void;
    onProfileUpdate: (updatedUser: User) => void;
}

const MemberPortal: React.FC<MemberPortalProps> = ({ user, view, onNavigate, onProfileUpdate }) => {

    const renderDashboardByRole = () => {
        switch (user.role) {
            case 'ADMIN':
            case 'SYSTEM_ADMIN':
                return <AdminPortal user={user} onNavigate={onNavigate} />;
            case 'EXECUTIVE':
                return <ExecutivePortal user={user} onNavigate={onNavigate} />;
            case 'ADVISOR':
                return <AdvisorPortal user={user} onNavigate={onNavigate} />;
            case 'MEMBER':
            default:
                return <MemberDashboard user={user} onNavigate={onNavigate} />;
        }
    };

    return (
        <div className="pt-20 min-h-screen">
           {view === 'dashboard' && renderDashboardByRole()}
           {view === 'profile' && <ProfilePage user={user} onProfileUpdate={onProfileUpdate} />}
        </div>
    );
};

export default MemberPortal;