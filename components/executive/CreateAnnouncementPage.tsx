import React, { useState } from 'react';
import PortalHeader from '../member/PortalHeader';
import { useNotification } from '../../hooks/useNotification';
import { clubUpdates } from '../../data/mockData';

interface CreateAnnouncementPageProps {
    onBack: () => void;
    author: string;
}

const CreateAnnouncementPage: React.FC<CreateAnnouncementPageProps> = ({ onBack, author }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { addNotification } = useNotification();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) {
            addNotification('Title and content are required.', 'error');
            return;
        }

        const newAnnouncement = {
            id: Date.now(),
            title,
            content,
            author,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };

        // Prepend to the mock data array
        clubUpdates.unshift(newAnnouncement);
        
        addNotification('Announcement posted successfully!', 'success');
        onBack();
    };

    return (
        <div>
            <PortalHeader title="Create Announcement" onBack={onBack} />
            <div className="max-w-2xl mx-auto bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-8 rounded-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={8}
                            className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-4">
                        <button type="button" onClick={onBack} className="w-full sm:w-auto bg-light-border dark:bg-dark-border hover:bg-gray-200 dark:hover:bg-gray-700 text-text-main-light dark:text-white font-bold py-2 px-4 sm:px-6 rounded-lg transition-colors">Cancel</button>
                        <button type="submit" className="w-full sm:w-auto bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 sm:px-6 rounded-lg transition-all">Publish Announcement</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAnnouncementPage;