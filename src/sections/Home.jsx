import { ArrowRight, CalendarDays } from "lucide-react";
import Button from "../components/Button.jsx";
import heroImage from "../assets/hero.png";
import mobileHeroImage from "../assets/hero-mobile.webp";
import "./Home.css";

export default function Home() {
  return (
    <section className="home-hero" id="inicio" aria-labelledby="home-title">
      <picture>
        <source media="(max-width: 767px)" srcSet={mobileHeroImage} />
        <img
          className="home-hero__image"
          src={heroImage}
          alt="Interior amplio con vigas de madera, columnas y grandes ventanales"
          fetchPriority="high"
        />
      </picture>
      <div className="home-hero__overlay" aria-hidden="true" />
      <div className="home-hero__inner container">
        <div className="home-hero__copy">
          <p className="home-hero__eyebrow">
            <span className="home-hero__eyebrow-line" aria-hidden="true" />
            Desde 2007 brindando soluciones
          </p>
          <h1 id="home-title">
            Protegemos lo que <span>importa</span>
          </h1>
          <p>
            Tratamos maderas, textiles y estructuras, y entregamos un certificado firmado por ingeniero en Seguridad e Higiene.
          </p>
          <div className="home-hero__trajectory">
            <span className="home-hero__trajectory-icon" aria-hidden="true">
              <CalendarDays size={16} strokeWidth={1.8} />
            </span>
            <p>
              Desde <strong>2007</strong> brindando soluciones
            </p>
          </div>
        </div>
        <div className="home-hero__lower">
          <div className="home-hero__actions" aria-label="Acciones principales">
            <Button variant="hero" disabled>
              Pedir presupuesto <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
            <Button className="home-hero__secondary" disabled>
              Ver tratamientos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
