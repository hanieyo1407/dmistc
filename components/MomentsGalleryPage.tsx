import React, { useState } from 'react';
import { momentsData } from '../data/mockData';
import type { Moment } from '../types';
import PortalHeader from './member/PortalHeader';
import ImageModal from './ImageModal';

interface MomentsGalleryPageProps {
    onNavigateToHome: () => void;
}

const MomentsGalleryPage: React.FC<MomentsGalleryPageProps> = ({ onNavigateToHome }) => {
    const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null);

    return (
        <>
            <section className="py-28 bg-light-bg dark:bg-dark-bg min-h-screen">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-text-main-light dark:text-white">
                            Club <span className="custom-gradient-text">Moments</span>
                        </h2>
                        <p className="mt-4 text-lg text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto">
                            A snapshot of our community in action – collaborating, learning, and innovating together.
                        </p>
                    </div>

                    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {momentsData.map(moment => (
                            <div key={moment.id} className="break-inside-avoid" onClick={() => setSelectedMoment(moment)}>
                                <img 
                                    src={moment.imageUrl.replace('/1920/1080', '/800/600')} // Use smaller images for gallery
                                    alt={moment.caption} 
                                    className="w-full rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                         <button onClick={onNavigateToHome} className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-6 text-base sm:py-3 sm:px-8 sm:text-lg rounded-lg transform transition-all duration-300 hover:scale-105">
                           Back to Home
                        </button>
                    </div>

                </div>
            </section>
            {selectedMoment && <ImageModal moment={selectedMoment} onClose={() => setSelectedMoment(null)} />}
        </>
    );
};

export default MomentsGalleryPage;