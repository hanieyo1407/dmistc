import React, { useState } from 'react';
import type { Project } from '../types';
import ArrowRightIcon from './icons/ArrowRightIcon';
import ProjectModal from './ProjectModal';
import ProjectCard from './ProjectCard';

const projectsData: Project[] = [
    { id: 1, title: 'AI-Powered Learning Assistant', category: 'Tech for Education', description: 'An intelligent tutor for science students, providing personalized feedback.', longDescription: 'This project utilizes natural language processing and machine learning algorithms to create a dynamic learning environment. It integrates with existing course materials to offer students 24/7 assistance, track their progress, and identify areas where they need additional help. The backend is built with Python and FastAPI, while the frontend uses React and Tailwind CSS.', imageUrl: 'https://picsum.photos/seed/ai/500/400', tags: ['AI', 'React', 'Python', 'NLP'], githubLink: '#', liveDemo: '#', collaborators: ['Jane Doe', 'John Smith'] },
    { id: 2, title: 'Mobile Science Lab Outreach', category: 'STEM Education Outreach', description: 'Bringing hands-on science experiments to local schools using a mobile app.', longDescription: 'To bridge the gap in STEM education, this project developed a mobile application that guides students through safe, accessible science experiments using household materials. It includes video tutorials, quizzes, and a platform for students to share their results. The app is built with React Native for cross-platform compatibility.', imageUrl: 'https://picsum.photos/seed/outreach/500/400', tags: ['Mobile', 'Education', 'Community', 'React Native'], githubLink: '#', collaborators: ['Peter Jones'] },
    { id: 3, title: 'Automated Irrigation System', category: 'Innovation Sprints', description: 'A smart IoT device to optimize water usage in agriculture.', longDescription: 'This project is an IoT-based solution aimed at conserving water in local farms. It uses soil moisture sensors, weather forecast APIs, and an Arduino microcontroller to automatically manage irrigation schedules. A web dashboard allows farmers to monitor water usage and system status in real-time.', imageUrl: 'https://picsum.photos/seed/iot/500/400', tags: ['IoT', 'Arduino', 'Sustainability', 'Firebase'], githubLink: '#', liveDemo: '#', collaborators: ['Alice Johnson', 'Bob Williams'] },
    { id: 4, title: 'Collaborative Research Platform', category: 'Research Projects', description: 'A web platform for students to collaborate on research papers.', longDescription: 'This platform provides a centralized hub for student researchers to collaborate. Features include real-time document editing, version control, citation management, and a peer-review system. It is built on the MERN stack (MongoDB, Express, React, Node.js) and uses Socket.io for real-time features.', imageUrl: 'https://picsum.photos/seed/research/500/400', tags: ['Web', 'Collaboration', 'Node.js', 'MongoDB'], githubLink: '#', collaborators: ['Charlie Brown'] },
];

const featuredProjects = projectsData.slice(0, 2);

interface ProjectGalleryProps {
    onNavigateToGallery: () => void;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ onNavigateToGallery }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    
    const openModal = (project: Project) => setSelectedProject(project);
    const closeModal = () => setSelectedProject(null);

    return (
        <>
            <section id="projects" className="py-20 sm:py-28 bg-light-bg/50 dark:bg-dark-bg/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-text-main-light dark:text-white">
                            Featured <span className="custom-gradient-text">Creations</span>
                        </h2>
                        <p className="mt-4 text-lg text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto">
                            A glimpse into the innovative projects born from the collaboration of our brilliant members.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {featuredProjects.map(project => (
                            <ProjectCard key={project.id} project={project} onLearnMore={openModal} />
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <button 
                            onClick={onNavigateToGallery} 
                            className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-2 px-6 text-base sm:py-3 sm:px-8 sm:text-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/50 flex items-center gap-2 mx-auto"
                        >
                            View Full Gallery <ArrowRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>
            {selectedProject && <ProjectModal project={selectedProject} onClose={closeModal} />}
        </>
    );
};

export default ProjectGallery;