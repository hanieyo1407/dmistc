import React from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';

interface PortalHeaderProps {
    title: string;
    onBack: () => void;
}

const PortalHeader: React.FC<PortalHeaderProps> = ({ title, onBack }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold font-poppins text-text-main-light dark:text-white mb-4 md:mb-0">
                <span className="custom-gradient-text">{title}</span>
            </h1>
            <button
                onClick={onBack}
                className="flex items-center gap-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-primary text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-white font-semibold py-2 px-4 rounded-lg transition-colors self-start md:self-center"
            >
                <ArrowLeftIcon className="w-5 h-5" />
                <span>Back to Dashboard</span>
            </button>
        </div>
    );
};

export default PortalHeader;