import React, { useState } from 'react';
import type { User, UserRole, ExecutiveRole, UserProfile } from '../types';
import { clubMembers } from './../data/mockData';
import { useNotification } from './../hooks/useNotification';


interface LoginSectionProps {
    onLogin: (user: User) => void;
    onNavigateToRegister: () => void;
}

const roles: UserRole[] = ['MEMBER', 'EXECUTIVE', 'ADVISOR', 'ADMIN', 'SYSTEM_ADMIN'];
const executiveRoles: ExecutiveRole[] = ['CHAIRPERSON', 'VICE_CHAIRPERSON', 'SECRETARY', 'VICE_SECRETARY', 'PROJECT_COORDINATOR', 'TREASURER', 'DISCIPLINARY_OFFICER', 'COMMUNICATION_OFFICER'];

// Fallback for generating a profile if no mock user is found
const generateMockProfile = (name: string, role: UserRole, executiveRole?: ExecutiveRole): UserProfile => {
    const [firstName, lastName] = name.split(' ');
    return {
        firstName: firstName || 'Club',
        lastName: lastName || 'Member',
        profileImage: `https://i.pravatar.cc/150?u=${name.replace(' ', '')}`,
        bio: `A passionate member of the DMIS&TC community, exploring the world of ${role.toLowerCase()}.`,
        skills: ['Teamwork', 'Problem Solving'],
        interests: ['Technology', 'Science'],
        socialLinks: {
            github: '#',
            linkedin: '#',
            twitter: '#',
        }
    };
}

const LoginSection: React.FC<LoginSectionProps> = ({ onLogin, onNavigateToRegister }) => {
    const [email, setEmail] = useState('member@dmistc.com');
    const [password, setPassword] = useState('password');
    const [role, setRole] = useState<UserRole>('MEMBER');
    const [executiveRole, setExecutiveRole] = useState<ExecutiveRole>('CHAIRPERSON');
    const { addNotification } = useNotification();


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        let userToLogin: User | undefined;

        // Find the correct user from the mock data based on selected role
        if (role === 'EXECUTIVE') {
            userToLogin = clubMembers.find(m => m.executiveRole === executiveRole);
        } else {
            // Find the first user that matches the general role
            userToLogin = clubMembers.find(m => m.role === role);
        }

        if (userToLogin) {
            onLogin(userToLogin);
        } else {
             // This is a fallback in case a role is selected for which no mock user exists.
            addNotification(`No mock user for role ${role} found. Creating a generic user.`, 'info');
            const userName = role.replace('_', ' ');
            const fallbackUser: User = {
                name: userName,
                email: 'fallback@dmistc.com',
                role,
                executiveRole: role === 'EXECUTIVE' ? executiveRole : undefined,
                profile: generateMockProfile(userName, role, executiveRole),
            };
            onLogin(fallbackUser);
        }
    };

    const handlePlaceholderClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        alert('Feature coming soon!');
    };

    return (
        <section id="login" className="w-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-8 text-center shadow-2xl shadow-primary/10">
                    <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-text-main-light dark:text-white mb-4">
                        Member <span className="custom-gradient-text">Portal</span>
                    </h2>
                    <p className="text-text-muted-light dark:text-text-muted-dark mb-8">
                        Select a role to simulate login.
                    </p>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                         <div>
                            <select 
                                value={role} 
                                onChange={e => setRole(e.target.value as UserRole)}
                                className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none"
                                aria-label="Select Role"
                            >
                                {roles.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
                            </select>
                        </div>
                        {role === 'EXECUTIVE' && (
                            <div>
                                <select 
                                    value={executiveRole} 
                                    onChange={e => setExecutiveRole(e.target.value as ExecutiveRole)}
                                    className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-secondary transition-all appearance-none"
                                    aria-label="Select Executive Role"
                                >
                                    {executiveRoles.map(r => <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>)}
                                </select>
                            </div>
                        )}
                         <div className="text-left text-xs text-text-muted-light dark:text-text-muted-dark">
                            <p>Note: Email and password fields are for demonstration purposes only. Login is determined by the selected role.</p>
                        </div>
                        <button 
                            type="submit"
                            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Sign In
                        </button>
                    </form>
                     <div className="text-sm text-gray-500 mt-6 space-y-2">
                        <p>
                            Don't have an account?{' '}
                            <button onClick={onNavigateToRegister} className="text-accent hover:underline bg-transparent border-none p-0 cursor-pointer font-medium">
                                Become a Member
                            </button>
                        </p>
                        <p>
                            <a href="#" onClick={handlePlaceholderClick} className="hover:underline">Forgot Password?</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginSection;
