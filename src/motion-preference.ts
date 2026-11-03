import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

export function isMotionReduced() {
  if (typeof window === "undefined") return false;
  const override = document.documentElement.dataset.reducedMotion;
  if (override === "true" || override === "false") return override === "true";
  return window.matchMedia(query).matches;
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia(query);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-reduced-motion"],
  });
  media.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}

export function useReducedMotion() {
  return useSyncExternalStore(subscribe, isMotionReduced, () => false);
}
