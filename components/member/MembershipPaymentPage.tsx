import React, { useState } from 'react';
import PortalHeader from './PortalHeader';
import CreditCardIcon from '../icons/CreditCardIcon';
import CheckBadgeIcon from '../icons/CheckBadgeIcon';

interface MembershipPaymentPageProps {
    onBack: () => void;
}

const MembershipPaymentPage: React.FC<MembershipPaymentPageProps> = ({ onBack }) => {
    const [status, setStatus] = useState<'ACTIVE' | 'EXPIRED'>('ACTIVE');
    const [expiryDate, setExpiryDate] = useState('December 31, 2024');

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // This is a simulation
        setStatus('ACTIVE');
        setExpiryDate('December 31, 2025');
        alert('Payment successful! Your membership has been renewed.');
    };

    return (
        <div>
            <PortalHeader title="Membership Payment" onBack={onBack} />
            <div className="max-w-2xl mx-auto bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-8">
                <h2 className="text-2xl font-bold text-text-main-light dark:text-white mb-4 text-center">Your Membership Status</h2>
                <div className={`p-4 rounded-lg text-center mb-8 ${status === 'ACTIVE' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                    <p className="font-bold text-lg">Status: {status}</p>
                    {status === 'ACTIVE' && <p>Your membership is active until {expiryDate}.</p>}
                    {status === 'EXPIRED' && <p>Your membership has expired. Please renew below.</p>}
                </div>

                {status === 'ACTIVE' ? (
                     <div className="text-center">
                        <CheckBadgeIcon className="w-16 h-16 text-success mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-text-main-light dark:text-white">You're all set!</h3>
                        <p className="text-text-muted-light dark:text-text-muted-dark">Thank you for being a valued member of the DMIS&TC Mangochi Hub.</p>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-xl font-bold text-text-main-light dark:text-white mb-4">Renew Your Membership</h3>
                        <p className="text-text-muted-light dark:text-text-muted-dark mb-6">The annual membership fee is MWK 5,000. This fee supports club activities, project resources, and events.</p>
                        <form onSubmit={handlePaymentSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="cardName" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Name on Card</label>
                                <input type="text" id="cardName" required className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                            </div>
                            <div>
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Card Number</label>
                                <input type="text" id="cardNumber" placeholder="0000 0000 0000 0000" required className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="expiry" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">Expiry (MM/YY)</label>
                                    <input type="text" id="expiry" placeholder="MM/YY" required className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                                </div>
                                <div>
                                    <label htmlFor="cvc" className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-2">CVC</label>
                                    <input type="text" id="cvc" placeholder="123" required className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                                </div>
                            </div>
                            <div className="pt-4">
                                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white font-bold py-2.5 sm:py-3 px-4 rounded-lg transition-all transform hover:scale-105">
                                    <CreditCardIcon className="w-6 h-6" />
                                    <span>Pay MWK 5,000</span>
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MembershipPaymentPage;