import { useCallback, useEffect, useRef, useState } from "react";
import Card from "../components/Card.jsx";
import Reveal from "../components/Reveal.jsx";
import { treatments, treatmentsIntroduction } from "../content/treatments.js";
import "./Tratamientos.css";

function TreatmentCard({ treatment, index, active, onRevealComplete }) {
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
    <Reveal
      as="div"
      className="treatment-reveal"
      delay={index * 120}
      onTransitionEnd={(event) => {
        if (event.target === event.currentTarget && event.propertyName === "opacity") {
          onRevealComplete(index);
        }
      }}
    >
      <Card as="article" className="treatment-card" data-scroll-active={active || undefined}>
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
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const centeredRef = useRef(new Set());
  const readyRef = useRef(new Set());
  const [activeIndex, setActiveIndex] = useState(null);

  const updateActive = useCallback(() => {
    const center = window.innerHeight / 2;
    const closest = [...centeredRef.current]
      .filter((index) => readyRef.current.has(index))
      .sort((a, b) => Math.abs(cardsRef.current[a].getBoundingClientRect().top + cardsRef.current[a].offsetHeight / 2 - center)
        - Math.abs(cardsRef.current[b].getBoundingClientRect().top + cardsRef.current[b].offsetHeight / 2 - center))[0];
    setActiveIndex(closest ?? null);
  }, []);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 480px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;

    const observeCenter = () => {
      observer?.disconnect();
      centeredRef.current.clear();
      setActiveIndex(null);
      if (!mobile.matches || reducedMotion.matches) return;

      cardsRef.current = [...sectionRef.current.querySelectorAll(".treatment-reveal")];
      cardsRef.current.forEach((card, index) => {
        if (card.dataset.visible === "true" && getComputedStyle(card).opacity === "1") {
          readyRef.current.add(index);
        }
      });
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const index = cardsRef.current.indexOf(entry.target);
          if (entry.isIntersecting) centeredRef.current.add(index);
          else centeredRef.current.delete(index);
        });
        updateActive();
      }, { rootMargin: "-49% 0px -49% 0px" });
      cardsRef.current.forEach((card) => observer.observe(card));
    };

    observeCenter();
    mobile.addEventListener("change", observeCenter);
    reducedMotion.addEventListener("change", observeCenter);
    return () => {
      observer?.disconnect();
      mobile.removeEventListener("change", observeCenter);
      reducedMotion.removeEventListener("change", observeCenter);
    };
  }, [updateActive]);

  const onRevealComplete = useCallback((index) => {
    readyRef.current.add(index);
    updateActive();
  }, [updateActive]);

  return (
    <section ref={sectionRef} className="treatments-section" aria-labelledby="treatments-title">
      <span id="tratamientos" className="treatments-section__anchor" aria-hidden="true" />
      <div className="treatments-section__grid" aria-hidden="true" />
      <div className="container treatments-section__inner">
        <Reveal className="treatments-section__heading">
          <div>
            <p className="treatments-section__eyebrow">Tratamientos</p>
            <h2 id="treatments-title">
              <span>Tres superficies,</span>{" "}
              <span>un mismo objetivo.</span>
            </h2>
          </div>
          <p className="treatments-section__intro">{treatmentsIntroduction}</p>
        </Reveal>
        <div className="treatments-section__cards">
          {treatments.map((treatment, index) => (
            <TreatmentCard key={treatment.id} treatment={treatment} index={index} active={activeIndex === index} onRevealComplete={onRevealComplete} />
          ))}
        </div>
      </div>
    </section>
  );
}
