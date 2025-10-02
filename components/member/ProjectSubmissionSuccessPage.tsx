import React from 'react';
import CheckBadgeIcon from '../icons/CheckBadgeIcon';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';

interface ProjectSubmissionSuccessPageProps {
    projectTitle: string;
    onBackToDashboard: () => void;
    onAddNew: () => void;
}

const ProjectSubmissionSuccessPage: React.FC<ProjectSubmissionSuccessPageProps> = ({ projectTitle, onBackToDashboard, onAddNew }) => {
    return (
        <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
            <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-8 rounded-xl">
                <CheckBadgeIcon className="w-16 h-16 text-success mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-text-main-light dark:text-white">Project Submitted!</h1>
                <p className="text-text-muted-light dark:text-text-muted-dark mt-2">
                    Your project, "<span className="font-semibold text-secondary">{projectTitle}</span>", has been submitted for review.
                </p>
                <p className="text-text-muted-light dark:text-text-muted-dark mt-4">
                    The Project Coordinator will review your submission and you'll be notified of the outcome. You can track its status in your project dashboard (coming soon!).
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <button
                        onClick={onBackToDashboard}
                        className="flex items-center justify-center gap-2 w-full sm:w-auto bg-light-border dark:bg-dark-border hover:bg-gray-200 dark:hover:bg-gray-700 text-text-main-light dark:text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                         <ArrowLeftIcon className="w-5 h-5" />
                        Back to Dashboard
                    </button>
                    <button
                        onClick={onAddNew}
                        className="w-full sm:w-auto bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                        Submit Another Project
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectSubmissionSuccessPage;
