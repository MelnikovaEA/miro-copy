import { ROUTES } from '@/shared/model/routes.ts';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { App } from './app';

export const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                path: ROUTES.BOARDS,
                lazy: () => import('@/features/boards-list/boards-list.page'),
            },
            {
                path: ROUTES.BOARD,
                lazy: () => import('@/features/board/board.page'),
            },
            {
                path: ROUTES.LOGIN,
                lazy: () => import('@/features/auth/login.page'),
            },
            {
                path: ROUTES.REGISTER,
                lazy: () => import('@/features/auth/register.page'),
            },
            {
                path: ROUTES.HOME,
                loader: () => redirect(ROUTES.BOARDS),
            },
        ],
    },
]);
