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

function Navigation({ availableSections, activeSection, onNavigate, drawer = false }) {
  return (
    <nav className={drawer ? "header-navigation header-navigation--drawer" : "header-navigation"} aria-label="Secciones">
      {navigationItems.map(({ id, label, href, enabled = false }) => availableSections.includes(id) || enabled ? (
        <a key={id} href={href ?? `#${id}`} aria-current={activeSection === id ? "location" : undefined} onClick={(event) => onNavigate(id, event)}>{label}</a>
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
  const [activeSection, setActiveSection] = useState("inicio");
  const [drawerState, setDrawerState] = useState("closed");
  const triggerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const restoreTriggerFocusRef = useRef(true);
  const pendingBudgetNavigationRef = useRef(false);
  const navigationTargetRef = useRef(null);
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

  const navigateToSection = (id, event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (id !== activeSection) navigationTargetRef.current = id;
    setActiveSection(id);
    closeMenu();
  };

  const navigateToBudget = (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!onBudgetNavigate) {
      closeMenu();
      return;
    }
    event.preventDefault();
    if (activeSection !== "consulta") navigationTargetRef.current = "consulta";
    setActiveSection("consulta");
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
    const sections = [
      ...navigationItems.filter(({ id, enabled }) => enabled || availableSections.includes(id)).map(({ id }) => id),
      ...(budgetReady ? ["consulta"] : []),
    ];
    const updatePosition = () => {
      setScrolled(window.scrollY > 24);
      if (navigationTargetRef.current) return;

      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
      const readingLine = window.scrollY + headerHeight + Math.min(window.innerHeight * 0.35, 240);
      let visibleSection = "inicio";
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top + window.scrollY <= readingLine) visibleSection = id;
      }
      setActiveSection(visibleSection);
    };
    const finishNavigation = () => {
      navigationTargetRef.current = null;
      updatePosition();
    };
    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("scrollend", finishNavigation);
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("scrollend", finishNavigation);
    };
  }, [availableSections, budgetReady]);

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
          <Brand homeReady={homeReady} onNavigate={(event) => navigateToSection("inicio", event)} />
          <Navigation availableSections={availableSections} activeSection={activeSection} onNavigate={navigateToSection} />
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
            <Navigation drawer availableSections={availableSections} activeSection={activeSection} onNavigate={navigateToSection} />
            <BudgetButton className="header-drawer__cta" budgetReady={budgetReady} onNavigate={navigateToBudget} />
          </dialog>
        </div>
      )}
    </>
  );
}
