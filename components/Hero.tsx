import React from 'react';
import HeroSlideshow from './HeroSlideshow';

interface HeroProps {
    onNavigateToRegister: () => void;
    onNavigateToGallery: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToRegister, onNavigateToGallery }) => {
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
        <section id="home" className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
             <HeroSlideshow />
             <div className="absolute inset-0 bg-black/50 z-10"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
                <div className="opacity-0 animate-fade-in-up">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-poppins tracking-tight text-white mb-4">
                        DMIS&TC <span className="custom-gradient-text">Mangochi Hub</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-200 mb-8" style={{ animationDelay: '0.3s' }}>
                        Innovating Tomorrow, Today at Mangochi.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '0.6s' }}>
                        <button
                            onClick={onNavigateToGallery}
                            className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-white font-bold py-2 px-6 text-base sm:py-3 sm:px-8 sm:text-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-secondary/50"
                        >
                            Explore Projects
                        </button>
                        <button
                            onClick={onNavigateToRegister}
                            className="w-full sm:w-auto border-2 border-white text-white font-bold py-2 px-6 text-base sm:py-3 sm:px-8 sm:text-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-white hover:text-primary"
                        >
                            Join Our Community
                        </button>
                    </div>
                     <div className="mt-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                        <p className="text-gray-400 text-sm mb-3">Or discover more:</p>
                        <div className="flex justify-center items-center gap-6 text-gray-300">
                             <a href="#about" onClick={handleSmoothScroll} className="hover:text-white transition-colors duration-300 hover:underline">About Us</a>
                             <span className="text-gray-600">·</span>
                             <a href="#events" onClick={handleSmoothScroll} className="hover:text-white transition-colors duration-300 hover:underline">Latest Events</a>
                             <span className="text-gray-600">·</span>
                             <a href="#success-stories" onClick={handleSmoothScroll} className="hover:text-white transition-colors duration-300 hover:underline">Success Stories</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;