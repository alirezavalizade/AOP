import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr({
      svgrOptions: { exportType: "named", ref: true, svgo: false, titleProp: true },
      include: "**/*.svg",
    }),
    react(),
  ],
  resolve: {
    alias: [{ find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) }],
  },
  server: {
    port: 9090,
  },
});
