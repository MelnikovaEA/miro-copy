import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), viteTsconfigPaths(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});
