import Card from "../components/Card.jsx";
import Reveal from "../components/Reveal.jsx";
import { treatments, treatmentsIntroduction } from "../content/treatments.js";
import "./Tratamientos.css";

function TreatmentCard({ treatment, index }) {
  const {
    title,
    description,
    actionLabel,
    service,
    image,
    imageAlt,
    imagePosition = "center",
  } = treatment;

  return (
    <Reveal as="div" className="treatment-reveal" delay={index * 120}>
      <Card as="article" className="treatment-card">
        <div className="treatment-card__visual">
          <img
            className="treatment-card__image"
            src={image}
            alt={imageAlt}
            width="1024"
            height="1280"
            loading="lazy"
            style={{ objectPosition: imagePosition }}
          />
        </div>
        <div className="treatment-card__content">
          <h3>
            {title}<span className="treatment-card__title-period">.</span>
          </h3>
          <p>{description}</p>
          <button
            className="treatment-card__action"
            type="button"
            aria-disabled="true"
            aria-label={`${actionLabel}. La consulta estará disponible cuando se incorpore el formulario.`}
            data-service={service}
          >
            <span>{actionLabel}</span>
            <span className="treatment-card__arrow" aria-hidden="true">↗</span>
          </button>
        </div>
      </Card>
    </Reveal>
  );
}

export default function Tratamientos() {
  return (
    <section className="treatments-section" aria-labelledby="treatments-title">
      <span id="tratamientos" className="treatments-section__anchor" aria-hidden="true" />
      <div className="treatments-section__grid" aria-hidden="true" />
      <div className="container treatments-section__inner">
        <Reveal className="treatments-section__heading">
          <div>
            <p className="treatments-section__eyebrow">Tratamientos</p>
            <h2 id="treatments-title">Tres superficies, un mismo objetivo.</h2>
          </div>
          <p className="treatments-section__intro">{treatmentsIntroduction}</p>
        </Reveal>
        <div className="treatments-section__cards">
          {treatments.map((treatment, index) => (
            <TreatmentCard key={treatment.id} treatment={treatment} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
