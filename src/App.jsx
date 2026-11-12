import Header from "./sections/Header.jsx";
import Home from "./sections/Home.jsx";
import Marquee from "./sections/Marquee.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main id="contenido" aria-label="Contenido principal">
        <Home />
        <Marquee />
      </main>
    </>
  );
}
