import { useQueryClient } from '@tanstack/react-query';
import { rqClient } from '@/shared/api/instance.ts';
import { href, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/model/routes.ts';

export const useDeleteBoard = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const deleteBoardMutation = rqClient.useMutation(
        'delete',
        '/boards/{boardId}',
        {
            onSettled: async () => {
                await queryClient.invalidateQueries({
                    queryKey: rqClient
                        .queryOptions('get', '/boards')
                        .queryKey.slice(0, 2),
                });
            },
            onSuccess: () => {
                navigate(href(ROUTES.HOME));
            },
        }
    );

    return {
        deleteBoard: (boardId: string) =>
            deleteBoardMutation.mutate({
                params: {
                    path: { boardId },
                },
            }),
        getIsPending: (boardId: string) =>
            deleteBoardMutation.isPending &&
            deleteBoardMutation.variables?.params?.path?.boardId === boardId,
    };
};
