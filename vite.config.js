import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [vue()],
  base: "./",
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
    fs: {
      allow: [
        // ✅ Allow current TikTok project directory
        path.resolve(__dirname),
        // ✅ Allow InstagramPanel import from outside folder
        path.resolve(__dirname, "../instagram-matrix"),
      ],
    },
  },
  esbuild: {
    supported: {
      "top-level-await": true,
    },
  },
}));
