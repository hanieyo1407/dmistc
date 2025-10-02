import React from 'react';
import type { StrategicGoal } from '../types';
import CommunityImpactIcon from './icons/CommunityImpactIcon';
import HolisticDevelopmentIcon from './icons/HolisticDevelopmentIcon';
import SustainableEcosystemIcon from './icons/SustainableEcosystemIcon';
import InterdisciplinaryCollaborationIcon from './icons/InterdisciplinaryCollaborationIcon';
import AcademicLinkagesIcon from './icons/AcademicLinkagesIcon';
import VisibilityInfluenceIcon from './icons/VisibilityInfluenceIcon';

const strategicGoals: StrategicGoal[] = [
    { title: 'Community Impact', description: 'Driving positive change through STEM outreach and community-focused projects.', icon: CommunityImpactIcon },
    { title: 'Holistic Development', description: 'Fostering not just technical skills, but also leadership, communication, and teamwork.', icon: HolisticDevelopmentIcon },
    { title: 'Sustainable Ecosystem', description: 'Building long-term partnerships with industry leaders and academic institutions.', icon: SustainableEcosystemIcon },
    { title: 'Interdisciplinary Collaboration', description: 'Breaking down silos between Computer Science and Science Education.', icon: InterdisciplinaryCollaborationIcon },
    { title: 'Academic & Industry Linkages', description: 'Connecting students with internships, mentorship, and research opportunities.', icon: AcademicLinkagesIcon },
    { title: 'Visibility and Influence', description: 'Showcasing member achievements to establish the club as a center of excellence.', icon: VisibilityInfluenceIcon },
];

const AboutSection: React.FC = () => {
    return (
        <section id="about" className="py-20 sm:py-28 bg-light-bg dark:bg-dark-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-text-main-light dark:text-white">
                        A Hub for <span className="custom-gradient-text">STEM Innovation</span>
                    </h2>
                    <p className="mt-4 text-lg text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto">
                        Empowering students in Computer Science and Science Education through collaboration, mentorship, and real-world projects.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-text-main-light dark:text-white mb-3">Our Vision</h3>
                            <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                                To establish a vibrant and inclusive STEM community that inspires innovation, critical thinking, and lifelong learning through cross-disciplinary collaboration and real-world engagement.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-text-main-light dark:text-white mb-3">Our Mission</h3>
                            <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                                To empower students in STEM fields by offering a collaborative platform for interdisciplinary projects, knowledge sharing, and mentorship. We aim to nurture innovation, leadership, and a passion for science that extends beyond the classroom.
                            </p>
                        </div>
                    </div>
                    <div>
                        <img src="https://picsum.photos/seed/tech/600/400" alt="Club members collaborating" className="rounded-xl shadow-2xl shadow-secondary/20 w-full" />
                    </div>
                </div>

                <div className="text-center mb-16">
                    <h3 className="text-3xl font-bold text-text-main-light dark:text-white">Our Strategic Goals</h3>
                    <p className="mt-2 text-text-muted-light dark:text-text-muted-dark">The pillars that guide our mission.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {strategicGoals.map((goal) => (
                        <div key={goal.title} className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl text-center transition-all duration-300 hover:border-secondary hover:shadow-lg hover:shadow-secondary/10 transform hover:-translate-y-1">
                            <div className="flex justify-center mb-4">
                                <div className="bg-gray-100 dark:bg-dark-border p-3 rounded-full">
                                    <goal.icon className="w-8 h-8 text-secondary" />
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-text-main-light dark:text-white mb-2">{goal.title}</h4>
                            <p className="text-text-muted-light dark:text-text-muted-dark text-sm">{goal.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;