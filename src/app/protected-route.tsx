import { useSession } from '@/shared/model/session.ts';
import { Navigate, Outlet, redirect } from 'react-router-dom';
import { ROUTES } from '@/shared/model/routes.ts';
import { enableMocking } from '@/shared/api/mocks';

export const ProtectedRoute = () => {
    const { session } = useSession();

    if (!session) {
        return <Navigate to={ROUTES.LOGIN} />;
    }

    return <Outlet />;
};

export const protectedLoader = async () => {
    await enableMocking();

    const token = await useSession.getState().getFreshToken();

    if (!token) {
        return redirect(ROUTES.LOGIN);
    }

    return null;
};
