import { SERVICE_OPTIONS } from "../content/services.js";

export const CONSULTA_LIMITS = Object.freeze({
  name: 80,
  zone: 80,
  details: 500,
});

const ERROR_MESSAGES = Object.freeze({
  nameRequired: "Contanos tu nombre.",
  serviceRequired: "Elegí un servicio.",
  zoneRequired: "Indicá tu localidad o zona.",
  max80: "Máximo 80 caracteres.",
  max500: "Máximo 500 caracteres.",
});

export function normalizeConsulta(values = {}) {
  return {
    name: typeof values.name === "string" ? values.name.trim() : "",
    service: typeof values.service === "string" ? values.service : "",
    zone: typeof values.zone === "string" ? values.zone.trim() : "",
    details: typeof values.details === "string" ? values.details.trim() : "",
  };
}

export function validateConsulta(values = {}) {
  const normalized = normalizeConsulta(values);
  const errors = {};

  if (!normalized.name) errors.name = ERROR_MESSAGES.nameRequired;
  else if (normalized.name.length > CONSULTA_LIMITS.name) errors.name = ERROR_MESSAGES.max80;

  if (!SERVICE_OPTIONS.includes(normalized.service)) {
    errors.service = ERROR_MESSAGES.serviceRequired;
  }

  if (!normalized.zone) errors.zone = ERROR_MESSAGES.zoneRequired;
  else if (normalized.zone.length > CONSULTA_LIMITS.zone) errors.zone = ERROR_MESSAGES.max80;

  if (normalized.details.length > CONSULTA_LIMITS.details) {
    errors.details = ERROR_MESSAGES.max500;
  }

  return errors;
}

export function buildConsultaMessage(values = {}) {
  const normalized = normalizeConsulta(values);
  if (Object.keys(validateConsulta(normalized)).length > 0) return null;

  const lines = [
    "Hola IgnífugosCABA! Vengo de la página web.",
    "",
    `Nombre: ${normalized.name}`,
    `Servicio de interés: ${normalized.service}`,
    `Localidad o zona: ${normalized.zone}`,
  ];

  if (normalized.details) {
    lines.push(`Información adicional: ${normalized.details}`);
  }

  return lines.join("\n");
}
