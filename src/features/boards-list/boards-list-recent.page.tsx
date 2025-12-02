import { useState } from 'react';
import { useBoardsList } from './model/use-boards-list';

import {
    BoardsListLayout,
    BoardsListLayoutCards,
    BoardsListLayoutContent,
    BoardsListLayoutContentGroups,
    BoardsListLayoutHeader,
    BoardsListLayoutList,
} from './ui/boards-list-layout';
import { type ViewMode, ViewModeToggle } from './ui/view-mode-change';

import { BoardItem } from './compose/board-item';
import { BoardCard } from './compose/board-card';
import { useRecentGroups } from '@/features/boards-list/model/use-recent-groups.ts';
import { BoardsSidebar } from './ui/boards-sidebar';

const BoardsListRecentPage = () => {
    const boardsQuery = useBoardsList({
        sort: 'updatedAt',
    });

    const [viewMode, setViewMode] = useState<ViewMode>('list');

    const recentGroups = useRecentGroups(boardsQuery.boards);

    return (
        <BoardsListLayout
            sidebar={<BoardsSidebar />}
            header={
                <BoardsListLayoutHeader
                    title="Последние доски"
                    description="Здесь вы можете просматривать свои последние доски и управлять ими"
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
                isEmpty={boardsQuery.boards.length === 0}
                isPending={boardsQuery.isPending}
                isPendingNext={boardsQuery.isFetchingNextPage}
                hasNextPage={boardsQuery.hasNextPage}
                cursorRef={boardsQuery.cursorRef}
                hasCursor={boardsQuery.hasNextPage}
                mode={viewMode}
            >
                <BoardsListLayoutContentGroups
                    groups={recentGroups.map((group) => ({
                        items: {
                            list: (
                                <BoardsListLayoutList>
                                    {group.items.map((board) => (
                                        <BoardItem
                                            key={board.id}
                                            board={board}
                                        />
                                    ))}
                                </BoardsListLayoutList>
                            ),
                            cards: (
                                <BoardsListLayoutCards>
                                    {group.items.map((board) => (
                                        <BoardCard
                                            key={board.id}
                                            board={board}
                                        />
                                    ))}
                                </BoardsListLayoutCards>
                            ),
                        }[viewMode],
                        title: group.title,
                    }))}
                />
            </BoardsListLayoutContent>
        </BoardsListLayout>
    );
};

export const Component = BoardsListRecentPage;
