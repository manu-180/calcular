"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import "./estilos-sueldos.css";

// Lo que monta la página del mundo (MundoCliente, después del ranking). El panel y sus textos en diez
// idiomas viajan en un chunk aparte que se pide después de la carga: la inicial de la página no paga
// nada. El servidor y el primer render del navegador dibujan solo el ancla, así la hidratación coincide.
const Panel = lazy(() => import("./AporteSueldoPanel"));

export interface PropsAporteSueldo {
  // País de la grilla del mundo (edición principal, "ar" en calcular.ar).
  mercado: string;
  moneda: string;
  ppa: number;
  nombrePais: string;
  locale: string;
  // URL de la página del mundo: de ahí sale la edición, para el trato de los textos.
  base: string;
  // Sueldo bruto por mes del recibo que escribió la persona; null mientras se ve el ejemplo.
  bruto: number | null;
}

export function AporteSueldo(props: PropsAporteSueldo) {
  const [listo, setListo] = useState(false);

  // Cuando el navegador queda libre: el chunk no compite con la carga de la página. No se espera a que
  // el bloque entre en pantalla: el ancla es display: contents (no suma un hueco a la grilla de la
  // página si el bloque no aparece) y un IntersectionObserver no ve elementos sin caja.
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setListo(true), { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setListo(true), 800);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="cy-su-anclaje">
      {listo ? (
        <Suspense fallback={null}>
          <Panel {...props} />
        </Suspense>
      ) : null}
    </div>
  );
}
