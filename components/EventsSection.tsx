import React from 'react';
import type { ClubEvent } from '../types';
import ArrowRightIcon from './icons/ArrowRightIcon';

const eventsData: ClubEvent[] = [
    { id: 1, title: 'Annual Science & Tech Fair', type: 'Competition', date: 'Oct 28, 2024', location: 'Main Auditorium', description: 'Showcase your projects and compete for amazing prizes.' },
    { id: 2, title: 'Intro to Machine Learning', type: 'Workshop', date: 'Nov 12, 2024', location: 'CS Lab 1', description: 'A hands-on workshop covering the fundamentals of ML with Python.' },
    { id: 3, title: 'Innovation Sprint: EdTech', type: 'Hackathon', date: 'Nov 25, 2024', location: 'Innovation Hub', description: 'A 48-hour hackathon to build solutions for education.' },
];

const handlePlaceholderClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert('This feature is coming soon!');
};

const EventCard: React.FC<{ event: ClubEvent }> = ({ event }) => (
    <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl transition-all duration-300 hover:border-primary transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
            <span className="bg-secondary/20 text-secondary text-xs font-bold px-3 py-1 rounded-full">{event.type}</span>
            <span className="text-sm text-text-muted-light dark:text-text-muted-dark">{event.date}</span>
        </div>
        <h3 className="text-xl font-bold text-text-main-light dark:text-white mb-2">{event.title}</h3>
        <p className="text-text-muted-light dark:text-text-muted-dark text-sm mb-4">{event.description}</p>
        <div className="flex justify-between items-center text-sm">
             <span className="text-text-muted-light dark:text-text-muted-dark">{event.location}</span>
             <a href="#join-us" className="font-semibold text-primary hover:underline flex items-center">
                Register Now <ArrowRightIcon className="w-4 h-4 ml-1" />
             </a>
        </div>
    </div>
);


const EventsSection: React.FC = () => {
    return (
        <section id="events" className="py-20 sm:py-28 bg-light-bg dark:bg-dark-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-text-main-light dark:text-white">
                        Upcoming <span className="custom-gradient-text">Events</span>
                    </h2>
                    <p className="mt-4 text-lg text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto">
                        Join our workshops, seminars, and competitions to learn, grow, and connect.
                    </p>
                </div>
                
                <div className="max-w-4xl mx-auto space-y-6">
                    {eventsData.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
                 <div className="text-center mt-12">
                    <a href="#" onClick={handlePlaceholderClick} className="text-accent font-semibold hover:underline">
                        View Full Calendar
                    </a>
                </div>
            </div>
        </section>
    );
};

export default EventsSection;