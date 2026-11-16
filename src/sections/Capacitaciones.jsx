import {
  ArrowRight,
  FireExtinguisher,
  HardHat,
  HeartPulse,
  Siren,
} from "lucide-react";
import Reveal from "../components/Reveal.jsx";
import {
  capacitaciones,
  equipoRcp,
  motivosCapacitaciones,
} from "../content/capacitaciones.js";
import "./Capacitaciones.css";

const icons = {
  FireExtinguisher,
  HardHat,
  Siren,
};

function CapacitacionCard({ capacitacion, index, onConsult }) {
  const Icon = icons[capacitacion.icon];

  return (
    <Reveal as="div" className="training-option-reveal" delay={index * 100}>
      <button
        className="training-option"
        type="button"
        aria-label={capacitacion.title}
        onClick={() => onConsult?.(capacitacion.service)}
      >
        <span className="training-option__icon" aria-hidden="true">
          <Icon />
        </span>
        <span className="training-option__copy">
          <strong>{capacitacion.title}</strong>
          <span>{capacitacion.description}</span>
        </span>
        <ArrowRight className="training-option__arrow" aria-hidden="true" />
      </button>
    </Reveal>
  );
}

export default function Capacitaciones({ onConsult }) {
  return (
    <section
      id="capacitaciones"
      className="training-section"
      aria-labelledby="training-title"
    >
      <div className="container training-section__inner">
        <Reveal className="training-section__heading">
          <p className="training-section__eyebrow">Servicios complementarios</p>
          <h2 id="training-title">
            <span>Capacitación y</span>{" "}
            <span>seguridad</span>{" "}
            <span>para tu equipo.</span>
          </h2>
        </Reveal>

        <div className="training-section__grid">
          <Reveal as="article" className="training-main-reveal">
            <div className="training-main">
              <span className="training-main__icon" aria-hidden="true">
                <HeartPulse />
              </span>

              <div className="training-main__copy">
                <h3>RCP y primeros auxilios</h3>
                <p>
                  Preparación para actuar ante emergencias, con equipamiento para
                  prácticas.
                </p>
                <ul className="training-equipment" aria-label="Equipamiento de práctica">
                  {equipoRcp.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <button
                className="training-main__action"
                type="button"
                aria-label="Consultar capacitación"
                onClick={() => onConsult?.(motivosCapacitaciones.rcp)}
              >
                <span>Consultar capacitación</span>
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </Reveal>

          <div className="training-section__options">
            {capacitaciones.map((capacitacion, index) => (
              <CapacitacionCard
                key={capacitacion.id}
                capacitacion={capacitacion}
                index={index}
                onConsult={onConsult}
              />
            ))}
            <Reveal as="p" className="training-note" delay={300}>
              <strong>Cotización según necesidad.</strong> Contanos cuántas
              personas y qué buscás, y te armamos la propuesta.
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
