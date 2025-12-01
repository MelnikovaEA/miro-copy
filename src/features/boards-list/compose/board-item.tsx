import type { ApiSchemas } from '@/shared/api/schema';
import { useDeleteBoard } from '@/features/boards-list/model/use-delete-board.ts';
import { useUpdateFavorite } from '@/features/boards-list/model/use-update-favorite.ts';
import { BoardsFavoriteToggle } from '@/features/boards-list/ui/boards-favorite-toggle.tsx';
import { BoardsListItem } from '@/features/boards-list/ui/boards-list-item.tsx';
import { DropdownMenuItem } from '@/shared/ui/kit/dropdown-menu.tsx';

export const BoardItem = ({ board }: { board: ApiSchemas['Board'] }) => {
    const deleteBoard = useDeleteBoard();
    const updateFavorite = useUpdateFavorite();

    return (
        <BoardsListItem
            key={board.id}
            board={board}
            rightActions={
                <BoardsFavoriteToggle
                    isFavorite={updateFavorite.isOptimisticFavorite(board)}
                    onToggle={() => updateFavorite.toggle(board)}
                />
            }
            menuActions={
                <DropdownMenuItem
                    variant="destructive"
                    disabled={deleteBoard.getIsPending(board.id)}
                    onClick={() => deleteBoard.deleteBoard(board.id)}
                >
                    Удалить
                </DropdownMenuItem>
            }
        />
    );
};
