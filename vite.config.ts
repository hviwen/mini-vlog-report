import {defineConfig} from 'vite'
// 导入版权注释插件
import banner from 'vite-plugin-banner'
// 导入 npm 包信息
import pkg from './package.json'
export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/index.ts',
      name: 'vLog',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => {
        switch (format) {
          case "es":
            return 'index.mjs'
          case "cjs":
            return 'index.cjs'
          default:
            return 'index.min.js'
        }
      }
    },
    minify: true
  },
  plugins: [
    banner(
      `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`
    )
  ]
})