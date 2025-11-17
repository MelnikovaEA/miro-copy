import { rqClient } from '@/shared/api/instance.ts';
import { href, Link } from 'react-router-dom';
import { ROUTES } from '@/shared/model/routes.ts';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const BoardsListPage = () => {
    const queryClient = useQueryClient();
    const boardsQuery = useQuery(rqClient.queryOptions('get', '/boards'));
    const key = rqClient.queryOptions('get', '/boards').queryKey.slice(0, 2);

    const deleteBoardMutation = rqClient.useMutation(
        'delete',
        '/boards/{boardId}',
        {
            onSettled: async () => {
                await queryClient.invalidateQueries({ queryKey: key });
            },
        }
    );

    const createBoardMutation = rqClient.useMutation('post', '/boards', {
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: key });
        },
    });

    return (
        <>
            <h1>Boards list</h1>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    createBoardMutation.mutate({
                        body: { name: formData.get('name') as string },
                    });
                }}
            >
                <input name="name" type="text" />
                <button type="submit">Create board</button>
            </form>
            <ul>
                {boardsQuery.data?.map((board) => (
                    <li>
                        <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
                            {board.name}
                        </Link>
                        <button
                            disabled={deleteBoardMutation.isPending}
                            onClick={() =>
                                deleteBoardMutation.mutate({
                                    params: { path: { boardId: board.id } },
                                })
                            }
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export const Component = BoardsListPage;
