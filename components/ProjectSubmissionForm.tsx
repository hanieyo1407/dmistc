import React, { useState } from 'react';
import UploadIcon from './icons/UploadIcon';
import { useNotification } from '../hooks/useNotification';
import { sendNewProjectNotification } from '../services/emailService';

interface ProjectSubmissionFormProps {
    onCancel: () => void;
    onSuccess: (projectName: string) => void;
}

const categories = ['STEM Education Outreach', 'Tech for Education', 'Innovation Sprints', 'Research Projects'];

const ProjectSubmissionForm: React.FC<ProjectSubmissionFormProps> = ({ onCancel, onSuccess }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(categories[0]);
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const { addNotification } = useNotification();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const projectData = {
            title,
            category,
            description,
            tags: tags.split(',').map(tag => tag.trim()),
            files
        };
        console.log('Submitting project:', projectData);

        // Simulate sending notification email
        sendNewProjectNotification({
            projectName: title,
            submitterName: 'Current User', // In a real app, get this from user context
            addNotification
        });

        onSuccess(title);
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold font-poppins text-text-main-light dark:text-white">
                   Submit a New <span className="custom-gradient-text">Project</span>
                </h1>
                <p className="mt-2 text-lg text-text-muted-light dark:text-text-muted-dark">Share your innovation with the community.</p>
            </div>

            <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-8 rounded-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Project Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                    </div>
                    
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Category</label>
                        <select id="category" value={category} onChange={e => setCategory(e.target.value)} required className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none">
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Project Description</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={5} className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"></textarea>
                    </div>

                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Tags (comma-separated)</label>
                        <input type="text" id="tags" value={tags} onChange={e => setTags(e.target.value)} placeholder="e.g., AI, React, Python" className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Project Files</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-light-border dark:border-dark-border border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-text-muted-light dark:text-text-muted-dark">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-light-card dark:bg-dark-card rounded-md font-medium text-primary hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-dark-card focus-within:ring-primary">
                                        <span>Upload files</span>
                                        <input id="file-upload" name="file-upload" type="file" multiple className="sr-only" onChange={handleFileChange} />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">Images, Code, Documentation up to 10MB</p>
                            </div>
                        </div>
                        {files.length > 0 && (
                            <div className="mt-4 text-sm text-text-muted-light dark:text-text-muted-dark">
                                <p className="font-semibold">Selected files:</p>
                                <ul className="list-disc list-inside">
                                    {files.map(file => <li key={file.name}>{file.name}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>


                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-4">
                        <button type="button" onClick={onCancel} className="w-full sm:w-auto bg-light-border dark:bg-dark-border hover:bg-gray-200 dark:hover:bg-gray-700 text-text-main-light dark:text-white font-bold py-2 px-4 sm:px-6 rounded-lg transition-colors">Cancel</button>
                        <button type="submit" className="w-full sm:w-auto bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 sm:px-6 rounded-lg transition-all">Submit for Review</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectSubmissionForm;