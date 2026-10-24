"use client";

import { createContext, useEffect, type ReactNode } from "react";
import { ALTO_MAXIMO, ALTO_MINIMO, MENSAJE_ALTO, MENSAJE_LISTO, MENSAJE_PEDIR_ALTO } from "./mensajes";

// Dentro del embed no hay ofertas de pago: OfertaResultado (src/motor/ui/Oferta.tsx) lee esto.
export const ContextoEmbed = createContext(false);

// Le cuenta el alto del contenido a la página que lo enmarca, para que public/embed.js ajuste el
// iframe. Se mide la raíz y no el documento: scrollHeight nunca baja del alto del iframe y la
// calculadora no se podría achicar después de un cálculo o de cerrar una tabla.
function useAltoAlPadre(idRaiz: string) {
  useEffect(() => {
    if (window.parent === window) return;
    const raiz = document.getElementById(idRaiz);
    if (!raiz) return;
    let ultimo = 0;
    let cuadro = 0;
    const enviar = () => {
      cuadro = 0;
      const alto = Math.min(ALTO_MAXIMO, Math.max(ALTO_MINIMO, Math.ceil(raiz.getBoundingClientRect().height)));
      if (alto === ultimo) return;
      ultimo = alto;
      // "*" a propósito: la página que enmarca puede ser cualquiera y el mensaje solo lleva un número.
      window.parent.postMessage({ tipo: MENSAJE_ALTO, alto }, "*");
    };
    const medir = () => {
      cuadro ||= requestAnimationFrame(enviar);
    };
    const observador = new ResizeObserver(medir);
    observador.observe(raiz);
    // embed.js puede cargar después que este iframe (es async): al arrancar pide el alto de nuevo.
    const alRecibir = (ev: MessageEvent) => {
      if (ev.source !== window.parent) return;
      const tipo = (ev.data as { tipo?: unknown } | null)?.tipo;
      if (tipo === MENSAJE_PEDIR_ALTO) {
        ultimo = 0;
        medir();
      } else if (tipo === MENSAJE_LISTO) {
        // embed.js está del otro lado y va a dar el alto justo: la barra de scroll solo ocupa lugar y
        // mueve el ancho. Sin el script el iframe tiene alto fijo y la barra es lo que deja llegar al final.
        document.documentElement.style.overflow = "hidden";
      }
    };
    window.addEventListener("message", alRecibir);
    medir();
    return () => {
      observador.disconnect();
      window.removeEventListener("message", alRecibir);
      if (cuadro) cancelAnimationFrame(cuadro);
    };
  }, [idRaiz]);
}

export function ProveedorEmbed({ idRaiz, children }: { idRaiz: string; children: ReactNode }) {
  useAltoAlPadre(idRaiz);
  return <ContextoEmbed.Provider value={true}>{children}</ContextoEmbed.Provider>;
}
