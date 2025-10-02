import React, { useEffect } from 'react';
import type { Project } from '../types';
import CloseIcon from './icons/CloseIcon';
import GithubIcon from './icons/GithubIcon';

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform scale-95 opacity-0 animate-fade-in-up"
                style={{ animationFillMode: 'forwards', animationDelay: '0.1s' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-secondary font-semibold text-sm mb-1">{project.category}</p>
                            <h2 className="text-2xl md:text-3xl font-bold text-text-main-light dark:text-white">{project.title}</h2>
                        </div>
                        <button onClick={onClose} className="text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-white transition-colors">
                            <CloseIcon className="w-7 h-7" />
                        </button>
                    </div>

                    <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover rounded-lg my-4" />
                    
                    <h3 className="text-xl font-semibold text-text-main-light dark:text-white mt-6 mb-2">About The Project</h3>
                    <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">{project.longDescription}</p>

                    <h3 className="text-xl font-semibold text-text-main-light dark:text-white mt-6 mb-2">Technologies Used</h3>
                     <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map(tag => (
                            <span key={tag} className="bg-light-border dark:bg-dark-border text-text-muted-light dark:text-text-muted-dark text-sm font-medium px-3 py-1.5 rounded-full">{tag}</span>
                        ))}
                    </div>

                    {project.collaborators && project.collaborators.length > 0 && (
                         <>
                            <h3 className="text-xl font-semibold text-text-main-light dark:text-white mt-6 mb-2">Collaborators</h3>
                            <div className="flex flex-wrap gap-2 text-text-muted-light dark:text-text-muted-dark">
                                {project.collaborators.map(name => (
                                     <span key={name} className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border px-3 py-1 rounded-lg text-sm">{name}</span>
                                ))}
                            </div>
                        </>
                    )}
                    
                    <div className="mt-8 pt-6 border-t border-light-border dark:border-dark-border flex flex-wrap gap-4">
                        {project.githubLink && project.githubLink !== '#' && (
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                <GithubIcon className="w-5 h-5" /> View on GitHub
                            </a>
                        )}
                        {project.liveDemo && project.liveDemo !== '#' && (
                            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;