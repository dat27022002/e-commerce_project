import { faCircleQuestion, faUser, faSignOut } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';

export const userMenu = [
    {
        icon: faUser,
        title: 'View profile',
        to: config.routes.PROFILE,
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

export const noUserMenu = [
    {
        icon: faCircleQuestion,
        title: 'Feedback and help',
        to: '',
    },
];
