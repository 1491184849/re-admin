import { defineConfig } from "vite";
import { resolve } from "path";
import { viteMockServe } from "vite-plugin-mock";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import vue from "@vitejs/plugin-vue";

const pathResolve = (path: string): string => resolve(process.cwd(), path);

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "./mock", // mock文件存放的位置
      enable: command === "serve" || mode === "mock", //在开发环境中启用 mock
    }),
  ],
  resolve: {
    alias: {
      "@": pathResolve("src"),
      "#": pathResolve("types"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
}));
