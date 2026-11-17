// Los destinos son compartidos por Header y Footer; el Header omite Consulta porque usa su CTA.
export const sectionDestinations = [
  { id: "inicio", label: "Inicio", href: "#inicio", inHeader: true, enabled: true },
  { id: "certificado", label: "Certificado", href: "#certificado", inHeader: true },
  { id: "tratamientos", label: "Tratamientos", href: "#tratamientos", inHeader: true, enabled: true },
  { id: "capacitaciones", label: "Capacitaciones", href: "#capacitaciones", inHeader: true, enabled: true },
  { id: "consulta", label: "Consulta", href: "#consulta" },
];

export const HOME_HREF = sectionDestinations[0].href;
export const navigationItems = sectionDestinations.filter(({ inHeader }) => inHeader);
