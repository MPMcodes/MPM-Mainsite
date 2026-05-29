import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        // Split big, slow-changing vendors into their own chunks so repeat
        // visits (and frequent redeploys) only re-download the small app
        // chunk, and the browser can fetch vendors in parallel + cache them.
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (/[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id))
            return "framer";
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id))
            return "react";
          return "vendor";
        },
      },
    },
  },
});
