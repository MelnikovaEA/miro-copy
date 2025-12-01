import { rqClient } from '@/shared/api/instance.ts';
import { type RefCallback, useCallback } from 'react';
import type { BoardsSortOptions } from '@/features/boards-list/model/use-boards-filters.ts';
import { keepPreviousData } from '@tanstack/react-query';

type Params = {
    limit?: number;
    isFavorite?: boolean;
    search?: string;
    sort?: BoardsSortOptions;
};

export const useBoardsList = ({
    limit = 40,
    isFavorite,
    search,
    sort,
}: Params) => {
    const { fetchNextPage, data, isFetchingNextPage, isPending, hasNextPage } =
        rqClient.useInfiniteQuery(
            'get',
            '/boards',
            {
                params: {
                    query: {
                        page: 1,
                        limit,
                        sort,
                        search,
                        isFavorite,
                    },
                },
            },
            {
                initialPageParam: 1,
                pageParamName: 'page',
                getNextPageParam: (lastPage, _, lastPageParams) =>
                    Number(lastPageParams) < lastPage.totalPages
                        ? Number(lastPageParams) + 1
                        : null,
                placeholderData: keepPreviousData,
            }
        );

    const cursorRef: RefCallback<HTMLDivElement> = useCallback(
        (el) => {
            if (!el) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    if (
                        entries[0].isIntersecting &&
                        !isFetchingNextPage &&
                        hasNextPage
                    ) {
                        fetchNextPage();
                    }
                },
                {
                    threshold: 0.1,
                }
            );

            observer.observe(el);

            return () => observer.disconnect();
        },
        [fetchNextPage, isFetchingNextPage, hasNextPage]
    );

    const boards = data?.pages.flatMap((page) => page.list) ?? [];

    return {
        boards,
        isFetchingNextPage,
        isPending,
        hasNextPage,
        cursorRef,
    };
};
