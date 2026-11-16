import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../components/Button.jsx";
import { HOME_HREF, navigationItems } from "../content/navigation.js";
import logo from "../assets/logo.jpeg";
import "./Header.css";

function Brand({ homeReady, onNavigate }) {
  const contents = (
    <>
      <span className="header-brand__mark" aria-hidden="true">
        <img className="header-brand__image" src={logo} alt="" width="1563" height="1563" />
      </span>
      <span className="header-brand__text">IGNÍFUGOS <span>CABA</span></span>
    </>
  );

  return homeReady ? (
    <a className="header-brand" href={HOME_HREF} aria-label="Ignífugos CABA, inicio" onClick={onNavigate}>{contents}</a>
  ) : (
    <span className="header-brand">{contents}</span>
  );
}

function Navigation({ availableSections, onNavigate, drawer = false }) {
  return (
    <nav className={drawer ? "header-navigation header-navigation--drawer" : "header-navigation"} aria-label="Secciones">
      {navigationItems.map(({ id, label, href, enabled = false }) => availableSections.includes(id) || enabled ? (
        <a key={id} href={href ?? `#${id}`} onClick={onNavigate}>{label}</a>
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

export default function Header({ availableSections = [], homeReady = true, budgetReady = false, onBudgetNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerState, setDrawerState] = useState("closed");
  const triggerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const restoreTriggerFocusRef = useRef(true);
  const pendingBudgetNavigationRef = useRef(false);
  const drawerVisible = drawerState !== "closed";
  const drawerExpanded = drawerState === "open";

  const closeMenu = useCallback(() => {
    setDrawerState((current) => current === "open" || current === "opening" ? "closing" : current);
  }, []);

  const openMenu = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    restoreTriggerFocusRef.current = true;
    pendingBudgetNavigationRef.current = false;
    setDrawerState((current) => current === "closed" ? "opening" : "open");
  };

  const navigateToBudget = (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!onBudgetNavigate) {
      closeMenu();
      return;
    }
    event.preventDefault();
    restoreTriggerFocusRef.current = false;
    if (drawerVisible) {
      pendingBudgetNavigationRef.current = true;
      closeMenu();
    } else {
      onBudgetNavigate();
    }
  };

  const toggleMenu = () => {
    if (drawerState === "open" || drawerState === "opening") closeMenu();
    else openMenu();
  };

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 24);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    if (drawerState !== "opening") return undefined;
    let secondFrame;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setDrawerState((current) => current === "opening" ? "open" : current);
      });
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [drawerState]);

  useEffect(() => {
    if (drawerState !== "closing") return undefined;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 400;
    closeTimerRef.current = window.setTimeout(() => setDrawerState("closed"), duration);
    return () => window.clearTimeout(closeTimerRef.current);
  }, [drawerState]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (media.matches) setDrawerState("closed");
    };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!drawerVisible) return undefined;

    const previousOverflow = document.body.style.overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    triggerRef.current?.style.setProperty("--menu-scrollbar-compensation", `${scrollbarWidth}px`);
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => triggerRef.current?.focus());
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = [
        triggerRef.current,
        ...document.querySelectorAll(".header-drawer__panel a[href], .header-drawer__panel button:not(:disabled)"),
      ].filter(Boolean);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!focusable.includes(document.activeElement) || (!event.shiftKey && document.activeElement === last)) {
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
      triggerRef.current?.style.removeProperty("--menu-scrollbar-compensation");
      if (restoreTriggerFocusRef.current && triggerRef.current && getComputedStyle(triggerRef.current).display !== "none") {
        window.requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
      }
    };
  }, [drawerVisible, closeMenu]);

  useEffect(() => {
    if (drawerState !== "closed" || !pendingBudgetNavigationRef.current) return undefined;
    const frame = window.requestAnimationFrame(() => {
      pendingBudgetNavigationRef.current = false;
      onBudgetNavigate?.();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [drawerState, onBudgetNavigate]);

  return (
    <>
      <header className={`site-header${scrolled ? " site-header--scrolled" : ""}${drawerVisible ? " site-header--menu-visible" : ""}`}>
        <div className="site-header__row container">
          <Brand homeReady={homeReady} onNavigate={closeMenu} />
          <Navigation availableSections={availableSections} onNavigate={closeMenu} />
          <div className="site-header__cta">
            <BudgetButton budgetReady={budgetReady} onNavigate={navigateToBudget} />
          </div>
          <button
            id="header-menu-trigger"
            ref={triggerRef}
            className="site-header__menu-button"
            type="button"
            aria-label={drawerExpanded ? "Cerrar menú" : "Abrir menú"}
            aria-controls="header-drawer"
            aria-expanded={drawerExpanded}
            data-drawer-visible={drawerVisible}
            onClick={toggleMenu}
          >
            <span className="site-header__menu-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>
      {drawerVisible && (
        <div className="header-drawer" id="header-drawer" data-state={drawerState}>
          <button className="header-drawer__overlay" type="button" tabIndex={-1} aria-label="Cerrar menú" onClick={closeMenu} />
          <dialog open className="header-drawer__panel" aria-modal="true" aria-label="Menú" aria-owns="header-menu-trigger">
            <Navigation drawer availableSections={availableSections} onNavigate={closeMenu} />
            <BudgetButton className="header-drawer__cta" budgetReady={budgetReady} onNavigate={navigateToBudget} />
          </dialog>
        </div>
      )}
    </>
  );
}
