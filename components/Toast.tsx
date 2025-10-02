import React, { useEffect, useState } from 'react';
import { useNotification } from '../hooks/useNotification';
import CheckCircleIcon from './icons/CheckCircleIcon';
import InformationCircleIcon from './icons/InformationCircleIcon';
import CloseIcon from './icons/CloseIcon';

interface ToastProps {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

const toastConfig = {
    success: {
        icon: <CheckCircleIcon className="w-6 h-6 text-success" />,
        barClass: 'bg-success',
    },
    info: {
        icon: <InformationCircleIcon className="w-6 h-6 text-primary" />,
        barClass: 'bg-primary',
    },
    error: {
        icon: <InformationCircleIcon className="w-6 h-6 text-error" />,
        barClass: 'bg-error',
    },
};


const Toast: React.FC<ToastProps> = ({ id, message, type }) => {
    const { removeNotification } = useNotification();
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setExiting(true);
            setTimeout(() => removeNotification(id), 300); // Wait for exit animation
        }, 5000);

        return () => clearTimeout(timer);
    }, [id, removeNotification]);
    
    const handleClose = () => {
        setExiting(true);
        setTimeout(() => removeNotification(id), 300);
    };

    const config = toastConfig[type] || toastConfig.info;

    return (
        <div 
             className={`
                flex items-start w-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg shadow-lg overflow-hidden
                transition-all duration-300 ease-in-out
                ${exiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
            `}
            role="alert"
        >
            <div className={`w-1.5 h-auto self-stretch ${config.barClass}`} />
            <div className="p-4 flex items-center gap-3 flex-grow">
                <div className="flex-shrink-0">
                    {config.icon}
                </div>
                <p className="text-sm font-medium text-text-main-light dark:text-text-main-dark">
                    {message}
                </p>
                 <button onClick={handleClose} className="ml-auto flex-shrink-0 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-white p-1 rounded-full">
                    <CloseIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Toast;