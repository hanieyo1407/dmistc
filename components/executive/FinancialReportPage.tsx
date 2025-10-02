import React from 'react';
import PortalHeader from '../member/PortalHeader';
import { financialData } from '../../data/mockData';

interface FinancialReportPageProps {
    onBack: () => void;
}

const formatCurrency = (amount: number) => {
    return `MWK ${amount.toLocaleString('en-US')}`;
};

const FinancialReportPage: React.FC<FinancialReportPageProps> = ({ onBack }) => {
    const { income, expenses, totalIncome, totalExpenses, netBalance } = financialData;

    return (
        <div>
            <PortalHeader title="Financial Report" onBack={onBack} />
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Total Income</p>
                        <p className="text-3xl font-bold text-success">{formatCurrency(totalIncome)}</p>
                    </div>
                     <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Total Expenses</p>
                        <p className="text-3xl font-bold text-error">{formatCurrency(totalExpenses)}</p>
                    </div>
                     <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Net Balance</p>
                        <p className={`text-3xl font-bold ${netBalance >= 0 ? 'text-primary' : 'text-error'}`}>{formatCurrency(netBalance)}</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
                        <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-4">Income Sources</h3>
                        <ul className="space-y-2">
                            {income.map(item => (
                                <li key={item.source} className="flex justify-between text-text-muted-light dark:text-text-muted-dark">
                                    <span>{item.source}</span>
                                    <span className="font-mono text-success">{formatCurrency(item.amount)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
                        <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-4">Expense Categories</h3>
                         <ul className="space-y-2">
                            {expenses.map(item => (
                                <li key={item.category} className="flex justify-between text-text-muted-light dark:text-text-muted-dark">
                                    <span>{item.category}</span>
                                    <span className="font-mono text-error">{formatCurrency(item.amount)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                 <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-text-main-light dark:text-white mb-4">Income vs. Expenses</h3>
                     <div className="h-64 flex items-center justify-center bg-light-bg dark:bg-dark-bg rounded-lg">
                        <p className="text-text-muted-light dark:text-text-muted-dark text-sm">Chart data would be displayed here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialReportPage;
