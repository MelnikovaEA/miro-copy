import { useState } from 'react';

export type BoardsSortOptions =
    | 'name'
    | 'createdAt'
    | 'updatedAt'
    | 'lastOpenedAt';

// type BoardsFilters = {
//     search: string,
//     sort: BoardsSortOptions,
// }

export const useBoardsFilters = () => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<BoardsSortOptions>('lastOpenedAt');

    return {
        search,
        setSearch,
        sort,
        setSort,
    };
};
