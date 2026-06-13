import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { API_BASE_ROUTE } from "./src/services/taskService";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    proxy: {
      [API_BASE_ROUTE]: {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
