import { createRoot, hydrateRoot } from "react-dom/client";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import { handleInPageNavigation } from "../lib/inPageNavigation.js";

const root = document.getElementById("root");
document.addEventListener("click", handleInPageNavigation);

if (import.meta.hot) {
  import.meta.hot.dispose(() => document.removeEventListener("click", handleInPageNavigation));
}

if (root.hasChildNodes()) hydrateRoot(root, <PrivacyPolicy />);
else createRoot(root).render(<PrivacyPolicy />);
