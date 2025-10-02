import React, { useState } from 'react';
import type { PendingRegistration } from '../../types';
import { pendingRegistrations as mockData } from '../../data/mockData';
import PortalHeader from '../member/PortalHeader';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import XCircleIcon from '../icons/XCircleIcon';
import CheckBadgeIcon from '../icons/CheckBadgeIcon';
import { useNotification } from '../../hooks/useNotification';
import { sendRegistrationStatusEmail } from '../../services/emailService';

interface ApproveRegistrationsPageProps {
    onBack: () => void;
}

const RegistrationCard: React.FC<{ registration: PendingRegistration, onApprove: (reg: PendingRegistration) => void, onReject: (reg: PendingRegistration) => void }> = ({ registration, onApprove, onReject }) => {
    return (
        <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div>
                    <h3 className="text-xl font-bold text-text-main-light dark:text-white">{registration.firstName} {registration.lastName}</h3>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{registration.studentId} • {registration.email}</p>
                </div>
                <div className="flex-shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-4 sm:mt-0">
                    <button onClick={() => onApprove(registration)} className="flex items-center justify-center gap-2 bg-success/20 hover:bg-success/30 text-success font-semibold py-2 px-3 rounded-lg text-sm transition-colors">
                        <CheckCircleIcon className="w-5 h-5" />
                        <span>Approve</span>
                    </button>
                    <button onClick={() => onReject(registration)} className="flex items-center justify-center gap-2 bg-error/20 hover:bg-error/30 text-error font-semibold py-2 px-3 rounded-lg text-sm transition-colors">
                        <XCircleIcon className="w-5 h-5" />
                        <span>Reject</span>
                    </button>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-light-border dark:border-dark-border">
                <p className="text-sm text-text-main-light dark:text-white"><strong>Program:</strong> {registration.program} ({registration.year})</p>
                <p className="text-sm text-text-main-light dark:text-white mt-2"><strong>Interests:</strong></p>
                <div className="flex flex-wrap gap-2 mt-2">
                     {registration.interests.map(interest => (
                        <span key={interest} className="bg-secondary/20 text-secondary font-semibold px-2.5 py-1 rounded-full text-xs">{interest}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ApproveRegistrationsPage: React.FC<ApproveRegistrationsPageProps> = ({ onBack }) => {
    const [pending, setPending] = useState<PendingRegistration[]>(mockData);
    const { addNotification } = useNotification();

    const handleApprove = (registration: PendingRegistration) => {
        setPending(current => current.filter(reg => reg.id !== registration.id));
        
        sendRegistrationStatusEmail({
            email: registration.email,
            name: registration.firstName,
            status: 'approved',
            addNotification,
        });
    };
    
    const handleReject = (registration: PendingRegistration) => {
        setPending(current => current.filter(reg => reg.id !== registration.id));

        sendRegistrationStatusEmail({
            email: registration.email,
            name: registration.firstName,
            status: 'rejected',
            addNotification,
        });
    };

    return (
        <div>
            <PortalHeader title="Approve Registrations" onBack={onBack} />
            <div className="max-w-4xl mx-auto">
                {pending.length > 0 ? (
                    <div className="space-y-6">
                        {pending.map(reg => (
                            <RegistrationCard 
                                key={reg.id}
                                registration={reg}
                                onApprove={handleApprove}
                                onReject={handleReject}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-12 rounded-xl">
                        <CheckBadgeIcon className="w-16 h-16 text-success mx-auto mb-4"/>
                        <h2 className="text-2xl font-bold text-text-main-light dark:text-white">All Clear!</h2>
                        <p className="text-text-muted-light dark:text-text-muted-dark mt-2">There are no pending member registrations to review.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApproveRegistrationsPage;