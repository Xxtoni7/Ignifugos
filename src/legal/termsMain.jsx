import { createRoot, hydrateRoot } from "react-dom/client";
import TermsAndConditions from "./TermsAndConditions.jsx";
import { handleInPageNavigation } from "../lib/inPageNavigation.js";

const root = document.getElementById("root");
document.addEventListener("click", handleInPageNavigation);

if (import.meta.hot) {
  import.meta.hot.dispose(() => document.removeEventListener("click", handleInPageNavigation));
}

if (root.hasChildNodes()) hydrateRoot(root, <TermsAndConditions />);
else createRoot(root).render(<TermsAndConditions />);
