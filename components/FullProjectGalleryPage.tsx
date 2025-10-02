import React, { useState, useEffect } from 'react';
import type { Project } from '../types';
import ProjectModal from './ProjectModal';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ProjectCard from './ProjectCard';

const initialProjects: Project[] = [
    { id: 1, title: 'AI-Powered Learning Assistant', category: 'Tech for Education', description: 'An intelligent tutor for science students, providing personalized feedback.', longDescription: 'This project utilizes natural language processing and machine learning algorithms to create a dynamic learning environment. It integrates with existing course materials to offer students 24/7 assistance, track their progress, and identify areas where they need additional help. The backend is built with Python and FastAPI, while the frontend uses React and Tailwind CSS.', imageUrl: 'https://picsum.photos/seed/ai/500/400', tags: ['AI', 'React', 'Python', 'NLP'], githubLink: '#', liveDemo: '#', collaborators: ['Jane Doe', 'John Smith'] },
    { id: 2, title: 'Mobile Science Lab Outreach', category: 'STEM Education Outreach', description: 'Bringing hands-on science experiments to local schools using a mobile app.', longDescription: 'To bridge the gap in STEM education, this project developed a mobile application that guides students through safe, accessible science experiments using household materials. It includes video tutorials, quizzes, and a platform for students to share their results. The app is built with React Native for cross-platform compatibility.', imageUrl: 'https://picsum.photos/seed/outreach/500/400', tags: ['Mobile', 'Education', 'Community', 'React Native'], githubLink: '#', collaborators: ['Peter Jones'] },
    { id: 3, title: 'Automated Irrigation System', category: 'Innovation Sprints', description: 'A smart IoT device to optimize water usage in agriculture.', longDescription: 'This project is an IoT-based solution aimed at conserving water in local farms. It uses soil moisture sensors, weather forecast APIs, and an Arduino microcontroller to automatically manage irrigation schedules. A web dashboard allows farmers to monitor water usage and system status in real-time.', imageUrl: 'https://picsum.photos/seed/iot/500/400', tags: ['IoT', 'Arduino', 'Sustainability', 'Firebase'], githubLink: '#', liveDemo: '#', collaborators: ['Alice Johnson', 'Bob Williams'] },
    { id: 4, title: 'Collaborative Research Platform', category: 'Research Projects', description: 'A web platform for students to collaborate on research papers.', longDescription: 'This platform provides a centralized hub for student researchers to collaborate. Features include real-time document editing, version control, citation management, and a peer-review system. It is built on the MERN stack (MongoDB, Express, React, Node.js) and uses Socket.io for real-time features.', imageUrl: 'https://picsum.photos/seed/research/500/400', tags: ['Web', 'Collaboration', 'Node.js', 'MongoDB'], githubLink: '#', collaborators: ['Charlie Brown'] },
    { id: 5, title: 'Gamified Coding Tutor', category: 'Tech for Education', description: 'Learn Python basics through an interactive, game-like experience.', longDescription: 'This web-based platform makes learning to code fun and engaging for beginners. It features a series of challenges and quests that teach fundamental Python concepts. The platform includes a code editor, instant feedback, and a point-based reward system to motivate users.', imageUrl: 'https://picsum.photos/seed/gamify/500/400', tags: ['Gamification', 'Python', 'Web', 'Education'], githubLink: '#', collaborators: ['Emily White'] },
    { id: 6, title: 'Community Health Monitoring', category: 'STEM Education Outreach', description: 'A data visualization tool for local health trends.', longDescription: 'In partnership with the local clinic, this project aggregates anonymized health data and presents it on an interactive map. The goal is to help the community understand health trends and for our science education students to learn about data analysis. Built with D3.js and React.', imageUrl: 'https://picsum.photos/seed/health/500/400', tags: ['Data Viz', 'Health', 'D3.js', 'Community'], githubLink: '#', liveDemo: '#', collaborators: ['Frank Green', 'Grace Black'] },
];

const projectsData: Project[] = Array.from({ length: 3 }, (_, i) => 
    initialProjects.map((p, j) => ({ ...p, id: i * initialProjects.length + j + 1, title: `${p.title} #${i+1}` }))
).flat();

const categories = ['All', 'STEM Education Outreach', 'Tech for Education', 'Innovation Sprints', 'Research Projects'];

interface FullProjectGalleryPageProps {
    onNavigateToHome: () => void;
}

const FullProjectGalleryPage: React.FC<FullProjectGalleryPageProps> = ({ onNavigateToHome }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const PROJECTS_PER_PAGE = 9;

    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);
    
    const filteredProjects = activeCategory === 'All'
        ? projectsData
        : projectsData.filter(p => p.category === activeCategory);
    
    const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
    const indexOfLastProject = currentPage * PROJECTS_PER_PAGE;
    const indexOfFirstProject = indexOfLastProject - PROJECTS_PER_PAGE;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
        
    const openModal = (project: Project) => setSelectedProject(project);
    const closeModal = () => setSelectedProject(null);

    return (
        <>
            <section id="full-projects" className="py-28 bg-light-bg/50 dark:bg-dark-bg/50 min-h-screen">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:justify-center md:items-center md:relative text-center mb-16">
                        <button onClick={onNavigateToHome} className="self-start md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 flex items-center gap-2 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-primary text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-white font-semibold py-2 px-4 rounded-lg transition-colors mb-6 md:mb-0">
                            <ArrowLeftIcon className="w-5 h-5" />
                            <span>Home</span>
                        </button>
                        <div className="flex-grow">
                            <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-text-main-light dark:text-white">
                                Project <span className="custom-gradient-text">Gallery</span>
                            </h2>
                            <p className="mt-4 text-lg text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto">
                                Explore the innovative projects born from the collaboration of our brilliant members.
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ${activeCategory === category ? 'bg-primary text-white' : 'bg-light-card dark:bg-dark-card text-text-muted-light dark:text-text-muted-dark hover:bg-light-border dark:hover:bg-dark-border'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentProjects.map(project => (
                            <ProjectCard key={project.id} project={project} onLearnMore={openModal} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-16">
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
            </section>
            {selectedProject && <ProjectModal project={selectedProject} onClose={closeModal} />}
        </>
    );
};

export default FullProjectGalleryPage;