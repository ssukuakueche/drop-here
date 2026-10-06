import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
    entry: './src/react/index.tsx',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {   
        rules: [
            {
                test: /\.(ts|tsx|css)$/,
                loader: 'esbuild-loader',
                options: {
                    target: 'es2015',
                    minify: true
                }
            }
        ]
    },
}