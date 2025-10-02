import React, { useState } from 'react';
import PortalHeader from '../member/PortalHeader';
import { useNotification } from '../../hooks/useNotification';

interface SystemSettingsPageProps {
    onBack: () => void;
}

const ToggleSetting: React.FC<{ label: string, description: string, enabled: boolean, onToggle: () => void }> = ({ label, description, enabled, onToggle }) => (
    <div className="flex items-center justify-between py-4 border-b border-light-border dark:border-dark-border">
        <div>
            <p className="font-semibold text-text-main-light dark:text-white">{label}</p>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{description}</p>
        </div>
        <button onClick={onToggle} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-primary' : 'bg-light-border dark:bg-dark-border'}`}>
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);


const SystemSettingsPage: React.FC<SystemSettingsPageProps> = ({ onBack }) => {
    const [settings, setSettings] = useState({
        registrationOpen: true,
        projectVotingActive: false,
        maintenanceMode: false,
    });
    const { addNotification } = useNotification();

    const handleToggle = (setting: keyof typeof settings) => {
        setSettings(prev => {
            const newValue = !prev[setting];
            const settingName = setting.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            addNotification(`${settingName} has been ${newValue ? 'enabled' : 'disabled'}.`, 'info');
            return { ...prev, [setting]: newValue };
        });
    };

    return (
        <div>
            <PortalHeader title="System Settings" onBack={onBack} />
            <div className="max-w-2xl mx-auto bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-8 rounded-xl">
                <h2 className="text-2xl font-bold text-text-main-light dark:text-white mb-4">Application Control</h2>
                <div>
                    <ToggleSetting 
                        label="Open New Registrations"
                        description="Allow new users to register for the club."
                        enabled={settings.registrationOpen}
                        onToggle={() => handleToggle('registrationOpen')}
                    />
                     <ToggleSetting 
                        label="Activate Project Voting"
                        description="Enable the project voting feature for all members."
                        enabled={settings.projectVotingActive}
                        onToggle={() => handleToggle('projectVotingActive')}
                    />
                     <ToggleSetting 
                        label="Enable Maintenance Mode"
                        description="Temporarily disable public access to the site."
                        enabled={settings.maintenanceMode}
                        onToggle={() => handleToggle('maintenanceMode')}
                    />
                </div>
            </div>
        </div>
    );
};

export default SystemSettingsPage;
