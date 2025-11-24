import { useNavigate } from 'react-router-dom';
import { publicRqClient } from '@/shared/api/instance.ts';
import { ROUTES } from '@/shared/model/routes.ts';
import type { ApiSchemas } from '@/shared/api/schema';
import { useSession } from '@/shared/model/session.ts';

const useRegister = () => {
    const navigate = useNavigate();
    const session = useSession();

    const registerMutation = publicRqClient.useMutation(
        'post',
        '/auth/register',
        {
            async onSuccess(data) {
                session.login(data.accessToken);
                navigate(ROUTES.HOME);
            },
        }
    );

    const register = (data: ApiSchemas['RegisterRequest']) =>
        registerMutation.mutate({ body: data });

    const errorMessage = registerMutation.isError
        ? registerMutation.error
        : undefined;

    return { register, isPending: registerMutation.isPending, errorMessage };
};

export default useRegister;
