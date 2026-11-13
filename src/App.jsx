import Header from "./sections/Header.jsx";
import { availableSections } from "./content/navigation.js";
import Home from "./sections/Home.jsx";
import Marquee from "./sections/Marquee.jsx";
import Certificado from "./sections/Certificado.jsx";
import Tratamientos from "./sections/Tratamientos.jsx";

export default function App() {
  return (
    <>
      <Header availableSections={availableSections} />
      <main id="contenido" aria-label="Contenido principal">
        <Home />
        <Marquee />
        <Certificado />
        <Tratamientos />
      </main>
    </>
  );
}
