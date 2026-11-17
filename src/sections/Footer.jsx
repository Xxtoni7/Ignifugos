import { Clock3, MapPin, Phone } from "lucide-react";
import Brand from "../components/Brand.jsx";
import { BUSINESS_INFO, FOOTER_NAVIGATION, SITE_DESCRIPTION, SITE_ROUTES, SITE_BRAND_NAME } from "../config/site.js";
import { buildWhatsAppGeneralMessage, buildWhatsAppUrl, formatWhatsAppNumber } from "../lib/whatsapp.js";
import "../styles/footerLegal.css";
import "./Footer.css";

const CONTACT_ITEMS = [
  { key: "phone", icon: Phone, label: "Teléfono" },
  { key: "address", icon: MapPin, label: "Dirección" },
  { key: "hours", icon: Clock3, label: "Días y horarios de atención" },
  { key: "instagram", icon: InstagramMark, label: "Instagram" },
];

function InstagramMark({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ContactLink({ item, children, href }) {
  const Icon = item.icon;
  const content = (
    <>
      <Icon className="site-footer__contact-icon" size={20} strokeWidth={1.8} aria-hidden="true" />
      <span>{children}</span>
    </>
  );

  return href ? (
    <a className="site-footer__contact-link" href={href} target="_blank" rel="noopener noreferrer" aria-label={item.label === "Teléfono" ? `${item.label}: ${children}` : undefined}>
      {content}
    </a>
  ) : (
    <span className="site-footer__contact-link" aria-label={item.label}>
      {content}
    </span>
  );
}

export default function Footer() {
  const phoneHref = buildWhatsAppUrl(buildWhatsAppGeneralMessage());
  const phoneLabel = formatWhatsAppNumber() || "WhatsApp";

  return (
    <footer className="site-footer" aria-label={`Pie de página de ${SITE_BRAND_NAME}`}>
      <div className="site-footer__container">
        <div className="site-footer__grid">
          <section className="site-footer__about" aria-label="Información de la empresa">
            <Brand variant="footer" />
            <p className="site-footer__description">{SITE_DESCRIPTION}</p>
            <nav className="site-footer__legal-links" aria-label="Información legal">
              <a href={SITE_ROUTES.privacy}>Política de Privacidad</a>
              <a href={SITE_ROUTES.terms}>Términos y Condiciones</a>
            </nav>
          </section>

          <nav className="site-footer__navigation" aria-label="Enlaces rápidos">
            <h2>Enlaces rápidos</h2>
            <ul>
              {FOOTER_NAVIGATION.map(({ label, href }) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </nav>

          <section className="site-footer__contact" aria-labelledby="site-footer-contact-title">
            <h2 id="site-footer-contact-title">Contacto</h2>
            <ul>
              {CONTACT_ITEMS.map((item) => {
                if (item.key === "phone") {
                  return <li key={item.key}><ContactLink item={item} href={phoneHref}>{phoneLabel}</ContactLink></li>;
                }
                if (item.key === "address") {
                  return <li key={item.key}><ContactLink item={item} href={BUSINESS_INFO.mapsUrl}>{BUSINESS_INFO.address}</ContactLink></li>;
                }
                if (item.key === "hours") {
                  return <li key={item.key}><ContactLink item={item}>{BUSINESS_INFO.openingHours}</ContactLink></li>;
                }
                return <li key={item.key}><ContactLink item={item} href={BUSINESS_INFO.instagramUrl}>{BUSINESS_INFO.instagramLabel}</ContactLink></li>;
              })}
            </ul>
          </section>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} {SITE_BRAND_NAME}. Todos los derechos reservados.</p>
          <p>Desarrollado por <a href="https://www.linkedin.com/in/toni-riveros316321/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn del desarrollador">AR</a></p>
        </div>
      </div>
    </footer>
  );
}
