import { BUSINESS_INFO, LEGAL_INFO, SITE_BRAND_NAME, SITE_ROUTES } from "../config/site.js";
import { buildWhatsAppGeneralMessage, buildWhatsAppUrl, formatWhatsAppNumber } from "../lib/whatsapp.js";
import LegalPageLayout, { LegalSection } from "./LegalPageLayout.jsx";

function TermsAndConditions() {
  const phone = formatWhatsAppNumber();
  const phoneUrl = buildWhatsAppUrl(buildWhatsAppGeneralMessage());

  return (
    <LegalPageLayout
      description="Estas condiciones regulan el uso del sitio, las solicitudes de presupuesto y la información publicada sobre nuestros servicios."
      title="Términos y Condiciones"
    >
      <LegalSection title="1. Identificación del negocio">
        <dl className="legal-page__business-details">
          <dt>Nombre comercial</dt>
          <dd>{SITE_BRAND_NAME}</dd>
          {LEGAL_INFO.ownerFullName && (
            <>
              <dt>Nombre del titular</dt>
              <dd>{LEGAL_INFO.ownerFullName}</dd>
            </>
          )}
          <dt>Domicilio comercial</dt>
          <dd>{BUSINESS_INFO.address}</dd>
          {phone && (
            <>
              <dt>Teléfono</dt>
              <dd><a href={phoneUrl} target="_blank" rel="noopener noreferrer">{phone}</a></dd>
            </>
          )}
          <dt>Correo electrónico</dt>
          <dd><a href={`mailto:${BUSINESS_INFO.email}`}>{BUSINESS_INFO.email}</a></dd>
        </dl>
      </LegalSection>

      <LegalSection title="2. Uso del sitio y aceptación">
        <p>Estas condiciones describen el uso de la web de {SITE_BRAND_NAME}. Si no estás de acuerdo con ellas, podés dejar de navegar el sitio.</p>
        <p>Completar el formulario o abrir WhatsApp no confirma automáticamente un servicio ni implica la aceptación de condiciones particulares que deban acordarse para cada trabajo.</p>
      </LegalSection>

      <LegalSection title="3. Alcance de la web">
        <p>Esta web brinda información general sobre tratamientos ignífugos, certificados y servicios complementarios, y permite iniciar una consulta. El sitio no calcula precios, emite certificados ni confirma por sí solo la contratación de un servicio.</p>
      </LegalSection>

      <LegalSection title="4. Servicios y presupuestos">
        <p>Las descripciones e imágenes ayudan a conocer de manera general los servicios. El alcance, las superficies, los materiales, la documentación, el precio y las condiciones de cada trabajo se evalúan caso por caso y se informan antes de acordarlo.</p>
        <p>La mención de un certificado no garantiza una habilitación ni un resultado regulatorio específico. Las condiciones particulares se detallarán en la propuesta correspondiente.</p>
      </LegalSection>

      <LegalSection title="5. Confirmación de los trabajos">
        <p>Un trabajo se considera acordado cuando ambas partes confirman expresamente su alcance y las condiciones comunicadas en la propuesta. Enviar una consulta no reserva una fecha ni genera por sí solo una obligación de contratar.</p>
      </LegalSection>

      <LegalSection title="6. Información necesaria para evaluar el servicio">
        <p>Para preparar una propuesta, podemos solicitar información sobre el tipo de superficie o material, el lugar de aplicación y las condiciones relevantes para evaluar el trabajo. La información concreta requerida depende del servicio consultado.</p>
      </LegalSection>

      <LegalSection title="7. Garantías y derechos de las personas consumidoras">
        <p>Las condiciones de garantía que correspondan se informarán para cada servicio y se incorporarán a la propuesta o documentación entregada. Ninguna disposición de estos términos limita los derechos reconocidos por la Ley 24.240 de Defensa del Consumidor ni por otras normas argentinas aplicables.</p>
      </LegalSection>

      <LegalSection title="8. Propiedad intelectual y derechos de autor">
        <p>© {new Date().getFullYear()} {SITE_BRAND_NAME}. {LEGAL_INFO.contentRights}</p>
        <p>Las marcas y contenidos de terceros pertenecen a sus respectivos titulares. La publicación en esta web no autoriza a copiar, modificar, distribuir ni reutilizar contenidos sin el permiso que corresponda.</p>
      </LegalSection>

      <LegalSection title="9. Imágenes y material informativo">
        <p>Las imágenes, ilustraciones y descripciones del sitio tienen fines informativos y pueden ser representativas; no necesariamente muestran un trabajo realizado por {SITE_BRAND_NAME} ni garantizan un resultado idéntico en otro espacio o material.</p>
      </LegalSection>

      <LegalSection title="10. Privacidad">
        <p>El tratamiento de los datos enviados mediante el formulario o WhatsApp se explica en nuestra{" "}
          <a className="font-semibold" href={SITE_ROUTES.privacy}>Política de Privacidad</a>.
        </p>
      </LegalSection>

      <LegalSection title="11. Enlaces de terceros">
        <p>Los enlaces a WhatsApp, Google Maps, Instagram y otros servicios externos facilitan la comunicación o la ubicación. Cada plataforma aplica sus propias condiciones y políticas. {SITE_BRAND_NAME} no controla su disponibilidad ni sus contenidos.</p>
      </LegalSection>

      <LegalSection title="12. Legislación aplicable y modificaciones">
        <p>Estos términos se interpretan conforme a las leyes de la República Argentina, sin limitar los derechos ni la jurisdicción que correspondan a cada persona consumidora. {SITE_BRAND_NAME} podrá actualizar estas condiciones cuando resulte necesario y publicará aquí la versión vigente.</p>
      </LegalSection>
    </LegalPageLayout>
  );
}

export default TermsAndConditions;
