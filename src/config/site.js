import { HOME_HREF, sectionDestinations } from "../content/navigation.js";

export const SITE_BRAND_NAME = "Ignífugos CABA";

export const SITE_DESCRIPTION = "Tratamientos ignífugos y capacitaciones.";

export const SITE_ROUTES = {
  home: `/${HOME_HREF}`,
  privacy: "/politica-de-privacidad/",
  terms: "/terminos-y-condiciones/",
};

export const FOOTER_NAVIGATION = sectionDestinations.map(({ label, href }) => ({ label, href }));

// Datos ficticios centralizados para la revisión local. Reemplazarlos por los datos de la clienta antes de publicar.
const businessAddress = "Av. Olazábal 5421, CABA Argentina";

export const BUSINESS_INFO = {
  address: businessAddress,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessAddress)}`,
  openingHours: "Lunes a viernes: 9:00 a 18:00",
  instagramLabel: "Ignifugosc.a.b.a",
  instagramUrl: "https://www.instagram.com/ignifugosc.a.b.a/",
  email: "ignifugoscaba@gmail.com",
};

export const LEGAL_INFO = {
  responsibleName: SITE_BRAND_NAME,
  ownerFullName: null,
  address: BUSINESS_INFO.address,
  privacyEmail: BUSINESS_INFO.email,
  retentionPeriod: "12 meses desde la última interacción vinculada con la consulta.",
  access: "La persona responsable de la atención y el personal que necesita la información para responder la consulta.",
  security: "Acceso restringido a las cuentas de atención y autenticación de dos factores cuando la plataforma la ofrece.",
  contentRights: `El logo, las fotografías, los textos y demás contenidos se publican con autorización de sus titulares o pertenecen a ${SITE_BRAND_NAME}. Su publicación no concede permiso para reutilizarlos comercialmente sin la autorización correspondiente.`,
  versionDate: "2026-11-16",
};
