import React, { useState, useMemo } from 'react';
import { leaderCandidates } from '../../data/mockData';
import type { Candidate, ExecutiveRole } from '../../types';
import PortalHeader from './PortalHeader';
import CheckBadgeIcon from '../icons/CheckBadgeIcon';

interface LeaderVotingPageProps {
    onBack: () => void;
}

const LeaderVotingPage: React.FC<LeaderVotingPageProps> = ({ onBack }) => {
    const [votes, setVotes] = useState<Record<ExecutiveRole, number | null>>({
        CHAIRPERSON: null,
        VICE_CHAIRPERSON: null,
        SECRETARY: null,
        VICE_SECRETARY: null,
        PROJECT_COORDINATOR: null,
        TREASURER: null,
        DISCIPLINARY_OFFICER: null,
        COMMUNICATION_OFFICER: null,
    });
    const [submitted, setSubmitted] = useState(false);

    const groupedCandidates = useMemo(() => {
        return leaderCandidates.reduce((acc, candidate) => {
            (acc[candidate.position] = acc[candidate.position] || []).push(candidate);
            return acc;
        }, {} as Record<ExecutiveRole, Candidate[]>);
    }, []);

    const handleVoteChange = (position: ExecutiveRole, candidateId: number) => {
        setVotes(prev => ({ ...prev, [position]: candidateId }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.values(votes).every(v => v === null)) {
            alert('Please select at least one candidate before submitting.');
            return;
        }
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div>
                <PortalHeader title="Vote Submitted" onBack={onBack} />
                <div className="text-center max-w-lg mx-auto bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-8 rounded-xl">
                    <CheckBadgeIcon className="w-16 h-16 text-success mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-text-main-light dark:text-white mb-2">Thank You for Voting!</h2>
                    <p className="text-text-muted-light dark:text-text-muted-dark">Your vote has been cast successfully. The results will be announced at the next general meeting. Your participation is crucial for the future of our club.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div>
            <PortalHeader title="Vote for Club Leaders" onBack={onBack} />
            <p className="text-center text-text-muted-light dark:text-text-muted-dark mb-8 max-w-2xl mx-auto">
                Elect the next Executive Committee. Read each candidate's vision and cast your vote for the leaders who will guide our club for the next term.
            </p>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-10">
                {Object.entries(groupedCandidates).map(([position, candidates]) => (
                    <div key={position}>
                        <h2 className="text-2xl font-bold text-text-main-light dark:text-white mb-4 border-b-2 border-secondary pb-2">
                            {position.replace(/_/g, ' ')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {candidates.map(candidate => (
                                <label key={candidate.id} className={`bg-light-card dark:bg-dark-card border-2 rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all ${votes[position as ExecutiveRole] === candidate.id ? 'border-primary shadow-lg shadow-primary/20' : 'border-light-border dark:border-dark-border'}`}>
                                    <input
                                        type="radio"
                                        name={position}
                                        checked={votes[position as ExecutiveRole] === candidate.id}
                                        onChange={() => handleVoteChange(position as ExecutiveRole, candidate.id)}
                                        className="form-radio h-5 w-5 text-primary bg-light-bg dark:bg-dark-bg border-gray-300 dark:border-gray-600 focus:ring-primary flex-shrink-0"
                                    />
                                    <img src={candidate.imageUrl} alt={candidate.name} className="w-16 h-16 rounded-full" />
                                    <div>
                                        <h3 className="font-bold text-lg text-text-main-light dark:text-white">{candidate.name}</h3>
                                        <p className="text-text-muted-light dark:text-text-muted-dark text-sm italic">"{candidate.vision}"</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="text-center pt-6">
                    <button type="submit" className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-8 text-base sm:py-3 sm:px-12 sm:text-lg rounded-lg transition-all transform hover:scale-105">
                        Cast My Vote
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LeaderVotingPage;