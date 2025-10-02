import React from 'react';
import { useNotification } from '../hooks/useNotification';
import Toast from './Toast';

const ToastContainer: React.FC = () => {
    const { notifications } = useNotification();

    return (
        <div className="fixed top-24 right-4 z-[100] w-full max-w-sm space-y-3">
            {notifications.map(notification => (
                <Toast
                    key={notification.id}
                    id={notification.id}
                    message={notification.message}
                    type={notification.type}
                />
            ))}
        </div>
    );
};

export default ToastContainer;