import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const server = await createServer({
  configFile: false,
  mode: "production",
  define: { "import.meta.env.DEV": false },
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  const path = resolve("dist/index.html");
  const html = await readFile(path, "utf8");
  const output = html.replace(
    '<div id="root"></div>',
    `<div id="root">${renderToString(createElement(App))}</div>`,
  );

  if (output === html) {
    throw new Error("No se encontró el contenedor de React en dist/index.html");
  }

  await writeFile(path, output);
} finally {
  await server.close();
}
