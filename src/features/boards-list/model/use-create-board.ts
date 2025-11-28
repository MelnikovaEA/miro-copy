import { useQueryClient } from '@tanstack/react-query';
import { rqClient } from '@/shared/api/instance.ts';
import { href, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/model/routes.ts';

export const useCreateBoard = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const createBoardMutation = rqClient.useMutation('post', '/boards', {
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: rqClient
                    .queryOptions('get', '/boards')
                    .queryKey.slice(0, 2),
            });
        },
        onSuccess: (data) => {
            navigate(href(ROUTES.BOARD, { boardId: data.id }));
        },
    });

    return {
        isPending: createBoardMutation.isPending,
        createBoard: () => createBoardMutation.mutate({}),
    };
};
