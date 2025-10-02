import type { Notification } from '../types';

type AddNotification = (message: string, type: Notification['type']) => void;

interface RegistrationEmailParams {
    email: string;
    name: string;
    status: 'approved' | 'rejected';
    addNotification: AddNotification;
}

export const sendRegistrationStatusEmail = ({ email, name, status, addNotification }: RegistrationEmailParams): void => {
    const subject = `Your DMIS&TC Membership Application Status`;
    const body = status === 'approved'
        ? `Dear ${name},\n\nCongratulations! Your application to join the DMI Science & Technology Club has been approved. Welcome to the community!\n\nYou can now log in to the member portal.\n\nBest regards,\nThe DMIS&TC Executive Committee`
        : `Dear ${name},\n\nThank you for your interest in the DMI Science & Technology Club. After careful review, we regret to inform you that your application was not successful at this time.\n\nWe encourage you to apply again in the future.\n\nBest regards,\nThe DMIS&TC Executive Committee`;

    console.log(`--- SIMULATING EMAIL ---`);
    console.log(`To: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body:\n${body}`);
    console.log(`----------------------`);

    if (status === 'approved') {
        addNotification(`Approval email sent to ${email}`, 'success');
    } else {
        addNotification(`Rejection email sent to ${email}`, 'info');
    }
};


interface NewProjectEmailParams {
    projectName: string;
    submitterName: string;
    addNotification: AddNotification;
}

export const sendNewProjectNotification = ({ projectName, submitterName, addNotification }: NewProjectEmailParams): void => {
    const coordinatorEmail = 'project.coordinator@dmistc.com';
    const subject = `New Project Submission: "${projectName}"`;
    const body = `Hello Project Coordinator,\n\nA new project titled "${projectName}" has been submitted by ${submitterName} and is awaiting your review.\n\nPlease log in to the portal to review the details.\n\nThank you,\nDMIS&TC Hub`;

    console.log(`--- SIMULATING EMAIL ---`);
    console.log(`To: ${coordinatorEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body:\n${body}`);
    console.log(`----------------------`);

    addNotification('Project coordinators have been notified.', 'success');
};


interface ProjectStatusEmailParams {
    projectName: string;
    submitterName: string; // This should be looked up from a user system in a real app
    status: 'approved' | 'rejected';
    addNotification: AddNotification;
}

export const sendProjectStatusEmail = ({ projectName, submitterName, status, addNotification }: ProjectStatusEmailParams): void => {
    // In a real app, you'd fetch the submitter's email.
    const submitterEmail = `${submitterName.split(' ')[0].toLowerCase()}@dmistc.com`;
    const subject = `Your Project Submission Status: "${projectName}"`;
    const body = status === 'approved'
        ? `Dear ${submitterName},\n\nGreat news! Your project "${projectName}" has been approved by the committee. You can now find it in the official project library.\n\nCongratulations and we look forward to seeing your progress!\n\nBest regards,\nThe DMIS&TC Project Coordinator`
        : `Dear ${submitterName},\n\nThank you for submitting your project "${projectName}". After review, we have decided not to move forward with it at this time. We encourage you to refine your proposal and resubmit in the future.\n\nBest regards,\nThe DMIS&TC Project Coordinator`;

    console.log(`--- SIMULATING EMAIL ---`);
    console.log(`To: ${submitterEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body:\n${body}`);
    console.log(`----------------------`);
    
    addNotification(`Notification for project "${projectName}" sent to submitter.`, 'info');
};


interface EventReminderParams {
    eventName: string;
    eventDate: string;
    memberEmails: string[];
    addNotification: AddNotification;
}

export const sendEventReminderEmail = ({ eventName, eventDate, memberEmails, addNotification }: EventReminderParams): void => {
    const subject = `Reminder: Upcoming Club Event - ${eventName}`;
    const body = `Hello Club Members,\n\nThis is a friendly reminder about our upcoming event:\n\nEvent: ${eventName}\nDate: ${eventDate}\n\nWe look forward to seeing you there!\n\nBest,\nDMIS&TC Communications`;
    
    console.log(`--- SIMULATING BULK EMAIL ---`);
    console.log(`To: ${memberEmails.length} members`);
    console.log(`Subject: ${subject}`);
    console.log(`Body:\n${body}`);
    console.log(`---------------------------`);

    addNotification(`Reminders sent for "${eventName}" event.`, 'info');
};
