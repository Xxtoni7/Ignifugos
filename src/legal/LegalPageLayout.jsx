import Brand from "../components/Brand.jsx";
import { LEGAL_INFO, SITE_BRAND_NAME, SITE_ROUTES } from "../config/site.js";
import "../styles/footerLegal.css";
import "./LegalPageLayout.css";

export function LegalSection({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function LegalPageLayout({ title, description, children }) {
  const versionDate = new Intl.DateTimeFormat("es-AR", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${LEGAL_INFO.versionDate}T00:00:00Z`));

  return (
    <div className="legal-page">
      <header className="legal-page__header">
        <div className="legal-page__header-inner">
          <Brand variant="legal" />
          <a className="legal-page__back" href={SITE_ROUTES.home}>Volver al sitio</a>
        </div>
      </header>

      <main className="legal-page__main">
        <article className="legal-page__card" aria-labelledby="legal-page-title">
          <header className="legal-page__intro">
            <h1 id="legal-page-title">{title}</h1>
            <p>{description}</p>
            <time dateTime={LEGAL_INFO.versionDate}>Última actualización: {versionDate}</time>
          </header>
          <div className="legal-page__content">{children}</div>
        </article>
      </main>

      <footer className="legal-page__footer">
        © {new Date().getFullYear()} {SITE_BRAND_NAME}. Todos los derechos reservados.
      </footer>
    </div>
  );
}
