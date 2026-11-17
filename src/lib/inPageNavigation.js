export const SECTION_NAVIGATION_EVENT = "ignifugos:section-navigation";

function announceSectionNavigation(sectionId) {
  window.dispatchEvent(new CustomEvent(SECTION_NAVIGATION_EVENT, {
    detail: { sectionId },
  }));
}

export function handleInPageNavigation(event) {
  if (
    event.defaultPrevented
    || event.button !== 0
    || event.metaKey
    || event.ctrlKey
    || event.shiftKey
    || event.altKey
  ) {
    return;
  }

  const clickedElement = event.target;
  if (!(clickedElement instanceof Element)) return;

  const link = clickedElement.closest('a[href^="#"]');
  if (!link || link.target === "_blank") return;

  let sectionId;
  try {
    sectionId = decodeURIComponent(link.hash.slice(1));
  } catch {
    return;
  }

  if (!sectionId) return;

  const section = document.getElementById(sectionId);
  if (!section) return;

  event.preventDefault();

  announceSectionNavigation(sectionId);

  if (window.location.hash !== link.hash) {
    window.history.pushState(null, "", link.href);
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  section.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}
