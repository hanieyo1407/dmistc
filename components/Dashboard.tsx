import React from 'react';

interface DashboardProps {
    onShowSubmitForm: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onShowSubmitForm }) => {
    const handleActionClick = () => {
        alert('This feature is coming soon!');
    };

    return (
        <section id="dashboard" className="py-12 sm:py-16 animate-fade-in-up">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold font-poppins text-white">
                        Welcome Back, <span className="custom-gradient-text">Member</span>
                    </h1>
                    <p className="mt-2 text-lg text-gray-400">Here's your personal overview.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quick Stats */}
                        <div className="grid sm:grid-cols-3 gap-6">
                            <div className="bg-dark-card border border-dark-border p-6 rounded-xl text-center">
                                <p className="text-4xl font-bold text-primary">5</p>
                                <p className="text-gray-400">Projects Submitted</p>
                            </div>
                            <div className="bg-dark-card border border-dark-border p-6 rounded-xl text-center">
                                <p className="text-4xl font-bold text-secondary">12</p>
                                <p className="text-gray-400">Events Attended</p>
                            </div>
                            <div className="bg-dark-card border border-dark-border p-6 rounded-xl text-center">
                                <p className="text-4xl font-bold text-accent">3</p>
                                <p className="text-gray-400">Achievements Unlocked</p>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-dark-card border border-dark-border p-6 rounded-xl">
                             <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                             <p className="text-gray-400">Activity feed coming soon...</p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                         <div className="bg-dark-card border border-dark-border p-6 rounded-xl">
                             <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                             <div className="flex flex-col space-y-3">
                                <button onClick={onShowSubmitForm} className="w-full bg-primary/20 hover:bg-primary/40 text-primary font-semibold p-3 rounded-lg text-center transition-colors">Submit New Project</button>
                                <button onClick={handleActionClick} className="w-full bg-secondary/20 hover:bg-secondary/40 text-secondary font-semibold p-3 rounded-lg text-center transition-colors">RSVP to Events</button>
                                <button onClick={handleActionClick} className="w-full bg-accent/20 hover:bg-accent/40 text-accent font-semibold p-3 rounded-lg text-center transition-colors">Update Profile</button>
                             </div>
                        </div>
                         <div className="bg-dark-card border border-dark-border p-6 rounded-xl">
                             <h2 className="text-xl font-bold text-white mb-4">Upcoming Deadlines</h2>
                             <p className="text-gray-400">Deadline tracking coming soon...</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
