import { defineConfig } from "vite-plus";

// https://vitejs.dev/config/
export default defineConfig({
  lint: { options: { typeAware: true, typeCheck: true } },
  fmt: {},
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["cjs", "es"],
      fileName: "react-google-recaptcha-hook",
    },
    rolldownOptions: {
      external: ["react"],
    },
  },
});
