import { Button } from '@/shared/ui/kit/button';
import { useBoardsList } from '@/features/boards-list/model/use-boards-list.ts';
import { useBoardsFilters } from '@/features/boards-list/model/use-boards-filters.ts';
import { useDebounce } from '@/shared/lib/react.ts';
import { useCreateBoard } from '@/features/boards-list/model/use-create-board.ts';
import {
    BoardsListLayout,
    BoardsListLayoutContent,
    BoardsListLayoutFilters,
    BoardsListLayoutHeader,
} from '@/features/boards-list/ui/boards-list-layout.tsx';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import {
    type ViewMode,
    ViewModeToggle,
} from '@/features/boards-list/ui/view-mode-change.tsx';
import { BoardsSortSelect } from '@/features/boards-list/ui/boards-sort-select.tsx';
import { BoardsSearchInput } from '@/features/boards-list/ui/boards-search-input.tsx';
import { BoardItem } from '@/features/boards-list/compose/board-item.tsx';
import { BoardCard } from '@/features/boards-list/compose/board-card.tsx';

const BoardsListPage = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('list');

    const boardsFilters = useBoardsFilters();
    const boardsQuery = useBoardsList({
        sort: boardsFilters.sort,
        search: useDebounce(boardsFilters.search, 300),
    });

    const createBoard = useCreateBoard();

    return (
        <BoardsListLayout
            header={
                <BoardsListLayoutHeader
                    title="Доски"
                    description="Здесь вы можете просматривать свои доски и управлять ими"
                    actions={
                        <Button
                            disabled={createBoard.isPending}
                            onClick={createBoard.createBoard}
                        >
                            <PlusIcon />
                            Созать доску
                        </Button>
                    }
                />
            }
            filters={
                <BoardsListLayoutFilters
                    filters={
                        <BoardsSearchInput
                            value={boardsFilters.search}
                            onChange={boardsFilters.setSearch}
                        />
                    }
                    sort={
                        <BoardsSortSelect
                            value={boardsFilters.sort}
                            onValueChange={boardsFilters.setSort}
                        />
                    }
                    actions={
                        <ViewModeToggle
                            value={viewMode}
                            onChange={(value) => setViewMode(value)}
                        />
                    }
                />
            }
        >
            <BoardsListLayoutContent
                isPending={boardsQuery.isPending}
                isEmpty={boardsQuery.boards.length === 0}
                hasNextPage={boardsQuery.hasNextPage}
                isPendingNext={boardsQuery.isFetchingNextPage}
                cursorRef={boardsQuery.cursorRef}
                hasCursor={boardsQuery.hasNextPage}
                mode={viewMode}
                renderList={() =>
                    boardsQuery.boards.map((board) => (
                        <BoardItem key={board.id} board={board} />
                    ))
                }
                renderGrid={() =>
                    boardsQuery.boards.map((board) => (
                        <BoardCard key={board.id} board={board} />
                    ))
                }
            />
        </BoardsListLayout>
    );
};

export const Component = BoardsListPage;
