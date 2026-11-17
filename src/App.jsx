import { useCallback, useRef, useState } from "react";
import Header from "./sections/Header.jsx";
import Home from "./sections/Home.jsx";
import Marquee from "./sections/Marquee.jsx";
import Certificado from "./sections/Certificado.jsx";
import Tratamientos from "./sections/Tratamientos.jsx";
import WhatsAppFloating from "./components/WhatsAppFloating.jsx";
import Capacitaciones from "./sections/Capacitaciones.jsx";
import Consultas from "./sections/Consultas.jsx";
import Footer from "./sections/Footer.jsx";

export default function App() {
  const [serviceSelection, setServiceSelection] = useState({ service: "" });
  const consultasRef = useRef(null);
  const consultasHeadingRef = useRef(null);

  const openConsultas = useCallback((service = "") => {
    setServiceSelection({ service });
    window.requestAnimationFrame(() => {
      const section = consultasRef.current;
      if (!section) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: sectionTop - headerHeight, behavior: reduceMotion ? "auto" : "smooth" });
      consultasHeadingRef.current?.focus({ preventScroll: true });
    });
  }, []);

  const navigateToConsultas = useCallback(() => {
    if (window.location.hash !== "#consulta") window.history.pushState(null, "", "#consulta");
    openConsultas();
  }, [openConsultas]);

  return (
    <>
      <Header availableSections={["certificado"]} budgetReady onBudgetNavigate={navigateToConsultas} />
      <main id="contenido" aria-label="Contenido principal">
        <Home onConsult={openConsultas} />
        <Marquee />
        <Certificado onConsult={openConsultas} />
        <Tratamientos onConsult={openConsultas} />
        <Capacitaciones onConsult={openConsultas} />
        <Consultas
          ref={consultasRef}
          headingRef={consultasHeadingRef}
          serviceSelection={serviceSelection}
        />
      </main>
      <Footer />
      <WhatsAppFloating />
    </>
  );
}
