import { faCircleQuestion, faUser, faSignOut } from '@fortawesome/free-solid-svg-icons';

export const userMenu = [
    {
        icon: faUser,
        title: 'View profile',
        to: '/profile',
    },
    {
        icon: faCircleQuestion,
        title: 'Feedback and help',
        to: '',
    },
    {
        icon: faSignOut,
        title: 'Log out',
        to: '',
        separate: true,
    },
];
