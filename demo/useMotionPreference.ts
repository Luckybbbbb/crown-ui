import { useEffect, useLayoutEffect, useState } from "react";

export type MotionPreference = "system" | "full" | "reduced";
const storageKey = "crown-motion-preference";
const query = "(prefers-reduced-motion: reduce)";

function readPreference(): MotionPreference {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === "system" || saved === "full" || saved === "reduced") return saved;
    // The old default wrote "false" even without a user choice. Only migrate an explicit reduction.
    return localStorage.getItem("crown-reduced-motion") === "true" ? "reduced" : "system";
  } catch {
    return "system";
  }
}

export function useMotionPreference() {
  const [preference, setPreference] = useState<MotionPreference>(readPreference);
  const [systemReduced, setSystemReduced] = useState(() => window.matchMedia(query).matches);
  const reduced = preference === "reduced" || (preference === "system" && systemReduced);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setSystemReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.dataset.reducedMotion = String(reduced);
    document.documentElement.dataset.motionPreference = preference;
    try { localStorage.setItem(storageKey, preference); } catch { /* Memory-only mode still works. */ }
  }, [preference, reduced]);

  return { preference, setPreference, reduced, systemReduced };
}
