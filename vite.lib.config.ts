import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    lib: {
      entry: "src/index.ts",
      name: "CrownUI",
      formats: ["es", "cjs"],
      fileName: (f) => (f === "es" ? "crown-ui.js" : "crown-ui.cjs"),
      cssFileName: "style",
    },
    rollupOptions: { external: ["react", "react-dom", "react/jsx-runtime"] },
  },
});
