import { defineConfig } from 'vitest/config';
import path from 'path';
import Vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [Vue()],
    test: {
        globals: true,
        environment: 'jsdom',
        exclude: [
            '**/node_modules/**',
            '**/services/**',
            '**/store/**',
            '**/e2e/**',
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    root: '.',
});
