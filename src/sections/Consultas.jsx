import { forwardRef, useEffect, useRef, useState } from "react";
import Button from "../components/Button.jsx";
import FormField from "../components/FormField.jsx";
import Reveal from "../components/Reveal.jsx";
import SelectField from "../components/SelectField.jsx";
import { consultaCopy, consultaSteps } from "../content/consultas.js";
import { SERVICE_OPTIONS } from "../content/services.js";
import { buildConsultaMessage, CONSULTA_LIMITS, validateConsulta } from "../lib/consulta.js";
import { openWhatsApp } from "../lib/whatsapp.js";
import whatsappIcon from "../assets/whatsapp-icon.svg";
import "./Consultas.css";

const initialValues = { name: "", service: "", zone: "", details: "" };

function Flame({ className }) {
  return (
    <svg className={className} viewBox="0 0 320 900" fill="none" aria-hidden="true" focusable="false">
      <path d="M-18 224C21 186 62 151 84 109C99 80 108 55 109 32C135 71 157 111 166 157C178 216 162 267 145 323C132 365 126 399 143 422C176 407 203 383 214 349C219 330 220 305 217 281C250 330 283 373 300 424C321 487 306 555 274 617C232 699 150 777 0 869" />
      <path d="M-14 466C15 423 47 388 83 362C67 406 67 446 89 481C111 516 146 539 166 572C188 608 186 647 171 685C148 739 98 795 0 869" />
    </svg>
  );
}

const Consultas = forwardRef(function Consultas(
  { headingRef, serviceSelection },
  sectionRef,
) {
  const [values, setValues] = useState(() => ({ ...initialValues, service: serviceSelection.service }));
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);
  const serviceRef = useRef(null);
  const zoneRef = useRef(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    setValues((current) => ({ ...current, service: serviceSelection.service }));
    setErrors((current) => ({ ...current, service: undefined }));
  }, [serviceSelection]);

  const updateField = (field) => (eventOrValue) => {
    const value = typeof eventOrValue === "string" ? eventOrValue : eventOrValue.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateConsulta(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = [
        ["name", nameRef],
        ["service", serviceRef],
        ["zone", zoneRef],
        ["details", detailsRef],
      ].find(([field]) => nextErrors[field]);
      firstInvalid?.[1].current?.focus({ preventScroll: false });
      return;
    }

    const prepared = buildConsultaMessage(values);
    if (!prepared) return;
    if (!openWhatsApp(prepared)) {
      event.currentTarget.querySelector('button[type="submit"]')?.focus({ preventScroll: true });
    }
  }

  return (
    <section
      id="consulta"
      className="consultas-section"
      aria-labelledby="consultas-title"
      ref={sectionRef}
      tabIndex={-1}
    >
      <Flame className="consultas-section__flame consultas-section__flame--desktop" />
      <div className="container consultas-section__layout">
        <div className="consultas-section__copy-wrap">
          <div className="consultas-section__flame-mask" aria-hidden="true">
            <Flame className="consultas-section__flame consultas-section__flame--stacked" />
          </div>
          <Reveal className="consultas-section__copy">
            <p className="consultas-section__eyebrow">{consultaCopy.eyebrow}</p>
            <h2 id="consultas-title" ref={headingRef} tabIndex={-1}>{consultaCopy.title}</h2>
            <p className="consultas-section__description">{consultaCopy.description}</p>
            <ol className="consultas-steps">
              {consultaSteps.map(({ number, title, description }) => (
                <li key={number}>
                  <span className="consultas-steps__number" aria-hidden="true">{number}</span>
                  <span className="consultas-steps__copy">
                    <strong>{title}</strong>
                    <span>{description}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal className="consultas-section__card" delay={120}>
          <form className="consultas-form" noValidate onSubmit={handleSubmit}>
            <FormField id="consulta-nombre" label={consultaCopy.nameLabel} error={errors.name} required>
              <input
                ref={nameRef}
                className="form-field__input"
                type="text"
                name="name"
                autoComplete="name"
                maxLength={CONSULTA_LIMITS.name}
                value={values.name}
                onChange={updateField("name")}
              />
            </FormField>

            <FormField id="consulta-servicio" label={consultaCopy.serviceLabel} error={errors.service} required>
              <SelectField
                ref={serviceRef}
                options={SERVICE_OPTIONS}
                value={values.service}
                onValueChange={updateField("service")}
                placeholder={consultaCopy.servicePlaceholder}
              />
            </FormField>

            <FormField id="consulta-zona" label={consultaCopy.zoneLabel} error={errors.zone} required>
              <input
                ref={zoneRef}
                className="form-field__input"
                type="text"
                name="zone"
                maxLength={CONSULTA_LIMITS.zone}
                value={values.zone}
                onChange={updateField("zone")}
              />
            </FormField>

            <FormField id="consulta-detalle" label={consultaCopy.detailsLabel} error={errors.details} optional>
              <textarea
                ref={detailsRef}
                className="form-field__textarea"
                name="details"
                rows={4}
                maxLength={CONSULTA_LIMITS.details}
                value={values.details}
                onChange={updateField("details")}
              />
            </FormField>

            <Button className="consultas-form__submit" variant="hero" size="xl" type="submit">
              <img className="consultas-form__whatsapp-icon" src={whatsappIcon} alt="" aria-hidden="true" />
              {consultaCopy.prepareLabel}
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
});

export default Consultas;
