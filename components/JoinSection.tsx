import React, { useState } from 'react';
import UserProfileIcon from './icons/UserProfileIcon';
import LockIcon from './icons/LockIcon';
import AcademicCapIcon from './icons/AcademicCapIcon';
import SparklesIcon from './icons/SparklesIcon';
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';

interface JoinSectionProps {
    onNavigateToLogin: () => void;
    onNavigateToHome: () => void;
}

const interestsList = [
    // Computer Science & Tech
    'AI / Machine Learning',
    'Web & Mobile Development',
    'Cybersecurity',
    'Data Science & Analytics',
    'IoT & Robotics',
    'Electronics & Hardware',
    'UI/UX Design',
    'AR / VR Development',
    // Science & Education
    'STEM Education Outreach',
    'Science Communication',
    'Educational Technology (EdTech)',
    'Curriculum Development',
    'Biology & Biotechnology',
    'Chemistry & Material Science',
    'Physics & Renewable Energy',
    'Environmental Science',
    'Mathematical Modeling',
    // General
    'Research Projects',
    'Innovation & Entrepreneurship',
    'Astrophysics & Space Tech',
];


const StepIndicator: React.FC<{ step: number, currentStep: number, title: string, icon: React.ReactNode }> = ({ step, currentStep, title, icon }) => {
    const isActive = step === currentStep;
    const isCompleted = step < currentStep;

    return (
         <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                isActive ? 'bg-primary border-primary text-white' : 
                isCompleted ? 'bg-success border-success text-white' : 
                'bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-text-muted-light dark:text-text-muted-dark'
            }`}>
                {isCompleted ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : icon}
            </div>
            <p className={`mt-2 text-xs text-center font-semibold ${isActive ? 'text-primary' : 'text-text-muted-light dark:text-text-muted-dark'}`}>{title}</p>
        </div>
    )
};

const JoinSection: React.FC<JoinSectionProps> = ({ onNavigateToLogin, onNavigateToHome }) => {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        studentId: '',
        email: '',
        password: '',
        confirmPassword: '',
        program: '',
        year: '',
        interests: [] as string[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleInterestToggle = (interest: string) => {
        setFormData(prev => {
            const newInterests = prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest];
            return { ...prev, interests: newInterests };
        });
    };

    const handleNext = () => {
        // Add validation logic here per step
        if (step === 2) {
            if (formData.password !== formData.confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
        }
        setStep(s => s + 1);
    };

    const handleBack = () => setStep(s => s - 1);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.interests.length === 0) {
            alert('Please select at least one interest.');
            return;
        }
        console.log('Registration Data:', formData);
        setSubmitted(true);
    };
    
    const steps = [
        { num: 1, title: "Personal", icon: <UserProfileIcon className="w-5 h-5"/> },
        { num: 2, title: "Account", icon: <LockIcon className="w-5 h-5"/> },
        { num: 3, title: "Academic", icon: <AcademicCapIcon className="w-5 h-5"/> },
        { num: 4, title: "Interests", icon: <SparklesIcon className="w-5 h-5"/> },
    ];

    return (
        <section id="join-us" className="w-full max-w-2xl mx-auto">
            <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-8 shadow-2xl shadow-secondary/10">
                {submitted ? (
                    <div className="text-center animate-fade-in-up py-8">
                        <PaperAirplaneIcon className="w-16 h-16 text-success mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-text-main-light dark:text-white mb-2">Registration Submitted</h2>
                        <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
                            Thank you for your interest! Your application is now pending approval from the Club Chairperson. You will receive an email once your registration has been reviewed.
                        </p>
                        <button onClick={onNavigateToHome} className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                            Back to Home
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-8">
                            <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-text-main-light dark:text-white">
                               Join The <span className="custom-gradient-text">Community</span>
                            </h2>
                             <p className="text-text-muted-light dark:text-text-muted-dark mt-2">
                                Become a part of the future of STEM at Mangochi.
                            </p>
                        </div>

                        <div className="flex justify-between items-start mb-8 px-4">
                            {steps.map((s, index) => (
                                <React.Fragment key={s.num}>
                                    <StepIndicator step={s.num} currentStep={step} title={s.title} icon={s.icon}/>
                                    {index < steps.length - 1 && <div className={`flex-1 h-0.5 mt-5 ${step > s.num ? 'bg-success' : 'bg-light-border dark:bg-dark-border'}`}></div>}
                                </React.Fragment>
                            ))}
                        </div>

                         <form onSubmit={handleSubmit} className="space-y-6">
                            {step === 1 && (
                                <div className="space-y-6 animate-fade-in-up">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" aria-label="First Name" />
                                        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Last Name" />
                                    </div>
                                    <input type="text" name="studentId" placeholder="Student ID" value={formData.studentId} onChange={handleChange} required className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Student ID"/>
                                </div>
                            )}
                            {step === 2 && (
                                 <div className="space-y-6 animate-fade-in-up">
                                    <input type="email" name="email" placeholder="Student Email" value={formData.email} onChange={handleChange} required className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Student Email"/>
                                    <input type="password" name="password" placeholder="Create Password" value={formData.password} onChange={handleChange} required className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Create Password"/>
                                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Confirm Password"/>
                                </div>
                            )}
                            {step === 3 && (
                                <div className="space-y-6 animate-fade-in-up">
                                    <select name="program" value={formData.program} onChange={handleChange} required className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
                                        <option value="">Select Program of Study</option>
                                        <option>BSc. Computer Science</option>
                                        <option>BEd. Science (Mathematics)</option>
                                        <option>BEd. Science (Biology)</option>
                                        <option>BEd. Science (Chemistry)</option>
                                        <option>BEd. Science (Physics)</option>
                                        <option>Other Technology Program</option>
                                    </select>
                                    <select name="year" value={formData.year} onChange={handleChange} required className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
                                        <option value="">Select Year of Study</option>
                                        <option>Year 1</option>
                                        <option>Year 2</option>
                                        <option>Year 3</option>
                                        <option>Year 4</option>
                                        <option>Postgraduate</option>
                                    </select>
                                </div>
                            )}
                            {step === 4 && (
                                <div className="animate-fade-in-up">
                                    <p className="text-text-muted-light dark:text-text-muted-dark mb-4">Select your interests to help us connect you with the right projects and people.</p>
                                    <div className="flex flex-wrap gap-3">
                                        {interestsList.map(interest => (
                                            <button
                                                type="button"
                                                key={interest}
                                                onClick={() => handleInterestToggle(interest)}
                                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                                                    formData.interests.includes(interest) 
                                                    ? 'bg-secondary text-white ring-2 ring-offset-2 ring-offset-light-card dark:ring-offset-dark-card ring-secondary' 
                                                    : 'bg-light-bg dark:bg-dark-bg text-text-muted-light dark:text-text-muted-dark hover:bg-light-border dark:hover:bg-dark-border'
                                                }`}
                                            >
                                                {interest}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            <div className="flex flex-col-reverse sm:flex-row justify-between items-center pt-6 gap-4">
                                {step > 1 ? (
                                    <button type="button" onClick={handleBack} className="w-full sm:w-auto bg-light-border dark:bg-dark-border hover:bg-gray-200 dark:hover:bg-gray-700 text-text-main-light dark:text-white font-bold py-2 px-5 sm:py-3 sm:px-6 rounded-lg transition-colors">Back</button>
                                ) : <div className="hidden sm:block"></div>}
                                
                                {step < 4 ? (
                                    <button type="button" onClick={handleNext} className="w-full sm:w-auto bg-primary hover:bg-blue-600 text-white font-bold py-2 px-5 sm:py-3 sm:px-6 rounded-lg transition-colors">Next</button>
                                ) : (
                                    <button type="submit" className="w-full sm:w-auto bg-secondary hover:bg-purple-700 text-white font-bold py-2 px-5 sm:py-3 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105">Complete Registration</button>
                                )}
                            </div>
                         </form>
                         <div className="text-sm text-gray-500 mt-6 text-center">
                            <p>
                                Already have an account?{' '}
                                <button onClick={onNavigateToLogin} className="text-accent hover:underline bg-transparent border-none p-0 cursor-pointer font-medium">
                                    Sign In
                                </button>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default JoinSection;