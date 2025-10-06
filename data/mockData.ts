import type { Project, Candidate, ClubUpdate, ExecutiveRole, PendingRegistration, ClubEvent, Moment, PendingProject, ClubMember, UserRole } from '../types';

export const libraryProjects: Project[] = [
    { id: 1, title: 'Student Union Presidential Election Voting System', category: 'Campus Technology', description: 'A secure digital voting platform for student union elections.', longDescription: 'This project creates a secure, transparent, and accessible voting system for student union presidential elections. It implements authentication, ballot casting, real-time vote tallying, and results visualization. Built with blockchain technology for transparency and security, using React for the frontend and Node.js with MongoDB for the backend.', imageUrl: 'https://picsum.photos/seed/voting/500/400', tags: ['Web', 'Security', 'Blockchain', 'React', 'Democracy'], githubLink: '#', liveDemo: '#', collaborators: ['Crusade Chiwalo', 'Ethel Chikhoswe'] },
    { id: 2, title: 'Marketplace', category: 'E-Commerce', description: 'A student marketplace platform for buying and selling goods and services.', longDescription: 'This platform enables students to buy and sell textbooks, electronics, services, and other items within the campus community. Features include user authentication, product listings, search and filtering, messaging system, and secure payment integration. Built with the MERN stack (MongoDB, Express, React, Node.js).', imageUrl: 'https://picsum.photos/seed/marketplace/500/400', tags: ['E-Commerce', 'Web', 'React', 'Node.js', 'Payment'], githubLink: '#', collaborators: ['Crusade Chiwalo', 'Ethel Chikhoswe'] },
    { id: 3, title: 'Lecturer Attendance System', category: 'Campus Technology', description: 'An automated system to track and manage lecturer attendance for classes.', longDescription: 'This system streamlines attendance tracking for lecturers using QR codes, biometric authentication, or manual check-in. It provides analytics on attendance patterns, generates reports, and sends notifications for absences. The system integrates with the university database and features a mobile-responsive interface built with React and a Python Flask backend.', imageUrl: 'https://picsum.photos/seed/attendance/500/400', tags: ['Web', 'Mobile', 'Python', 'Analytics', 'Education'], githubLink: '#', liveDemo: '#', collaborators: ['Crusade Chiwalo', 'Ethel Chikhoswe'] },
    { id: 4, title: 'Automated Robotic Cleaner', category: 'Robotics & IoT', description: 'An autonomous robot designed to clean campus facilities efficiently.', longDescription: 'This robotics project involves designing and programming an autonomous cleaning robot for campus use. The robot uses sensors for navigation, obstacle detection, and efficient path planning. It includes features like scheduled cleaning, remote monitoring, and battery management. Built with Arduino, Raspberry Pi, and Python for the control system.', imageUrl: 'https://picsum.photos/seed/robot/500/400', tags: ['Robotics', 'IoT', 'Arduino', 'Python', 'Automation'], githubLink: '#', collaborators: ['Crusade Chiwalo', 'Ethel Chikhoswe'] },
];

export const votingProjects: Omit<Project, 'longDescription' | 'githubLink' | 'liveDemo' | 'collaborators'>[] = [
    { id: 7, title: 'Campus Companion App', category: 'Innovation Sprints', description: 'An all-in-one mobile app for campus navigation, class schedules, and event notifications.', imageUrl: 'https://picsum.photos/seed/app/500/400', tags: ['Mobile', 'React Native', 'Campus Life'] },
    { id: 8, title: 'Peer-to-Peer Tutoring Platform', category: 'Tech for Education', description: 'A platform connecting students who need academic help with those who can provide it.', imageUrl: 'https://picsum.photos/seed/tutor/500/400', tags: ['Web', 'Education', 'Community'] },
    { id: 9, title: 'Plastic Waste Upcycling Initiative', category: 'STEM Education Outreach', description: 'Developing low-cost methods to turn plastic waste into useful materials for schools.', imageUrl: 'https://picsum.photos/seed/plastic/500/400', tags: ['Sustainability', 'Chemistry', 'Community'] },
];

export const leaderCandidates: Candidate[] = [
    { id: 1, name: 'John Fulanki', position: 'CHAIRPERSON', imageUrl: 'https://picsum.photos/seed/john/200/200', vision: 'To foster a more inclusive environment and secure new industry partnerships for enhanced member opportunities.' },
    { id: 2, name: 'Jane Doe', position: 'CHAIRPERSON', imageUrl: 'https://picsum.photos/seed/jane/200/200', vision: 'My focus is on increasing inter-departmental collaboration and launching a dedicated mentorship program.' },
    { id: 3, name: 'Peter Jones', position: 'PROJECT_COORDINATOR', imageUrl: 'https://picsum.photos/seed/peter/200/200', vision: 'I will streamline the project submission and review process, ensuring faster feedback and more support for ongoing projects.' },
    { id: 4, name: 'Alice Johnson', position: 'TREASURER', imageUrl: 'https://picsum.photos/seed/alice/200/200', vision: 'I aim to improve financial transparency with monthly reports and explore new fundraising initiatives to support more ambitious projects.' },
    { id: 5, name: 'Bob Williams', position: 'TREASURER', imageUrl: 'https://picsum.photos/seed/bob/200/200', vision: 'My goal is to digitize all financial processes, making membership payments and budget requests seamless and efficient.' },
];

export let clubUpdates: ClubUpdate[] = [
    { id: 1, title: 'Q4 Innovation Sprint Announced: "Sustainable Tech"', date: 'Oct 15, 2024', author: 'Project Coordinator', content: 'Get ready for our final Innovation Sprint of the year! The theme is "Sustainable Tech". We are looking for innovative solutions to local environmental challenges. Registration opens next week. Start forming your teams now!' },
    { id: 2, title: 'Call for Mentors: STEM Outreach Program', date: 'Oct 12, 2024', author: 'Chairperson', content: 'Our STEM outreach program is expanding to two new local schools, and we need experienced members to act as mentors. This is a fantastic opportunity to give back to the community and develop your leadership skills. Please sign up by the end of the month.' },
    { id: 3, title: 'New Equipment in the CS Lab', date: 'Oct 10, 2024', author: 'Advisor', content: 'Thanks to a successful funding proposal, the CS Lab has been updated with new VR headsets and IoT development kits. These are available for all club members to use for their projects. Please see the lab technician for access.' },
    { id: 4, title: 'Membership Fee Reminder', date: 'Oct 5, 2024', author: 'Treasurer', content: 'A friendly reminder that annual membership fees are due by October 31st. You can now pay online through the portal. Your contribution is vital for funding our events and projects. Thank you for your support!' },
];

export const pendingRegistrations: PendingRegistration[] = [
    {
        id: 1,
        firstName: 'Grace',
        lastName: 'Phiri',
        studentId: 'DMI-20-001',
        email: 'grace.p@dmistc.com',
        program: 'BSc. Computer Science',
        year: 'Year 3',
        interests: ['AI / Machine Learning', 'Web & Mobile Development', 'Data Science & Analytics']
    },
    {
        id: 2,
        firstName: 'Samuel',
        lastName: 'Banda',
        studentId: 'DMI-21-002',
        email: 'samuel.b@dmistc.com',
        program: 'BEd. Science (Physics)',
        year: 'Year 2',
        interests: ['Physics & Renewable Energy', 'STEM Education Outreach', 'Electronics & Hardware']
    },
    {
        id: 3,
        firstName: 'Thokozani',
        lastName: 'Moyo',
        studentId: 'DMI-20-003',
        email: 'thoko.m@dmistc.com',
        program: 'BSc. Computer Science',
        year: 'Year 3',
        interests: ['Cybersecurity', 'Innovation & Entrepreneurship', 'UI/UX Design']
    }
];

export let events: ClubEvent[] = [
    { id: 1, title: 'Annual Science & Tech Fair', type: 'Competition', date: 'Oct 28, 2024', location: 'Main Auditorium', description: 'Showcase your projects and compete for amazing prizes.' },
    { id: 2, title: 'Intro to Machine Learning', type: 'Workshop', date: 'Nov 12, 2024', location: 'CS Lab 1', description: 'A hands-on workshop covering the fundamentals of ML with Python.' },
    { id: 3, title: 'Innovation Sprint: EdTech', type: 'Hackathon', date: 'Nov 25, 2024', location: 'Innovation Hub', description: 'A 48-hour hackathon to build solutions for education.' },
];

export const momentsData: Moment[] = [
  { id: 1, imageUrl: 'https://res.cloudinary.com/unihousingmw/image/upload/v1759762794/20251006_152255_p1cokt.jpg', caption: 'Members collaborating during the 2023 Annual Hackathon.' },
  { id: 2, imageUrl: 'https://res.cloudinary.com/unihousingmw/image/upload/v1759763264/20251006_152332_jnpqni.jpg', caption: 'Our team presenting their project at the National Tech Fair.' },
  { id: 3, imageUrl: 'https://res.cloudinary.com/unihousingmw/image/upload/v1759763492/20251006_155159_r5ugzs.jpg', caption: 'A hands-on robotics workshop for first-year students.' },
  { id: 4, imageUrl: 'https://picsum.photos/seed/moment4/1920/1080', caption: 'Guest lecture from a leading software engineer in the industry.' },
  { id: 5, imageUrl: 'https://picsum.photos/seed/moment5/1920/1080', caption: 'Celebrating the launch of our new mentorship program.' },
];

export const pendingProjects: PendingProject[] = [
    { id: 10, title: 'Campus Navigation AR App', category: 'Innovation Sprints', description: 'Augmented reality app to help new students navigate the campus.', submittedBy: 'Alex Green', tags: ['AR', 'Mobile', 'React Native'] },
    { id: 11, title: 'Automated Lab Assistant Bot', category: 'Tech for Education', description: 'A chatbot to assist students with lab procedures and safety protocols.', submittedBy: 'Maria Hill', tags: ['Chatbot', 'AI', 'Python'] },
];

const createMockUser = (id: number, name: string, email: string, role: UserRole, executiveRole?: ExecutiveRole, status: 'active' | 'pending' | 'suspended' = 'active', customImage?: string): ClubMember => ({
    id,
    name,
    email,
    role,
    executiveRole,
    studentId: `DMI-${22 - (id % 4)}-${String(id).padStart(3, '0')}`,
    joinDate: `202${2 - (id % 3)}-${String((id % 12) + 1).padStart(2, '0')}-15`,
    membershipStatus: status,
    profile: {
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' ') || 'User',
        profileImage: customImage || `https://i.pravatar.cc/150?u=${email}`,
        bio: `A passionate member of the DMIS&TC community, exploring the world of ${role === 'MEMBER' ? 'tech' : role.toLowerCase()}.`,
        skills: ['JavaScript', 'React', 'Node.js'],
        interests: ['STEM', 'Innovation', 'Collaboration'],
        socialLinks: { github: '#', linkedin: '#', twitter: '#' }
    }
});

export const clubMembers: ClubMember[] = [
    createMockUser(1, 'Emily Carter', 'emily.c@dmistc.com', 'MEMBER'),
    createMockUser(2, 'Benjamin Lee', 'ben.l@dmistc.com', 'MEMBER'),
    createMockUser(3, 'Olivia Rodriguez', 'olivia.r@dmistc.com', 'MEMBER', undefined, 'suspended'),
    createMockUser(4, 'Angel Kautsi', 'angie@gmail.com', 'EXECUTIVE', 'CHAIRPERSON'),
    createMockUser(5, 'Jane Alex', 'alexjane@gmail.com', 'EXECUTIVE', 'PROJECT_COORDINATOR'),
    createMockUser(6, 'Takondwa Chinkombero', 'teekay@gmail.com', 'EXECUTIVE', 'TREASURER'),
    createMockUser(7, 'Yohane H. Maluwa', 'ymaluwa@gmail.com', 'EXECUTIVE', 'COMMUNICATION_OFFICER', 'active', 'https://res.cloudinary.com/unihousingmw/image/upload/v1757151733/Yohane_jvzdlm.jpg'),
    createMockUser(8, 'Crusade Chiwalo', 'crvsade@hotmail.com', 'ADVISOR'),
    createMockUser(9, 'Admin User', 'admin@dmistc.com', 'ADMIN'),
    createMockUser(10, 'Yohane H. Maluwa', 'ymaluwa@gmail.com', 'SYSTEM_ADMIN'),
    createMockUser(11, 'Mason Taylor', 'mason.t@dmistc.com', 'MEMBER'),
    createMockUser(12, 'Ava Martinez', 'ava.m@dmistc.com', 'MEMBER'),
];

export const financialData = {
    income: [
        { source: 'Membership Fees', amount: 500000 },
        { source: 'Sponsorships', amount: 750000 },
        { source: 'Workshops', amount: 150000 },
    ],
    expenses: [
        { category: 'Event Hosting', amount: 300000 },
        { category: 'Project Supplies', amount: 450000 },
        { category: 'Marketing', amount: 100000 },
        { category: 'Software Licenses', amount: 50000 },
    ],
    get totalIncome() { return this.income.reduce((sum, item) => sum + item.amount, 0) },
    get totalExpenses() { return this.expenses.reduce((sum, item) => sum + item.amount, 0) },
    get netBalance() { return this.totalIncome - this.totalExpenses },
};