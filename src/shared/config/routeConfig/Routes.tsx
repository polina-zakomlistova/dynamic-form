import { RouteProps } from 'react-router-dom';
// components
import { ProfilePage } from 'pages/ProfilePage';
import { NotFound } from 'pages/NotFound';

export enum AppRoutes {
    PROFILE_PAGE = 'ProfilePage',
    NOT_FOUND = 'NotFound',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.PROFILE_PAGE]: '/',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.PROFILE_PAGE]: {
        path: RoutePath.ProfilePage,
        element: <ProfilePage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.NotFound,
        element: <NotFound />,
    },
};
