import React, { useState } from 'react';
import PortalHeader from '../member/PortalHeader';
import { useNotification } from '../../hooks/useNotification';
import { events } from '../../data/mockData';

interface CreateEventPageProps {
    onBack: () => void;
}

const eventTypes = ['Workshop', 'Competition', 'Hackathon', 'Seminar', 'Meeting'];

const CreateEventPage: React.FC<CreateEventPageProps> = ({ onBack }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState(eventTypes[0]);
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const { addNotification } = useNotification();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !date || !location || !description) {
            addNotification('All fields are required.', 'error');
            return;
        }

        const newEvent = {
            id: Date.now(),
            title,
            type,
            date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            location,
            description,
        };
        
        events.unshift(newEvent);
        
        addNotification('Event scheduled successfully!', 'success');
        onBack();
    };

    return (
        <div>
            <PortalHeader title="Schedule New Event" onBack={onBack} />
            <div className="max-w-2xl mx-auto bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-8 rounded-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Event Title</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Event Type</label>
                            <select id="type" value={type} onChange={(e) => setType(e.target.value)} required className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
                                {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="date" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Date</label>
                            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="location" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Location / Room</label>
                        <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Description</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-4">
                        <button type="button" onClick={onBack} className="w-full sm:w-auto bg-light-border dark:bg-dark-border hover:bg-gray-200 dark:hover:bg-gray-700 text-text-main-light dark:text-white font-bold py-2 px-4 sm:px-6 rounded-lg transition-colors">Cancel</button>
                        <button type="submit" className="w-full sm:w-auto bg-secondary hover:bg-purple-700 text-white font-bold py-2 px-4 sm:px-6 rounded-lg transition-all">Create Event</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEventPage;