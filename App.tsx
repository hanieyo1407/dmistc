import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ProjectGallery from './components/ProjectGallery';
import FullProjectGalleryPage from './components/FullProjectGalleryPage';
import MomentsGalleryPage from './components/MomentsGalleryPage';
import EventsSection from './components/EventsSection';
import SuccessStories from './components/SuccessStories';
import JoinSection from './components/JoinSection';
import LoginSection from './components/LoginSection';
import Footer from './components/Footer';
import MemberPortal from './components/MemberPortal';
import type { User } from './types';
import { NotificationProvider } from './context/NotificationContext';
import ToastContainer from './components/ToastContainer';

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [portalView, setPortalView] = useState<'dashboard' | 'profile'>('dashboard');
    const [activePage, setActivePage] = useState<'home' | 'login' | 'register' | 'gallery' | 'moments'>('home');
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        // Apply theme class to the root element
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3500); // Corresponds to the duration of the loading animation
        return () => clearTimeout(timer);
    }, []);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const handleLogin = (user: User) => {
        setCurrentUser(user);
        setPortalView('dashboard');
        setActivePage('home'); // Reset on login
        window.scrollTo(0, 0);
    };
    
    const handleLogout = () => {
        setCurrentUser(null);
        setActivePage('home'); // Go to home on logout
        window.scrollTo(0, 0);
    };

    const navigateToLogin = () => {
        setActivePage('login');
        window.scrollTo(0, 0);
    };

    const navigateToRegister = () => {
        setActivePage('register');
        window.scrollTo(0, 0);
    };
    
    const navigateToGallery = () => {
        setActivePage('gallery');
        window.scrollTo(0, 0);
    };
    
    const navigateToMoments = () => {
        setActivePage('moments');
        window.scrollTo(0, 0);
    };

    const navigateToHome = () => {
        setActivePage('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    const handleProfileUpdate = (updatedUser: User) => {
        setCurrentUser(updatedUser);
    };

    if (loading) {
        return <LoadingScreen />;
    }

    const renderPublicPages = () => {
        switch(activePage) {
            case 'login':
                return (
                    <main className="min-h-screen flex items-center justify-center py-28">
                        <LoginSection onLogin={handleLogin} onNavigateToRegister={navigateToRegister} />
                    </main>
                );
            case 'register':
                return (
                    <main className="min-h-screen flex items-center justify-center py-28">
                        <JoinSection onNavigateToLogin={navigateToLogin} onNavigateToHome={navigateToHome} />
                    </main>
                );
            case 'gallery':
                return (
                     <main className="min-h-screen">
                        <FullProjectGalleryPage onNavigateToHome={navigateToHome} />
                    </main>
                );
            case 'moments':
                return (
                     <main className="min-h-screen">
                        <MomentsGalleryPage onNavigateToHome={navigateToHome} />
                    </main>
                );
            case 'home':
            default:
                 return (
                    <main>
                        <Hero onNavigateToRegister={navigateToRegister} onNavigateToGallery={navigateToGallery} />
                        <AboutSection />
                        <ProjectGallery onNavigateToGallery={navigateToGallery} />
                        <SuccessStories />
                        <EventsSection />
                    </main>
                );
        }
    };

    return (
        <NotificationProvider>
            <div className="min-h-screen font-inter">
                <ToastContainer />
                <Header 
                    user={currentUser} 
                    onLogout={handleLogout} 
                    onNavigate={setPortalView}
                    onNavigateToLogin={navigateToLogin}
                    onNavigateToRegister={navigateToRegister}
                    onNavigateToGallery={navigateToGallery}
                    onNavigateToMoments={navigateToMoments}
                    activePage={activePage}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                 />
                {currentUser ? (
                    <MemberPortal 
                        user={currentUser} 
                        view={portalView}
                        onNavigate={setPortalView}
                        onProfileUpdate={handleProfileUpdate}
                    />
                ) : (
                    renderPublicPages()
                )}
                <Footer onNavigateToRegister={navigateToRegister}/>
            </div>
        </NotificationProvider>
    );
};

export default App;