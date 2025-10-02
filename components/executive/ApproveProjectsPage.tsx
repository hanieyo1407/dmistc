import React, { useState } from 'react';
import type { PendingProject } from '../../types';
import { pendingProjects as mockData } from '../../data/mockData';
import PortalHeader from '../member/PortalHeader';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import XCircleIcon from '../icons/XCircleIcon';
import CheckBadgeIcon from '../icons/CheckBadgeIcon';
import { useNotification } from '../../hooks/useNotification';
import { sendProjectStatusEmail } from '../../services/emailService';

interface ApproveProjectsPageProps {
    onBack: () => void;
}

const ProjectApprovalCard: React.FC<{ project: PendingProject, onApprove: (proj: PendingProject) => void, onReject: (proj: PendingProject) => void }> = ({ project, onApprove, onReject }) => {
    return (
        <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                <div>
                    <h3 className="text-xl font-bold text-text-main-light dark:text-white">{project.title}</h3>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Submitted by {project.submittedBy} • {project.category}</p>
                </div>
                <div className="flex-shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-4 sm:mt-0">
                    <button onClick={() => onApprove(project)} className="flex items-center justify-center gap-2 bg-success/20 hover:bg-success/30 text-success font-semibold py-2 px-3 rounded-lg text-sm transition-colors">
                        <CheckCircleIcon className="w-5 h-5" />
                        <span>Approve</span>
                    </button>
                    <button onClick={() => onReject(project)} className="flex items-center justify-center gap-2 bg-error/20 hover:bg-error/30 text-error font-semibold py-2 px-3 rounded-lg text-sm transition-colors">
                        <XCircleIcon className="w-5 h-5" />
                        <span>Reject</span>
                    </button>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-light-border dark:border-dark-border">
                <p className="text-sm text-text-main-light dark:text-white"><strong>Description:</strong> {project.description}</p>
                <p className="text-sm text-text-main-light dark:text-white mt-2"><strong>Tags:</strong></p>
                <div className="flex flex-wrap gap-2 mt-2">
                     {project.tags.map(tag => (
                        <span key={tag} className="bg-secondary/20 text-secondary font-semibold px-2.5 py-1 rounded-full text-xs">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ApproveProjectsPage: React.FC<ApproveProjectsPageProps> = ({ onBack }) => {
    const [pending, setPending] = useState<PendingProject[]>(mockData);
    const { addNotification } = useNotification();

    const handleApprove = (project: PendingProject) => {
        setPending(current => current.filter(p => p.id !== project.id));
        sendProjectStatusEmail({
            projectName: project.title,
            submitterName: project.submittedBy,
            status: 'approved',
            addNotification,
        });
    };
    
    const handleReject = (project: PendingProject) => {
        setPending(current => current.filter(p => p.id !== project.id));
        sendProjectStatusEmail({
            projectName: project.title,
            submitterName: project.submittedBy,
            status: 'rejected',
            addNotification,
        });
    };

    return (
        <div>
            <PortalHeader title="Approve Projects" onBack={onBack} />
            <div className="max-w-4xl mx-auto">
                {pending.length > 0 ? (
                    <div className="space-y-6">
                        {pending.map(proj => (
                            <ProjectApprovalCard 
                                key={proj.id}
                                project={proj}
                                onApprove={handleApprove}
                                onReject={handleReject}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-12 rounded-xl">
                        <CheckBadgeIcon className="w-16 h-16 text-success mx-auto mb-4"/>
                        <h2 className="text-2xl font-bold text-text-main-light dark:text-white">All Clear!</h2>
                        <p className="text-text-muted-light dark:text-text-muted-dark mt-2">There are no pending project submissions to review.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApproveProjectsPage;