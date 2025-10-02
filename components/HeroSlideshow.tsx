import React, { useState, useEffect } from 'react';
import { momentsData } from '../data/mockData';

const featuredMoments = momentsData.slice(0, 5); // Use first 5 images for the hero slideshow

const HeroSlideshow: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredMoments.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full">
            {featuredMoments.map((moment, index) => (
                <div
                    key={moment.id}
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out"
                    style={{
                        backgroundImage: `url(${moment.imageUrl})`,
                        opacity: index === currentIndex ? 1 : 0,
                    }}
                />
            ))}
        </div>
    );
};

export default HeroSlideshow;