import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import { handleInPageNavigation } from "./lib/inPageNavigation.js";
import "./styles/global.css";

const root = document.getElementById("root");

window.history.scrollRestoration = "manual";
if (!window.location.hash) window.scrollTo(0, 0);

document.addEventListener("click", handleInPageNavigation);

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    document.removeEventListener("click", handleInPageNavigation);
  });
}

if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
