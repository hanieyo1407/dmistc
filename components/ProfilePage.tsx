import React, { useState } from 'react';
import type { User, UserProfile as UserProfileType } from '../types';
import EditIcon from './icons/EditIcon';
import GithubIcon from './icons/GithubIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import TwitterIcon from './icons/TwitterIcon';

interface ProfilePageProps {
    user: User;
    onProfileUpdate: (updatedUser: User) => void;
}

const ProfileDisplay: React.FC<{ user: User, onEdit: () => void }> = ({ user, onEdit }) => (
    <>
        <div className="relative">
            <div className="absolute top-0 right-0">
                <button onClick={onEdit} className="flex items-center gap-2 bg-light-border dark:bg-dark-border hover:bg-gray-200 dark:hover:bg-gray-700 text-text-main-light dark:text-white font-bold py-1.5 px-3 text-sm sm:py-2 sm:px-4 sm:text-base rounded-lg transition-colors">
                    <EditIcon className="w-5 h-5" />
                    <span>Edit Profile</span>
                </button>
            </div>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img src={user.profile.profileImage} alt={`${user.name}`} className="w-32 h-32 rounded-full border-4 border-primary shadow-lg" />
            <div className="text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold font-poppins text-text-main-light dark:text-white">{user.profile.firstName} {user.profile.lastName}</h1>
                <p className="text-lg text-secondary font-semibold">{user.role.replace('_', ' ')}</p>
                 <div className="flex justify-center md:justify-start space-x-4 mt-4">
                    {user.profile.socialLinks.github && <a href={user.profile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-white"><GithubIcon className="w-6 h-6" /></a>}
                    {user.profile.socialLinks.linkedin && <a href={user.profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-white"><LinkedInIcon className="w-6 h-6" /></a>}
                    {user.profile.socialLinks.twitter && <a href={user.profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-white"><TwitterIcon className="w-6 h-6" /></a>}
                </div>
            </div>
        </div>
        <div className="mt-8 pt-8 border-t border-light-border dark:border-dark-border">
            <div>
                <h2 className="text-xl font-bold text-text-main-light dark:text-white mb-2">About Me</h2>
                <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">{user.profile.bio || 'No bio provided.'}</p>
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-bold text-text-main-light dark:text-white mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {user.profile.skills.length > 0 ? user.profile.skills.map(skill => (
                        <span key={skill} className="bg-primary/20 text-primary font-semibold px-3 py-1 rounded-full text-sm">{skill}</span>
                    )) : <p className="text-gray-500">No skills listed.</p>}
                </div>
            </div>
             <div className="mt-6">
                <h2 className="text-xl font-bold text-text-main-light dark:text-white mb-3">Interests</h2>
                <div className="flex flex-wrap gap-2">
                     {user.profile.interests.length > 0 ? user.profile.interests.map(interest => (
                        <span key={interest} className="bg-secondary/20 text-secondary font-semibold px-3 py-1 rounded-full text-sm">{interest}</span>
                    )) : <p className="text-gray-500">No interests listed.</p>}
                </div>
            </div>
        </div>
    </>
);

const ProfileForm: React.FC<{ user: User, onSave: (profileData: UserProfileType) => void, onCancel: () => void }> = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        ...user.profile,
        skills: user.profile.skills.join(', '),
        interests: user.profile.interests.join(', '),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [name]: value,
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalProfile: UserProfileType = {
            ...formData,
            skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
            interests: formData.interests.split(',').map(i => i.trim()).filter(Boolean),
        };
        onSave(finalProfile);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">First Name</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                </div>
                 <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                </div>
            </div>
            <div>
                <label htmlFor="bio" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Bio</label>
                <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"></textarea>
            </div>
             <div>
                <label htmlFor="skills" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Skills (comma-separated)</label>
                <input type="text" id="skills" name="skills" value={formData.skills} onChange={handleChange} className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
            </div>
             <div>
                <label htmlFor="interests" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Interests (comma-separated)</label>
                <input type="text" id="interests" name="interests" value={formData.interests} onChange={handleChange} className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
                <div>
                    <label htmlFor="github" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">GitHub URL</label>
                    <input type="url" id="github" name="github" value={formData.socialLinks.github} onChange={handleSocialChange} className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">LinkedIn URL</label>
                    <input type="url" id="linkedin" name="linkedin" value={formData.socialLinks.linkedin} onChange={handleSocialChange} className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                </div>
                <div>
                    <label htmlFor="twitter" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Twitter URL</label>
                    <input type="url" id="twitter" name="twitter" value={formData.socialLinks.twitter} onChange={handleSocialChange} className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-4">
                <button type="button" onClick={onCancel} className="w-full sm:w-auto bg-light-border dark:bg-dark-border hover:bg-gray-200 dark:hover:bg-gray-700 text-text-main-light dark:text-white font-bold py-2 px-4 sm:px-6 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="w-full sm:w-auto bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 sm:px-6 rounded-lg transition-all">Save Changes</button>
            </div>
        </form>
    );
};


const ProfilePage: React.FC<ProfilePageProps> = ({ user, onProfileUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    
    const handleSave = (profileData: UserProfileType) => {
        const updatedUser = { 
            ...user, 
            profile: profileData,
            name: `${profileData.firstName} ${profileData.lastName}`,
        };
        onProfileUpdate(updatedUser);
        setIsEditing(false);
    };

    return (
        <section id="profile" className="py-12 sm:py-16 animate-fade-in-up">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-8">
                     {isEditing ? (
                        <ProfileForm user={user} onSave={handleSave} onCancel={() => setIsEditing(false)} />
                     ) : (
                        <ProfileDisplay user={user} onEdit={() => setIsEditing(true)} />
                     )}
                </div>
            </div>
        </section>
    );
};

export default ProfilePage;