export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || null;

export const WHATSAPP_GENERAL_MESSAGE =
  "Hola, vengo de la página web y quisiera realizar una consulta.";

const INTERNATIONAL_NUMBER = /^[1-9]\d{7,14}$/;

export function isValidWhatsAppNumber(number = WHATSAPP_NUMBER) {
  return typeof number === "string" && INTERNATIONAL_NUMBER.test(number);
}

export function buildWhatsAppUrl(
  message = WHATSAPP_GENERAL_MESSAGE,
  number = WHATSAPP_NUMBER,
) {
  if (!isValidWhatsAppNumber(number)) return null;
  if (typeof message !== "string" || message.trim().length === 0) return null;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(
  message = WHATSAPP_GENERAL_MESSAGE,
  number = WHATSAPP_NUMBER,
) {
  const url = buildWhatsAppUrl(message, number);
  if (!url || typeof window === "undefined") return false;

  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}
