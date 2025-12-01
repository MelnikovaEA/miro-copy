import type { ApiSchemas } from '@/shared/api/schema';
import { useDeleteBoard } from '@/features/boards-list/model/use-delete-board.ts';
import { useUpdateFavorite } from '@/features/boards-list/model/use-update-favorite.ts';
import { BoardsListCard } from '@/features/boards-list/ui/boards-list-card.tsx';
import { BoardsFavoriteToggle } from '@/features/boards-list/ui/boards-favorite-toggle.tsx';
import { Button } from '@/shared/ui/kit/button.tsx';

export const BoardCard = ({ board }: { board: ApiSchemas['Board'] }) => {
    const deleteBoard = useDeleteBoard();
    const updateFavorite = useUpdateFavorite();

    return (
        <BoardsListCard
            key={board.id}
            board={board}
            rightTopActions={
                <BoardsFavoriteToggle
                    isFavorite={updateFavorite.isOptimisticFavorite(board)}
                    onToggle={() => updateFavorite.toggle(board)}
                />
            }
            bottomActions={
                <Button
                    variant="destructive"
                    disabled={deleteBoard.getIsPending(board.id)}
                    onClick={() => deleteBoard.deleteBoard(board.id)}
                >
                    Удалить
                </Button>
            }
        />
    );
};
