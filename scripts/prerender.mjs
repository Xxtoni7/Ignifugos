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
  const manifest = JSON.parse(
    await readFile(resolve("dist/.vite/manifest.json"), "utf8"),
  );
  let output = html.replace(
    '<div id="root"></div>',
    `<div id="root">${renderToString(createElement(App))}</div>`,
  );

  if (output === html) {
    throw new Error("No se encontró el contenedor de React en dist/index.html");
  }

  const requiredImages = [
    "src/assets/hero.png",
    "src/assets/hero-mobile.webp",
    "src/assets/logo.jpeg",
    "src/assets/tratamiento-madera.png",
    "src/assets/tratamiento-textil.png",
    "src/assets/tratamiento-metal.png",
  ];

  for (const sourcePath of requiredImages) {
    const asset = manifest[sourcePath];
    if (!asset?.file) {
      throw new Error(`No se encontró ${sourcePath} en el manifest de Vite`);
    }

    output = output.replaceAll(`/${sourcePath}`, `/${asset.file}`);
  }

  if (/\/(?:src\/assets)\//.test(output)) {
    throw new Error("El HTML prerenderizado conserva rutas fuente de assets");
  }

  await writeFile(path, output);
} finally {
  await server.close();
}
