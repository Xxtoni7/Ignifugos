import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const fromRoot = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: fromRoot("./index.html"),
        privacy: fromRoot("./politica-de-privacidad/index.html"),
        terms: fromRoot("./terminos-y-condiciones/index.html"),
      },
    },
  },
});
