import React, { useState } from 'react';
import type { Project } from '../../types';
import { votingProjects as initialProjects } from '../../data/mockData';
import PortalHeader from './PortalHeader';
import TrophyIcon from '../icons/TrophyIcon';

interface ProjectVotingPageProps {
    onBack: () => void;
}

interface VotableProject extends Omit<Project, 'longDescription' | 'githubLink' | 'liveDemo' | 'collaborators'> {
    votes: number;
}

const ProjectVotingPage: React.FC<ProjectVotingPageProps> = ({ onBack }) => {
    const [projects, setProjects] = useState<VotableProject[]>(() => 
        initialProjects.map(p => ({ ...p, votes: Math.floor(Math.random() * 150) }))
    );
    const [votedIds, setVotedIds] = useState<number[]>([]);

    const handleVote = (projectId: number) => {
        if (votedIds.includes(projectId)) return;

        setProjects(currentProjects =>
            currentProjects.map(p =>
                p.id === projectId ? { ...p, votes: p.votes + 1 } : p
            )
        );
        setVotedIds(prevVotedIds => [...prevVotedIds, projectId]);
    };

    return (
        <div>
            <PortalHeader title="Vote for Projects" onBack={onBack} />
            <p className="text-center text-text-muted-light dark:text-text-muted-dark mb-8 max-w-2xl mx-auto">
                Review the latest project proposals from your fellow members and vote for the ones you believe will have the most impact. Your vote helps decide which projects get prioritized for club resources.
            </p>
            <div className="space-y-6 max-w-4xl mx-auto">
                {projects.sort((a,b) => b.votes - a.votes).map(project => {
                    const hasVoted = votedIds.includes(project.id);
                    return (
                        <div key={project.id} className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-4 sm:p-6 rounded-xl flex flex-col sm:flex-row items-center gap-6">
                            <img src={project.imageUrl} alt={project.title} className="w-full sm:w-48 h-32 sm:h-auto object-cover rounded-lg" />
                            <div className="flex-grow w-full">
                                <h3 className="text-xl font-bold text-text-main-light dark:text-white">{project.title}</h3>
                                <p className="text-secondary font-semibold text-sm mb-2">{project.category}</p>
                                <p className="text-text-muted-light dark:text-text-muted-dark text-sm mb-3">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="bg-light-border dark:bg-dark-border text-text-muted-light dark:text-text-muted-dark text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-shrink-0 text-center w-full sm:w-auto">
                                <div className="text-3xl font-bold text-text-main-light dark:text-white mb-2">{project.votes}</div>
                                <button
                                    onClick={() => handleVote(project.id)}
                                    disabled={hasVoted}
                                    className={`w-full sm:w-auto flex items-center justify-center gap-2 font-bold py-2 px-4 sm:px-6 rounded-lg transition-all ${
                                        hasVoted
                                            ? 'bg-success/80 text-white cursor-not-allowed'
                                            : 'bg-primary hover:bg-blue-600 text-white'
                                    }`}
                                >
                                    <TrophyIcon className="w-5 h-5" />
                                    <span>{hasVoted ? 'Voted' : 'Vote'}</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectVotingPage;