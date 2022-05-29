import { defineConfig } from "vite";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["cjs", "es"],
      fileName: (format) => `react-google-recaptcha-hook.${format}.js`,
    },
    rollupOptions: {
      external: ["react"],
    },
  },
});
