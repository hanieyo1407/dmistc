import React from 'react';
import type { SuccessStory } from '../types';

const storiesData: SuccessStory[] = [
    { id: 1, name: 'Grace Phiri', role: 'BSc. Computer Science', story: 'The club provided me with the mentorship and resources to lead a project that won first place at the National Tech Fair. It was an incredible experience that opened up internship opportunities.', imageUrl: 'https://picsum.photos/seed/grace/200/200' },
    { id: 2, name: 'Samuel Banda', role: 'BEd. Science (Physics)', story: 'Through the STEM outreach programs, I discovered my passion for teaching. Collaborating with CS students on an EdTech app gave me invaluable skills for my future career as an educator.', imageUrl: 'https://picsum.photos/seed/samuel/200/200' },
    { id: 3, name: 'Thokozani Moyo', role: 'BSc. Computer Science', story: 'The innovation sprints were a game-changer. I learned to code under pressure, collaborate effectively, and turn an idea into a working prototype in just 48 hours. I now feel confident to tackle any real-world challenge.', imageUrl: 'https://picsum.photos/seed/thoko/200/200' },
];

const SuccessStoryCard: React.FC<{ story: SuccessStory }> = ({ story }) => (
    <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-8 rounded-xl h-full flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-2 hover:border-accent">
        <img src={story.imageUrl} alt={story.name} className="w-24 h-24 rounded-full mb-4 border-2 border-accent" />
        <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed italic mb-6 flex-grow">"{story.story}"</p>
        <div>
            <h4 className="font-bold text-lg text-text-main-light dark:text-white">{story.name}</h4>
            <p className="text-accent font-medium">{story.role}</p>
        </div>
    </div>
);


const SuccessStories: React.FC = () => {
    return (
        <section id="success-stories" className="py-20 sm:py-28 bg-light-bg dark:bg-dark-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-text-main-light dark:text-white">
                        Member <span className="custom-gradient-text">Spotlight</span>
                    </h2>
                    <p className="mt-4 text-lg text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto">
                        Hear from our members about their journey and achievements within the club.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {storiesData.map(story => (
                        <SuccessStoryCard key={story.id} story={story} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;