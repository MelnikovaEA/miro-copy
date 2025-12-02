import React from 'react';
import type { ViewMode } from '@/features/boards-list/ui/view-mode-change.tsx';
import { Skeleton } from '@/shared/ui/kit/skeleton.tsx';

export const BoardsListLayout = ({
    sidebar,
    header,
    filters,
    children,
}: {
    children: React.ReactNode;
    header: React.ReactNode;
    sidebar?: React.ReactNode;
    filters?: React.ReactNode;
}) => {
    return (
        <div className="container mx-auto">
            <div className="flex gap-4">
                {sidebar}
                <div className="flex-1 p-4 flex flex-col gap-6">
                    {header}
                    {filters}
                    {children}
                </div>
            </div>
        </div>
    );
};

export const BoardsListLayoutHeader = ({
    title,
    description,
    actions,
}: {
    title: string;
    description?: string;
    actions?: React.ReactNode;
}) => {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                {description && <p className="text-gray-500">{description}</p>}
            </div>
            {actions}
        </div>
    );
};

export const BoardsListLayoutFilters = ({
    sort,
    filters,
    actions,
}: {
    sort?: React.ReactNode;
    filters?: React.ReactNode;
    actions?: React.ReactNode;
}) => {
    return (
        <div className="flex items-center gap-4">
            {filters && (
                <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500 whitespace-nowrap">
                        Filter by
                    </div>
                    {filters}
                </div>
            )}
            {sort && (
                <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500 whitespace-nowrap">
                        Sort by
                    </div>
                    {sort}
                </div>
            )}
            {actions && <div className="ml-auto">{actions}</div>}
        </div>
    );
};

export const BoardsListLayoutContent = ({
    children,
    isEmpty,
    isPending,
    isPendingNext,
    hasNextPage,
    cursorRef,
    renderList,
    renderGrid,
    mode,
    hasCursor,
}: {
    mode: ViewMode;
    renderList?: () => React.ReactNode;
    renderGrid?: () => React.ReactNode;
    children?: React.ReactNode;
    isEmpty?: boolean;
    isPending?: boolean;
    isPendingNext?: boolean;
    hasNextPage?: boolean;
    cursorRef?: React.RefCallback<HTMLDivElement>;
    hasCursor?: boolean;
}) => {
    return (
        <div>
            {isPending && <div className="text-center py-10">Загрузка...</div>}

            {mode === 'list' && renderList && (
                <BoardsListLayoutList>{renderList?.()}</BoardsListLayoutList>
            )}
            {mode === 'cards' && renderGrid && (
                <BoardsListLayoutCards>{renderGrid?.()}</BoardsListLayoutCards>
            )}

            {!isPending && children}

            {isEmpty && !isPending && (
                <div className="text-center py-10">Доски не найдены</div>
            )}

            {hasNextPage && hasCursor && (
                <div ref={cursorRef} className="text-center py-8">
                    {isPendingNext &&
                        {
                            list: (
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            ),
                            cards: (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <Skeleton className="h-40 w-full" />
                                    <Skeleton className="h-40 w-full" />
                                    <Skeleton className="h-40 w-full" />
                                </div>
                            ),
                        }[mode]}
                </div>
            )}
        </div>
    );
};

export const BoardsListLayoutCards = ({
    children,
}: {
    children?: React.ReactNode;
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children}
        </div>
    );
};

export const BoardsListLayoutList = ({
    children,
}: {
    children?: React.ReactNode;
}) => {
    return <div className="flex flex-col gap-2">{children}</div>;
};

export const BoardsListLayoutContentGroups = ({
    groups,
}: {
    groups: { title: string; items: React.ReactNode }[];
}) => {
    return (
        <div className="flex flex-col gap-2">
            {groups.map((group) => (
                <div key={group.title}>
                    <div className="text-lg font-bold">{group.title}</div>
                    {group.items}
                </div>
            ))}
        </div>
    );
};
