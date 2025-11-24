import { useNavigate } from 'react-router-dom';
import { publicRqClient } from '@/shared/api/instance.ts';
import { ROUTES } from '@/shared/model/routes.ts';
import type { ApiSchemas } from '@/shared/api/schema';
import { useSession } from '@/shared/model/session.ts';

const useLogin = () => {
    const navigate = useNavigate();
    const session = useSession();

    const loginMutation = publicRqClient.useMutation('post', '/auth/login', {
        onSuccess(data) {
            navigate(ROUTES.HOME);
            session.login(data.accessToken);
        },
    });

    const login = (data: ApiSchemas['LoginRequest']) =>
        loginMutation.mutate({ body: data });

    const errorMessage = loginMutation.isError
        ? loginMutation.error
        : undefined;

    return { login, isPending: loginMutation.isPending, errorMessage };
};

export default useLogin;
