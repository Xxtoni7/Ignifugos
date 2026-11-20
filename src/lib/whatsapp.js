export const WHATSAPP_NUMBER = "5491178216853";

export const WHATSAPP_GENERAL_MESSAGE =
  "Hola, vengo de la página web y quisiera realizar una consulta.";

export function buildWhatsAppGeneralMessage() {
  return WHATSAPP_GENERAL_MESSAGE;
}

const INTERNATIONAL_NUMBER = /^[1-9]\d{7,14}$/;

export function isValidWhatsAppNumber(number = WHATSAPP_NUMBER) {
  return typeof number === "string" && INTERNATIONAL_NUMBER.test(number);
}

export function formatWhatsAppNumber(number = WHATSAPP_NUMBER) {
  if (!isValidWhatsAppNumber(number)) return null;

  if (number.startsWith("54911") && number.length === 13) {
    return `+54 9 11 ${number.slice(5, 9)}-${number.slice(9)}`;
  }

  return `+${number}`;
}

export function buildWhatsAppUrl(message, number = WHATSAPP_NUMBER) {
  if (!isValidWhatsAppNumber(number)) return null;
  if (typeof message !== "string" || message.trim().length === 0) return null;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message, number = WHATSAPP_NUMBER) {
  const url = buildWhatsAppUrl(message, number);
  if (!url || typeof window === "undefined") return false;

  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}
