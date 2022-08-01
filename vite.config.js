import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'RxJS HTTP Client',
            fileName: (format) => `rxjs-http-client.${format}.js`,
        },
        rollupOptions: {
            external: ['rxjs'],
            output: {
                globals: {
                    rxjs: 'rxjs',
                },
            },
        }
    },
    plugins: [
        dts()
    ]
});