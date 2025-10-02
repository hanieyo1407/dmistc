import React, { useState, useEffect } from 'react';

const LoadingScreen: React.FC = () => {
    const [text, setText] = useState('');
    const [showBar, setShowBar] = useState(false);
    const [progress, setProgress] = useState(0);
    const fullText = "D_MIS&TCMH";

    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < fullText.length) {
                setText((prev) => prev + fullText.charAt(index));
                index++;
            } else {
                clearInterval(typingInterval);
                setShowBar(true);
            }
        }, 150);
        return () => clearInterval(typingInterval);
    }, []);

    useEffect(() => {
        if (showBar) {
            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(progressInterval);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 15);
            return () => clearInterval(progressInterval);
        }
    }, [showBar]);

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-light-bg dark:bg-dark-bg hero-bg">
            <div className="text-center">
                <h1 className="font-poppins text-5xl md:text-8xl font-bold tracking-widest custom-gradient-text animate-text-glitch">
                    {text}
                    <span className="animate-ping">_</span>
                </h1>
                {showBar && (
                    <div className="w-64 md:w-96 h-2 bg-light-border dark:bg-dark-border rounded-full mt-8 overflow-hidden mx-auto">
                        <div
                            className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-100 ease-linear"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoadingScreen;