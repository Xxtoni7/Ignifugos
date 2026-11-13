import Header from "./sections/Header.jsx";
import Home from "./sections/Home.jsx";
import Marquee from "./sections/Marquee.jsx";
import Certificado from "./sections/Certificado.jsx";
import Tratamientos from "./sections/Tratamientos.jsx";
import Capacitaciones from "./sections/Capacitaciones.jsx";

export default function App() {
  return (
    <>
      <Header availableSections={["certificado"]} />
      <main id="contenido" aria-label="Contenido principal">
        <Home />
        <Marquee />
        <Certificado />
        <Tratamientos />
        <Capacitaciones />
      </main>
    </>
  );
}
