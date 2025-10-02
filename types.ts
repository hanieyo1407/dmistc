import React from 'react';

export interface Project {
  id: number;
  title: string;
  category: string;
  description:string;
  longDescription: string;
  imageUrl: string;
  tags: string[];
  githubLink?: string;
  liveDemo?: string;
  collaborators?: string[];
}

export interface ClubEvent {
  id: number;
  title: string;
  type: string;
  date: string;
  location: string;
  description: string;
}

export interface StrategicGoal {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

export interface SuccessStory {
    id: number;
    name: string;
    role: string;
    story: string;
    imageUrl: string;
}

export type UserRole = 'MEMBER' | 'EXECUTIVE' | 'ADVISOR' | 'ADMIN' | 'SYSTEM_ADMIN';

export type ExecutiveRole = 'CHAIRPERSON' | 'VICE_CHAIRPERSON' | 'SECRETARY' | 'VICE_SECRETARY' | 'PROJECT_COORDINATOR' | 'TREASURER' | 'DISCIPLINARY_OFFICER' | 'COMMUNICATION_OFFICER';

export interface UserProfile {
    firstName: string;
    lastName: string;
    profileImage: string;
    bio: string;
    skills: string[];
    interests: string[];
    socialLinks: {
        github?: string;
        linkedin?: string;
        twitter?: string;
    };
}

export interface User {
    name: string;
    email: string;
    role: UserRole;
    executiveRole?: ExecutiveRole;
    profile: UserProfile;
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface Candidate {
    id: number;
    name: string;
    position: ExecutiveRole;
    imageUrl: string;
    vision: string;
}

export interface ClubUpdate {
    id: number;
    title: string;
    date: string;
    author: string;
    content: string;
}

export interface PendingRegistration {
    id: number;
    firstName: string;
    lastName: string;
    studentId: string;
    email: string;
    program: string;
    year: string;
    interests: string[];
}

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface Moment {
    id: number;
    imageUrl: string;
    caption: string;
}

export interface PendingProject {
    id: number;
    title: string;
    category: string;
    description: string;
    submittedBy: string;
    tags: string[];
}

export interface ClubMember extends User {
    id: number;
    studentId: string;
    joinDate: string;
    membershipStatus: 'active' | 'pending' | 'suspended';
}
