import { LEGAL_INFO, SITE_BRAND_NAME, SITE_ROUTES } from "../config/site.js";
import { buildWhatsAppGeneralMessage, buildWhatsAppUrl, formatWhatsAppNumber } from "../lib/whatsapp.js";
import LegalPageLayout from "./LegalPageLayout.jsx";

export default function PrivacyPolicy() {
  const phone = formatWhatsAppNumber();
  const phoneUrl = buildWhatsAppUrl(buildWhatsAppGeneralMessage());

  return (
    <LegalPageLayout
      title="Política de Privacidad"
      description={`Explicamos qué información recibimos cuando realizás una consulta, para qué la utilizamos y cómo podés ejercer tus derechos.`}
    >
      <section><h2>1. Responsable del tratamiento</h2><p> <strong>{LEGAL_INFO.responsibleName}</strong> es responsable del tratamiento de los datos personales. Para consultas sobre tus datos, podés comunicarte por correo electrónico a <a href={`mailto:${LEGAL_INFO.privacyEmail}`}>{LEGAL_INFO.privacyEmail}</a>{phone && <> o al teléfono <a href={phoneUrl} target="_blank" rel="noopener noreferrer">{phone}</a></>}. Su domicilio comercial es {LEGAL_INFO.address}.</p></section>
      <section><h2>2. Datos que podemos recibir</h2><p>El formulario solicita tu nombre, el servicio de interés y tu localidad o zona; el campo de detalle es opcional. <br /> Al continuar la conversación mediante WhatsApp, también recibimos el número telefónico y la información de perfil que esa plataforma muestre de acuerdo con tu configuración.</p></section>
      <section><h2>3. Para qué usamos la información</h2><p>Usamos los datos recibidos para responder tu consulta, brindarte información sobre el servicio que elegiste y preparar una propuesta para tu caso. No utilizamos la información para finalidades incompatibles con estas gestiones. No utilizaremos estos datos para enviar publicidad sin una autorización específica ni los venderemos a terceros.</p></section>
      <section><h2>4. Formulario y WhatsApp</h2><p>Al enviar el formulario, el sitio valida los campos y abre WhatsApp con un mensaje preparado. El texto se incorpora a la dirección de WhatsApp antes de que pulses «Enviar» en esa plataforma. Podés revisarlo, modificarlo o cerrar WhatsApp sin enviarlo. {SITE_BRAND_NAME} recibe el mensaje únicamente cuando decidís enviarlo.<br /> La comunicación queda sujeta a las políticas de WhatsApp y Meta.</p></section>
      <section><h2>5. Enlaces y servicios externos</h2><p>El sitio enlaza a WhatsApp, Google Maps, Instagram y al perfil de LinkedIn del desarrollador. La familia tipográfica DM Sans utilizada en Tratamientos se sirve desde este sitio. El código del sitio no incluye herramientas propias de analítica, píxeles publicitarios ni almacenamiento de datos del formulario en el navegador. Los servicios externos aplican sus propias políticas y pueden procesar datos técnicos necesarios para prestar sus servicios.</p></section>
      <section><h2>6. Conservación y seguridad</h2><p>Conservaremos los datos solamente durante el tiempo necesario para responder la consulta, gestionar el servicio y cumplir obligaciones legales o comerciales aplicables. Adoptamos medidas razonables para evitar el acceso, uso o divulgación no autorizados.</p></section>
      <section><h2>7. Tus derechos</h2><p>Podés solicitar acceso, actualización, rectificación o supresión de tus datos escribiendo a <a href={`mailto:${LEGAL_INFO.privacyEmail}`}>{LEGAL_INFO.privacyEmail}</a>, conforme a las condiciones de la normativa aplicable. También podés consultar la <a href="https://www.argentina.gob.ar/aaip/datospersonales/derechos" target="_blank" rel="noopener noreferrer">guía de derechos de la Agencia de Acceso a la Información Pública</a>.</p></section>
      <section><h2>8. Cambios de esta política</h2><p>Podemos actualizar esta Política de Privacidad para reflejar cambios legales o en el funcionamiento del sitio. La versión vigente estará siempre disponible en esta misma sección, indicando su fecha de actualización.</p><p><a href={SITE_ROUTES.terms}>Leé también los Términos y Condiciones.</a></p></section>
    </LegalPageLayout>
  );
}
