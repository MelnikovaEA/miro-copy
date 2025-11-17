import { Outlet, useLocation } from 'react-router-dom';
import { AppHeader } from '@/features/header';
import { ROUTES } from '@/shared/model/routes.ts';
import { Providers } from '@/app/providers.tsx';

export const App = () => {
    const location = useLocation();

    const isAuthPage =
        location.pathname === ROUTES.LOGIN ||
        location.pathname === ROUTES.REGISTER;
    return (
        <Providers>
            <div>
                {!isAuthPage && <AppHeader />}
                <Outlet />
            </div>
        </Providers>
    );
};
