import { setupWorker } from 'msw/browser';
import { boardsHandlers } from '@/shared/api/mocks/handlers/boards.ts';
import { authHandlers } from '@/shared/api/mocks/handlers/auth.ts';

export const worker = setupWorker(...boardsHandlers, ...authHandlers);
