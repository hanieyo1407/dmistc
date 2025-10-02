import React from 'react';
import { clubUpdates } from '../../data/mockData';
import PortalHeader from './PortalHeader';

interface ClubUpdatesPageProps {
    onBack: () => void;
}

const ClubUpdatesPage: React.FC<ClubUpdatesPageProps> = ({ onBack }) => {
    return (
        <div>
            <PortalHeader title="Club Updates" onBack={onBack} />
            <div className="max-w-3xl mx-auto space-y-8">
                {clubUpdates.map(update => (
                    <div key={update.id} className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl transition-all duration-300 hover:border-secondary/50">
                        <div className="flex justify-between items-baseline mb-2">
                             <h2 className="text-2xl font-bold text-text-main-light dark:text-white">{update.title}</h2>
                             <p className="text-sm text-gray-400 dark:text-gray-500 flex-shrink-0 ml-4">{update.date}</p>
                        </div>
                        <p className="text-sm text-secondary font-semibold mb-4">Posted by {update.author}</p>
                        <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed whitespace-pre-line">
                            {update.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClubUpdatesPage;