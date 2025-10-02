import React from 'react';
import GithubIcon from './icons/GithubIcon';

interface FooterProps {
    onNavigateToRegister: () => void;
}

const SocialLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-white transition-colors duration-300">
        {children}
    </a>
);

const Footer: React.FC<FooterProps> = ({ onNavigateToRegister }) => {
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

    return (
        <footer id="contact" className="bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-lg font-bold text-text-main-light dark:text-white font-poppins mb-2">DMIS&TC Mangochi Hub</h3>
                        <p className="text-text-muted-light dark:text-text-muted-dark text-sm">Innovating Tomorrow, Today at Mangochi.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-text-main-light dark:text-white mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#about" onClick={handleSmoothScroll} className="text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-white">About Us</a></li>
                            <li><a href="#projects" onClick={handleSmoothScroll} className="text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-white">Projects</a></li>
                            <li><a href="#events" onClick={handleSmoothScroll} className="text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-white">Events</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-text-main-light dark:text-white mb-3">Join The Community</h4>
                        <p className="text-text-muted-light dark:text-text-muted-dark text-sm mb-4">Ready to innovate with us? Register now and be part of the future of STEM.</p>
                        <button onClick={onNavigateToRegister} className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                           Become a Member
                        </button>
                    </div>
                </div>
                <div className="mt-12 border-t border-light-border dark:border-dark-border pt-8 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-gray-500 dark:text-gray-500 text-sm">&copy; {new Date().getFullYear()} DMIS&TC Mangochi Hub. All Rights Reserved.</p>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                         <SocialLink href="https://github.com"><GithubIcon className="h-5 w-5" /></SocialLink>
                         {/* Add other social links here */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;