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

const pages = [
  {
    module: "/src/App.jsx",
    output: "dist/index.html",
    images: [
      "src/assets/hero.png",
      "src/assets/hero-mobile.webp",
      "src/assets/logo.jpeg",
      "src/assets/tratamiento-madera.png",
      "src/assets/tratamiento-textil.png",
      "src/assets/tratamiento-metal.png",
    ],
  },
  {
    module: "/src/legal/PrivacyPolicy.jsx",
    output: "dist/politica-de-privacidad/index.html",
    images: ["src/assets/logo.jpeg"],
  },
  {
    module: "/src/legal/TermsAndConditions.jsx",
    output: "dist/terminos-y-condiciones/index.html",
    images: ["src/assets/logo.jpeg"],
  },
];

try {
  const manifest = JSON.parse(await readFile(resolve("dist/.vite/manifest.json"), "utf8"));

  for (const page of pages) {
    const { default: Component } = await server.ssrLoadModule(page.module);
    const path = resolve(page.output);
    const html = await readFile(path, "utf8");
    let output = html.replace(
      '<div id="root"></div>',
      `<div id="root">${renderToString(createElement(Component))}</div>`,
    );

    if (output === html) {
      throw new Error(`No se encontró el contenedor de React en ${page.output}`);
    }

    for (const sourcePath of page.images) {
      const asset = manifest[sourcePath];
      if (!asset?.file) throw new Error(`No se encontró ${sourcePath} en el manifest de Vite`);
      output = output.replaceAll(`/${sourcePath}`, `/${asset.file}`);
    }

    if (/\/(?:src\/assets)\//.test(output)) {
      throw new Error(`El HTML prerenderizado conserva rutas fuente de assets: ${page.output}`);
    }

    await writeFile(path, output);
  }
} finally {
  await server.close();
}
