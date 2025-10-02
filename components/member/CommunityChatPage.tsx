import React, { useState, useEffect, useRef } from 'react';
import type { User } from '../../types';
import PortalHeader from './PortalHeader';
import SendIcon from '../icons/SendIcon';

interface CommunityChatPageProps {
    user: User;
    onBack: () => void;
}

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'other' | 'system';
    name: string;
    avatar: string;
}

const botReplies = [
    "That's an interesting point!",
    "Could you elaborate on that?",
    "I'll have to think about that. In the meantime, has anyone seen the latest project proposal?",
    "Let's stay on topic. We were discussing the upcoming hackathon.",
    "Great question! I'll ask one of the execs to jump in here."
];

const CommunityChatPage: React.FC<CommunityChatPageProps> = ({ user, onBack }) => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Welcome to the #general channel! Feel free to discuss anything related to the club here.", sender: 'system', name: 'System', avatar: '' },
        { id: 2, text: "Has anyone started working on the Innovation Sprint yet?", sender: 'other', name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?u=JaneDoe' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const userMessage: Message = {
            id: Date.now(),
            text: newMessage,
            sender: 'user',
            name: `${user.profile.firstName} ${user.profile.lastName}`,
            avatar: user.profile.profileImage
        };

        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');

        // Simulate a bot reply
        setTimeout(() => {
            const botMessage: Message = {
                id: Date.now() + 1,
                text: botReplies[Math.floor(Math.random() * botReplies.length)],
                sender: 'other',
                name: 'Club Bot',
                avatar: 'https://i.pravatar.cc/150?u=ClubBot'
            };
            setMessages(prev => [...prev, botMessage]);
        }, 1500);
    };

    return (
        <div>
            <PortalHeader title="Community Chat" onBack={onBack} />
            <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl h-[70vh] flex flex-col">
                <div className="p-4 border-b border-light-border dark:border-dark-border">
                    <h2 className="text-xl font-bold text-text-main-light dark:text-white"># general</h2>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Main channel for all club members</p>
                </div>
                <div className="flex-grow p-4 overflow-y-auto space-y-4">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''} ${msg.sender === 'system' ? 'justify-center' : ''}`}>
                             {msg.sender !== 'system' && (
                                <img src={msg.avatar} alt={msg.name} className="w-10 h-10 rounded-full" />
                             )}
                            <div className={`p-3 rounded-lg max-w-lg ${
                                msg.sender === 'user' ? 'bg-primary text-white' : 
                                msg.sender === 'other' ? 'bg-light-bg dark:bg-dark-bg text-text-main-light dark:text-text-main-dark' : 
                                'bg-light-border dark:bg-dark-border text-text-muted-light dark:text-text-muted-dark text-sm'
                            }`}>
                                {msg.sender !== 'system' && <p className={`font-bold text-sm mb-1 ${msg.sender === 'user' ? 'text-blue-200' : 'text-secondary'}`}>{msg.name}</p>}
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t border-light-border dark:border-dark-border">
                    <form onSubmit={handleSendMessage} className="flex gap-3">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-grow bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-2 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        />
                        <button type="submit" className="bg-primary hover:bg-blue-600 text-white font-bold p-2 rounded-lg flex-shrink-0 transition-colors">
                            <SendIcon className="w-6 h-6"/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CommunityChatPage;