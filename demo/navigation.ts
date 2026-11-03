import { useEffect, useState } from "react";
export function navigate(path: string) {
  window.location.hash = path;
}
export function useRoute() {
  const [route, setRoute] = useState(
    () => window.location.hash.slice(1) || "/",
  );
  useEffect(() => {
    const handle = () => {
      setRoute(window.location.hash.slice(1) || "/");
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", handle);
    return () => window.removeEventListener("hashchange", handle);
  }, []);
  return route;
}
