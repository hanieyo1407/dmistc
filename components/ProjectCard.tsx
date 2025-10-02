import React from 'react';
import type { Project } from '../types';
import GithubIcon from './icons/GithubIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface ProjectCardProps {
    project: Project;
    onLearnMore: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onLearnMore }) => (
    <div 
        title={project.description}
        className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl overflow-hidden group transition-all duration-300 hover:border-secondary hover:shadow-2xl hover:shadow-secondary/20 transform hover:-translate-y-2">
        <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-56 object-cover" 
            loading="lazy"
            width="500"
            height="400"
        />
        <div className="p-6">
            <p className="text-secondary font-semibold text-sm mb-1">{project.category}</p>
            <h3 className="text-xl font-bold text-text-main-light dark:text-white mb-2">{project.title}</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-4 text-sm leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                    <span key={tag} className="bg-light-border dark:bg-dark-border text-text-muted-light dark:text-text-muted-dark text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                ))}
            </div>
             <div className="flex justify-between items-center mt-6">
                <button onClick={() => onLearnMore(project)} className="flex items-center text-primary hover:underline">
                    Learn More <ArrowRightIcon className="w-4 h-4 ml-1" />
                </button>
                {project.githubLink && project.githubLink !== '#' && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-white transition-colors">
                        <GithubIcon className="w-6 h-6" />
                    </a>
                )}
            </div>
        </div>
    </div>
);

export default ProjectCard;