import { jwtDecode } from 'jwt-decode';
import { publicFetchClient } from '../api/instance';
import { create } from 'zustand/react';

type Session = {
    userId: string;
    email: string;
    exp: number;
    iat: number;
};

type State = {
    token: string | null;
    session: Session | null;
    login: (token: string) => void;
    logout: () => void;
    getFreshToken: () => Promise<string | null>;
};

let refreshTokenPromise: Promise<string | null> | null = null;

export const useSession = create<State>((set, get) => {
    const initialToken = localStorage.getItem('token');

    const decode = (token: string | null): Session | null => {
        if (!token) return null; // здесь null
        try {
            return jwtDecode<Session>(token);
        } catch {
            return null;
        }
    };

    const login = (token: string) => {
        localStorage.setItem('token', token);
        set({ token, session: decode(token) });
    };

    const logout = () => {
        localStorage.removeItem('token');
        set({ token: null, session: null });
    };

    const getFreshToken = async (): Promise<string | null> => {
        const token = get().token;
        if (!token) return null;

        const session = decode(token);
        if (!session) return null;

        // если токен просрочен
        if (session.exp < Date.now() / 1000) {
            if (!refreshTokenPromise) {
                refreshTokenPromise = publicFetchClient
                    .POST('/auth/refresh')
                    .then((res) => res.data?.accessToken ?? null)
                    .then((newToken) => {
                        if (newToken) {
                            login(newToken);
                            return newToken;
                        } else {
                            logout();
                            return null;
                        }
                    })
                    .finally(() => {
                        refreshTokenPromise = null;
                    });
            }
            const newToken = await refreshTokenPromise;

            if (newToken) {
                return newToken;
            } else {
                return null;
            }
        }

        return token;
    };

    return {
        token: initialToken,
        session: decode(initialToken),
        login,
        logout,
        getFreshToken,
    };
});
