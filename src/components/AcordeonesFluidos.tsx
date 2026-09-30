"use client";

import { useEffect } from "react";

const DURACION = 340;
const CURVA = "cubic-bezier(0.22, 1, 0.36, 1)";

function alturaCerrada(d: HTMLDetailsElement): number {
  const summary = d.querySelector<HTMLElement>(":scope > summary");
  const cs = getComputedStyle(d);
  return (
    (summary?.offsetHeight ?? 0) +
    parseFloat(cs.paddingTop) +
    parseFloat(cs.paddingBottom) +
    parseFloat(cs.borderTopWidth) +
    parseFloat(cs.borderBottomWidth)
  );
}

// Las FAQ son <details> server-rendered en ~100 páginas; en vez de convertir cada una en
// componente cliente, un único listener delegado les da click en toda la card y la animación.
export function AcordeonesFluidos() {
  useEffect(() => {
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animaciones = new WeakMap<HTMLDetailsElement, Animation>();

    const animar = (d: HTMLDetailsElement, desde: number, hasta: number, alTerminar?: () => void) => {
      d.style.overflow = "hidden";
      const a = d.animate({ height: [`${desde}px`, `${hasta}px`] }, { duration: DURACION, easing: CURVA });
      animaciones.set(d, a);
      a.onfinish = () => {
        if (animaciones.get(d) !== a) return;
        animaciones.delete(d);
        alTerminar?.();
        d.style.overflow = "";
      };
    };

    const alternar = (d: HTMLDetailsElement) => {
      const desde = d.getBoundingClientRect().height;
      const cerrando = d.hasAttribute("data-cerrando");
      animaciones.get(d)?.cancel();
      animaciones.delete(d);

      if (!d.open || cerrando) {
        d.removeAttribute("data-cerrando");
        d.open = true;
        const hasta = d.getBoundingClientRect().height;
        animar(d, desde, hasta);
        for (const hijo of d.querySelectorAll<HTMLElement>(":scope > :not(summary)")) {
          hijo.animate(
            { opacity: [0, 1], translate: ["0 -4px", "0 0"] },
            { duration: DURACION, delay: 60, easing: CURVA, fill: "backwards" },
          );
        }
      } else {
        d.setAttribute("data-cerrando", "");
        animar(d, desde, alturaCerrada(d), () => {
          d.open = false;
          d.removeAttribute("data-cerrando");
        });
      }
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const objetivo = e.target as Element | null;
      const d = objetivo?.closest?.<HTMLDetailsElement>("details.ca-acordeon");
      if (!d || objetivo!.closest("details") !== d) return;

      const enSummary = objetivo!.closest("summary")?.parentElement === d;
      if (!enSummary) {
        const control = objetivo!.closest("a, button, input, select, textarea, label");
        if (control && d.contains(control)) return;
        if (window.getSelection()?.toString()) return;
      }

      e.preventDefault();
      if (reducir.matches) {
        d.open = !d.open;
        return;
      }
      alternar(d);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
