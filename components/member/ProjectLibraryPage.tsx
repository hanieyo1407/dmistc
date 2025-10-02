import React, { useState } from 'react';
import type { Project } from '../../types';
import { libraryProjects } from '../../data/mockData';
import ProjectModal from '../ProjectModal';
import PortalHeader from './PortalHeader';
import ProjectCard from '../ProjectCard';

interface ProjectLibraryPageProps {
    onBack: () => void;
}

const ProjectLibraryPage: React.FC<ProjectLibraryPageProps> = ({ onBack }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const PROJECTS_PER_PAGE = 9;

    const totalPages = Math.ceil(libraryProjects.length / PROJECTS_PER_PAGE);
    const indexOfLastProject = currentPage * PROJECTS_PER_PAGE;
    const indexOfFirstProject = indexOfLastProject - PROJECTS_PER_PAGE;
    const currentProjects = libraryProjects.slice(indexOfFirstProject, indexOfLastProject);

    const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    const openModal = (project: Project) => setSelectedProject(project);
    const closeModal = () => setSelectedProject(null);

    return (
        <>
            <div>
                <PortalHeader title="Project Library" onBack={onBack} />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentProjects.map(project => (
                        <ProjectCard key={project.id} project={project} onLearnMore={openModal} />
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-12">
                        <button 
                            onClick={handlePrevPage} 
                            disabled={currentPage === 1}
                            className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-primary text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <span className="text-text-muted-light dark:text-text-muted-dark font-medium">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button 
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-primary text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
            {selectedProject && <ProjectModal project={selectedProject} onClose={closeModal} />}
        </>
    );
};

export default ProjectLibraryPage;