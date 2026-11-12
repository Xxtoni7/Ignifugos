import { useCallback, useEffect, useRef, useState } from "react";
import { Flame, Menu, X } from "lucide-react";
import Button from "../components/Button.jsx";
import { navigationItems } from "../content/navigation.js";
import "./Header.css";

function Brand({ homeReady, onNavigate }) {
  const contents = (
    <>
      <span className="header-brand__mark" aria-hidden="true">
        <Flame className="header-brand__flame" size={20} strokeWidth={2.5} />
      </span>
      <span className="header-brand__text">IGNÍFUGOS <span>CABA</span></span>
    </>
  );

  return homeReady ? (
    <a className="header-brand" href="#inicio" aria-label="Ignífugos CABA, inicio" onClick={onNavigate}>{contents}</a>
  ) : (
    <span className="header-brand">{contents}</span>
  );
}

function Navigation({ availableSections, onNavigate, drawer = false }) {
  return (
    <nav className={drawer ? "header-navigation header-navigation--drawer" : "header-navigation"} aria-label="Secciones">
      {navigationItems.map(({ id, label }) => availableSections.includes(id) ? (
        <a key={id} href={`#${id}`} onClick={onNavigate}>{label}</a>
      ) : (
        <span className="header-navigation__pending" key={id}>{label}</span>
      ))}
    </nav>
  );
}

function BudgetButton({ budgetReady, onNavigate, className = "" }) {
  return budgetReady ? (
    <Button className={className} variant="hero" href="#consulta" onClick={onNavigate}>Pedir presupuesto</Button>
  ) : (
    <Button className={className} variant="hero" disabled>Pedir presupuesto</Button>
  );
}

export default function Header({ availableSections = [], homeReady = false, budgetReady = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerState, setDrawerState] = useState("closed");
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  const closeTimerRef = useRef(null);
  const drawerVisible = drawerState !== "closed";

  const closeMenu = useCallback(() => {
    setDrawerState((current) => current === "open" ? "closing" : current);
  }, []);

  const openMenu = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    setDrawerState("open");
  };

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 24);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    if (drawerState !== "closing") return undefined;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300;
    closeTimerRef.current = window.setTimeout(() => setDrawerState("closed"), duration);
    return () => window.clearTimeout(closeTimerRef.current);
  }, [drawerState]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const closeOnDesktop = () => {
      if (media.matches) closeMenu();
    };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, [closeMenu]);

  useEffect(() => {
    if (!drawerVisible) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = [...document.querySelectorAll(".header-drawer__panel a[href], .header-drawer__panel button:not(:disabled)")];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable.at(-1);
      const panel = document.querySelector(".header-drawer__panel");
      if (!panel?.contains(document.activeElement) || (!event.shiftKey && document.activeElement === last)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [drawerVisible, closeMenu]);

  return (
    <>
      <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
        <div className="site-header__row container">
          <Brand homeReady={homeReady} onNavigate={closeMenu} />
          <Navigation availableSections={availableSections} onNavigate={closeMenu} />
          <div className="site-header__cta">
            <BudgetButton budgetReady={budgetReady} onNavigate={closeMenu} />
          </div>
          <button
            ref={triggerRef}
            className="site-header__menu-button"
            type="button"
            aria-label="Abrir menú"
            aria-controls="header-drawer"
            aria-expanded={drawerVisible}
            onClick={openMenu}
          >
            <Menu size={20} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </header>
      {drawerVisible && (
        <div className="header-drawer" id="header-drawer" data-state={drawerState}>
          <button className="header-drawer__overlay" type="button" tabIndex={-1} aria-label="Cerrar menú" onClick={closeMenu} />
          <dialog open className="header-drawer__panel" aria-modal="true" aria-label="Menú">
            <button ref={closeRef} className="header-drawer__close" type="button" aria-label="Cerrar menú" onClick={closeMenu}>
              <X size={16} strokeWidth={2} aria-hidden="true" />
            </button>
            <Navigation drawer availableSections={availableSections} onNavigate={closeMenu} />
            <BudgetButton className="header-drawer__cta" budgetReady={budgetReady} onNavigate={closeMenu} />
          </dialog>
        </div>
      )}
    </>
  );
}
