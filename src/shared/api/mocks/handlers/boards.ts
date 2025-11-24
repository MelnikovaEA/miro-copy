import { HttpResponse } from 'msw';
import { http } from '../http.ts';
import type { ApiSchemas } from '@/shared/api/schema';
import { verifyTokenOrThrow } from '@/shared/api/mocks/session.ts';

const boards: ApiSchemas['Board'][] = [
    {
        id: 'board-1',
        name: 'Marketing Campaign',
    },
    {
        id: 'board-2',
        name: 'Product Roadmap',
    },
];

export const boardsHandlers = [
    http.get('/boards', async (res) => {
        await verifyTokenOrThrow(res.request);
        return HttpResponse.json(boards);
    }),
    http.post('/boards', async (req) => {
        await verifyTokenOrThrow(req.request);
        const data = await req.request.json();
        const board = {
            id: crypto.randomUUID(),
            name: data.name,
        };
        boards.push(board);
        return HttpResponse.json(board);
    }),
    http.delete('/boards/{boardId}', async ({ params, request }) => {
        await verifyTokenOrThrow(request);
        const { boardId } = params;
        const index = boards.findIndex((board) => board.id === boardId);
        if (index === -1) {
            return HttpResponse.json(
                { message: 'Board not founded', code: '404' },
                { status: 404 }
            );
        }
        boards.splice(index, 1);
        return HttpResponse.json({ message: 'Board deleted', code: '200' });
    }),
];
