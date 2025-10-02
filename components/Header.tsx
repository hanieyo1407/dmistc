import React, { useState, useEffect } from 'react';
import MenuIcon from './icons/MenuIcon';
import CloseIcon from './icons/CloseIcon';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import type { User } from '../types';

interface HeaderProps {
    user: User | null;
    onLogout: () => void;
    onNavigate: (view: 'dashboard' | 'profile') => void;
    onNavigateToLogin: () => void;
    onNavigateToRegister: () => void;
    onNavigateToGallery: () => void;
    onNavigateToMoments: () => void;
    activePage: 'home' | 'login' | 'register' | 'gallery' | 'moments';
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onNavigate, onNavigateToLogin, onNavigateToRegister, onNavigateToGallery, onNavigateToMoments, activePage, theme, onToggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href')?.substring(1);
        if (!targetId) return;

        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };
    
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string, isMobile: boolean) => {
        e.preventDefault();
        
        if (href === '#dashboard') {
            onNavigate('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (href === '#join-us') {
            onNavigateToRegister();
        } else if (href === '#projects') {
            onNavigateToGallery();
        } else if (href === '#moments') {
            onNavigateToMoments();
        }
         else {
             handleSmoothScroll(e as React.MouseEvent<HTMLAnchorElement>);
        }

        if (isMobile) {
            setMobileMenuOpen(false);
        }
    };

    const getNavItems = () => {
        if (user) {
            return [{ name: 'Dashboard', href: '#dashboard' }];
        }
        if (activePage !== 'home') {
            return [];
        }
        return [
            { name: 'About', href: '#about' },
            { name: 'Projects', href: '#projects' },
            { name: 'Moments', href: '#moments' },
            { name: 'Events', href: '#events' },
            { name: 'Join', href: '#join-us' }
        ];
    };
    
    const navItems = getNavItems();

    const NavLinks: React.FC<{isMobile?: boolean}> = ({ isMobile = false }) => (
        <>
            {navItems.map((item) => {
                if (['#join-us', '#projects', '#moments'].includes(item.href)) {
                     return <button
                        key={item.name}
                        onClick={(e) => handleLinkClick(e, item.href, isMobile)}
                        className={isMobile ? "block text-2xl font-bold py-4 text-center text-text-main-light dark:text-text-main-dark hover:custom-gradient-text transition-colors" : "text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-text-main-dark transition-colors duration-300"}
                    >
                        {item.name}
                    </button>
                }
                return (
                    <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.href, isMobile)}
                        className={isMobile ? "block text-2xl font-bold py-4 text-center text-text-main-light dark:text-text-main-dark hover:custom-gradient-text transition-colors" : "text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-text-main-dark transition-colors duration-300"}
                    >
                        {item.name}
                    </a>
                )
            })}
        </>
    );
    
    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || mobileMenuOpen || activePage !== 'home' ? 'bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-sm border-b border-light-border dark:border-dark-border' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <a href="#" className="flex items-center space-x-2" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                        <span className="text-xl font-bold font-poppins custom-gradient-text">DMIS&TC</span>
                    </a>
                    <nav className="hidden md:flex space-x-8">
                        <NavLinks />
                    </nav>
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                             <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                                Logout
                             </button>
                        ) : (
                            activePage === 'home' && (
                                <button onClick={onNavigateToLogin} className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                                   Member Login
                                </button>
                            )
                        )}
                        <button onClick={onToggleTheme} className="bg-light-border dark:bg-dark-border p-2 rounded-full text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-secondary transition-colors" aria-label="Toggle theme">
                           {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                        </button>
                    </div>
                    {activePage === 'home' && (
                        <button className="md:hidden text-text-main-light dark:text-text-main-dark z-50" onClick={toggleMobileMenu}>
                           {mobileMenuOpen ? <CloseIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed inset-0 bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-xl transition-transform duration-300 ease-in-out transform ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`} style={{ paddingTop: '2rem' }}>
                <nav className="flex flex-col items-center justify-center h-full space-y-8">
                    <NavLinks isMobile />
                    <div className="mt-8 flex flex-col items-center space-y-6">
                         {user ? (
                             <button onClick={() => { onLogout(); toggleMobileMenu(); }} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 text-base rounded-lg transition-all duration-300">
                                Logout
                             </button>
                        ) : (
                            <button onClick={() => { onNavigateToLogin(); toggleMobileMenu(); }} className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-5 text-base rounded-lg transition-all duration-300">
                               Member Login
                            </button>
                        )}
                        <button onClick={onToggleTheme} className="bg-light-border dark:bg-dark-border p-3 rounded-full text-text-muted-light dark:text-text-muted-dark" aria-label="Toggle theme">
                             {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;