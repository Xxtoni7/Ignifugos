import { useEffect, useRef, useState } from "react";
import { buildWhatsAppUrl } from "../lib/whatsapp.js";
import whatsappIcon from "../assets/whatsapp-icon.svg";
import "./WhatsAppFloating.css";

const ACCESSIBLE_NAME = "Contactar por WhatsApp";

export default function WhatsAppFloating() {
  const linkRef = useRef(null);
  const [footerVisible, setFooterVisible] = useState(false);
  const [previewActive, setPreviewActive] = useState(false);
  const [mobileHomeState, setMobileHomeState] = useState("pending");
  const href = buildWhatsAppUrl();
  const developmentPreview = import.meta.env.DEV && !href;

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver((entries) => {
      const intersects = entries.some((entry) => entry.isIntersecting);
      setFooterVisible(intersects);

      if (intersects && document.activeElement === linkRef.current) {
        linkRef.current.blur();
      }
    });

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const marquee = document.querySelector(".service-marquee");
    const mobileViewport = window.matchMedia("(max-width: 39.999rem)");
    let observer;

    const syncViewport = () => {
      observer?.disconnect();

      if (!mobileViewport.matches) {
        setMobileHomeState("inactive");
        return;
      }

      setMobileHomeState("pending");

      if (!marquee || typeof IntersectionObserver === "undefined") {
        setMobileHomeState("past");
        return;
      }

      observer = new IntersectionObserver(([entry]) => {
        const marqueeHasEntered = entry.isIntersecting || entry.boundingClientRect.bottom <= 0;
        setMobileHomeState(marqueeHasEntered ? "past" : "home");

        if (!marqueeHasEntered && document.activeElement === linkRef.current) {
          linkRef.current.blur();
        }
      });
      observer.observe(marquee);
    };

    syncViewport();
    mobileViewport.addEventListener("change", syncViewport);
    return () => {
      observer?.disconnect();
      mobileViewport.removeEventListener("change", syncViewport);
    };
  }, []);

  if (!href && !developmentPreview) return null;

  const temporarilyHidden = footerVisible
    || mobileHomeState === "pending"
    || mobileHomeState === "home";

  const control = href ? (
    <a
      ref={linkRef}
      className="whatsapp-floating__link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ACCESSIBLE_NAME}
      tabIndex={temporarilyHidden ? -1 : 0}
    >
      <span className="whatsapp-floating__bubble" aria-hidden="true">
        ¿Tenés alguna consulta?
      </span>
      <img src={whatsappIcon} alt="" aria-hidden="true" focusable="false" />
    </a>
  ) : (
    <div
      ref={linkRef}
      className={`whatsapp-floating__link${previewActive ? " whatsapp-floating__link--preview-active" : ""}`}
      role="img"
      aria-label={ACCESSIBLE_NAME}
      tabIndex={temporarilyHidden ? -1 : 0}
      onPointerDown={() => setPreviewActive(true)}
      onPointerUp={() => setPreviewActive(false)}
      onPointerCancel={() => setPreviewActive(false)}
      onPointerLeave={() => setPreviewActive(false)}
    >
      <span className="whatsapp-floating__bubble" aria-hidden="true">
        ¿Tenés alguna consulta?
      </span>
      <img src={whatsappIcon} alt="" aria-hidden="true" focusable="false" />
    </div>
  );

  return (
    <div
      className="whatsapp-floating"
      aria-hidden={temporarilyHidden ? "true" : undefined}
      data-preview={developmentPreview ? "inactive" : undefined}
      data-footer-visible={footerVisible ? "true" : "false"}
      data-mobile-home-state={mobileHomeState}
    >
      {control}
    </div>
  );
}
