import React, { useState, useMemo } from 'react';
import type { ClubMember, UserRole } from '../../types';
import { clubMembers as mockData } from '../../data/mockData';
import PortalHeader from '../member/PortalHeader';
import { useNotification } from '../../hooks/useNotification';
import BanIcon from '../icons/BanIcon';
import CheckCircleIcon from '../icons/CheckCircleIcon';

interface MemberManagementPageProps {
    onBack: () => void;
}

const roles: UserRole[] = ['MEMBER', 'EXECUTIVE', 'ADVISOR', 'ADMIN'];

const MemberManagementPage: React.FC<MemberManagementPageProps> = ({ onBack }) => {
    const [members, setMembers] = useState<ClubMember[]>(mockData);
    const [filter, setFilter] = useState('');
    const { addNotification } = useNotification();

    const filteredMembers = useMemo(() =>
        members.filter(member =>
            member.name.toLowerCase().includes(filter.toLowerCase()) ||
            member.email.toLowerCase().includes(filter.toLowerCase()) ||
            member.studentId.toLowerCase().includes(filter.toLowerCase())
        ), [members, filter]);

    const handleRoleChange = (memberId: number, newRole: UserRole) => {
        setMembers(prev => prev.map(m => m.id === memberId ? { ...m, role: newRole } : m));
        addNotification(`Role updated for member #${memberId}`, 'info');
    };

    const handleStatusToggle = (memberId: number) => {
        setMembers(prev => prev.map(m => {
            if (m.id === memberId) {
                const newStatus = m.membershipStatus === 'active' ? 'suspended' : 'active';
                addNotification(`Member ${m.name} has been ${newStatus}.`, newStatus === 'active' ? 'success' : 'info');
                return { ...m, membershipStatus: newStatus };
            }
            return m;
        }));
    };

    return (
        <div>
            <PortalHeader title="Member Management" onBack={onBack} />
            <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border p-6 rounded-xl">
                <input
                    type="text"
                    placeholder="Filter by name, email, or student ID..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 mb-6 text-text-main-light dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-text-muted-light dark:text-text-muted-dark">
                        <thead className="text-xs text-text-main-light dark:text-text-main-dark uppercase bg-light-bg dark:bg-dark-bg">
                            <tr>
                                <th scope="col" className="px-6 py-3">Member</th>
                                <th scope="col" className="px-6 py-3">Student ID</th>
                                <th scope="col" className="px-6 py-3">Role</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMembers.map(member => (
                                <tr key={member.id} className="bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border">
                                    <td className="px-6 py-4 font-medium text-text-main-light dark:text-white whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <img src={member.profile.profileImage} alt={member.name} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <p>{member.name}</p>
                                                <p className="text-xs text-text-muted-light dark:text-text-muted-dark">{member.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{member.studentId}</td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={member.role}
                                            onChange={(e) => handleRoleChange(member.id, e.target.value as UserRole)}
                                            disabled={member.role === 'SYSTEM_ADMIN'}
                                            className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-secondary disabled:opacity-50"
                                        >
                                            {roles.map(r => <option key={r} value={r}>{r}</option>)}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            member.membershipStatus === 'active' ? 'bg-success/20 text-success' : 
                                            member.membershipStatus === 'suspended' ? 'bg-error/20 text-error' : 'bg-accent/20 text-accent'
                                        }`}>
                                            {member.membershipStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleStatusToggle(member.id)}
                                            disabled={member.role === 'SYSTEM_ADMIN'}
                                            className={`flex items-center gap-1 text-xs p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap ${
                                                member.membershipStatus === 'active' ? 'bg-error/20 text-error hover:bg-error/30' : 'bg-success/20 text-success hover:bg-success/30'
                                            }`}
                                        >
                                            {member.membershipStatus === 'active' ? <BanIcon className="w-4 h-4" /> : <CheckCircleIcon className="w-4 h-4" />}
                                            {member.membershipStatus === 'active' ? 'Suspend' : 'Activate'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MemberManagementPage;