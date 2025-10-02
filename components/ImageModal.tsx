import React, { useEffect } from 'react';
import type { Moment } from '../types';
import CloseIcon from './icons/CloseIcon';

interface ImageModalProps {
    moment: Moment;
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ moment, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in-up"
            onClick={onClose}
        >
             <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10">
                <CloseIcon className="w-8 h-8" />
            </button>

            <div 
                className="relative max-w-4xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <img 
                    src={moment.imageUrl} 
                    alt={moment.caption}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
                <div className="text-center mt-4">
                    <p className="text-white text-lg">{moment.caption}</p>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;