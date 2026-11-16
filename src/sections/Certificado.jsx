import { ArrowRight, FileCheck2, PenLine, ShieldCheck } from "lucide-react";
import Button from "../components/Button.jsx";
import Reveal from "../components/Reveal.jsx";
import logo from "../assets/logo.jpeg";
import { SERVICE_CERTIFICATE } from "../content/services.js";
import "./Certificado.css";

const points = [
  {
    icon: PenLine,
    title: "Firma profesional",
    text: "Firmado por un ingeniero en Seguridad e Higiene.",
  },
  {
    icon: FileCheck2,
    title: "Detalle del tratamiento",
    text: "Documenta las superficies tratadas y el trabajo realizado.",
  },
  {
    icon: ShieldCheck,
    title: "Respaldo para tu documentación",
    text: "Para presentar cuando te lo soliciten. No reemplaza los requisitos de una habilitación.",
  },
];

function CertificateIllustration() {
  return (
    <div className="certificate-document-scene" aria-label="Representación ilustrativa de un certificado">
      <div className="certificate-document-back" aria-hidden="true" />
      <article className="certificate-document">
        <div className="certificate-document__header">
          <div>
            <p className="certificate-document__brand">IGNÍFUGOS CABA</p>
            <h3>Certificado de<br />tratamiento ignífugo</h3>
          </div>
          <span className="certificate-document__seal" aria-hidden="true">
            <img src={logo} alt="" width="1563" height="1563" />
          </span>
        </div>
        <dl className="certificate-document__fields">
          <div><dt>Cliente</dt><dd aria-label="Sin completar" /></div>
          <div><dt>Superficie tratada</dt><dd aria-label="Sin completar" /></div>
          <div><dt>Fecha</dt><dd aria-label="Sin completar" /></div>
        </dl>
        <div className="certificate-document__signature" aria-hidden="true" />
      </article>
    </div>
  );
}

export default function Certificado({ onConsult }) {
  return (
    <section id="certificado" className="certificate-section">
      <div className="container certificate-section__inner">
        <div className="certificate-section__copy">
          <Reveal>
            <p className="certificate-section__eyebrow">El diferencial</p>
            <h2 className="certificate-section__title">
              Un certificado que <span>respalda</span> cada trabajo.
            </h2>
            <p className="certificate-section__description">
              Al terminar el tratamiento, recibís un certificado firmado que documenta el trabajo realizado.
              Ideal para empresas, comercios y espacios que necesitan documentar su protección.
            </p>
          </Reveal>

          <ul className="certificate-section__points">
            {points.map(({ icon: Icon, title, text }, index) => (
              <Reveal as="li" key={title} delay={index * 100}>
                <span className="certificate-section__point-icon" aria-hidden="true"><Icon /></span>
                <span className="certificate-section__point-copy">
                  <span className="certificate-section__point-title">{title}</span>
                  <span className="certificate-section__point-text">{text}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="certificate-section__illustration" delay={150}>
          <CertificateIllustration />
          <Reveal className="certificate-section__cta-enter">
            <Button
              className="certificate-section__cta"
              variant="hero"
              onClick={() => onConsult?.(SERVICE_CERTIFICATE)}
            >
              Consultar por el certificado <ArrowRight aria-hidden="true" />
            </Button>
          </Reveal>
        </Reveal>
      </div>
    </section>
  );
}
