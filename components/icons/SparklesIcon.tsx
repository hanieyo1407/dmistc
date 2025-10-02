import React from 'react';

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L15 10.414m-4.293 2.293a1 1 0 01-1.414 0L5 8.414m12 5.172a1 1 0 010 1.414l-2.293 2.293a1 1 0 01-1.414 0l-4.293-4.293a1 1 0 010-1.414l2.293-2.293a1 1 0 011.414 0L17 13.586z" />
    </svg>
);

export default SparklesIcon;
