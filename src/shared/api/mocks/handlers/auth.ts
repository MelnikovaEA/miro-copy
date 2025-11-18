import type { ApiSchemas } from '@/shared/api/schema';
import { http } from '../http.ts';
import { delay, HttpResponse } from 'msw';

const userPasswords = new Map<string, string>();
const mockUsers: ApiSchemas['User'][] = [
    {
        id: '1',
        email: 'email@email.com',
    },
];

userPasswords.set('email@email.com', '123456');

const mockTokens = new Map<string, string>();

export const authHandlers = [
    http.post('/auth/login', async ({ request }) => {
        const body = await request.json();

        const user = mockUsers.find((u) => u.email === body.email);
        const storedPassword = userPasswords.get(body.email);

        await delay();

        if (!user || !storedPassword || storedPassword !== body.password) {
            return HttpResponse.json(
                {
                    message: 'Неверный email или пароль',
                    code: 'INVALID_CREDENTIALS',
                },
                { status: 401 }
            );
        }

        const token = `mock-token-${Date.now()}`;
        return HttpResponse.json(
            {
                accessToken: token,
                user,
            },
            { status: 200 }
        );
    }),

    http.post('/auth/register', async ({ request }) => {
        const body = await request.json();

        await delay();

        if (mockUsers.some((u) => u.email === body.email)) {
            return HttpResponse.json(
                {
                    message: 'Пользователь уже существует',
                    code: 'USER_EXISTS',
                },
                { status: 400 }
            );
        }

        const newUser: ApiSchemas['User'] = {
            id: String(mockUsers.length + 1),
            email: body.email,
        };

        const token = `mock-token-${Date.now()}`;
        mockUsers.push(newUser);
        userPasswords.set(body.email, body.password);
        mockTokens.set(body.email, token);

        return HttpResponse.json(
            {
                accessToken: token,
                user: newUser,
            },
            { status: 201 }
        );
    }),
];
