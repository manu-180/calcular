"use client";

import { useLayoutEffect, useRef } from "react";
import { duracion, numero, pesos } from "@/lib/panel/formato";
import { useMenosMovimiento } from "./hooks";

const FORMATOS = { numero, duracion, pesos } as const;

export type FormatoNumero = keyof typeof FORMATOS;

// El tween escribe directo en el nodo de texto que ya creó React (nunca reemplaza el nodo):
// así no hay un re-render por cuadro y React sigue siendo dueño del texto final.
export function NumeroAnimado({
  valor,
  formato,
  className,
}: {
  valor: number;
  formato: FormatoNumero;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const mostrado = useRef(valor);
  const reducido = useMenosMovimiento();
  const f = FORMATOS[formato];

  useLayoutEffect(() => {
    const nodo = ref.current?.firstChild;
    const desde = mostrado.current;
    if (!nodo || desde === valor || reducido || document.hidden) {
      mostrado.current = valor;
      return;
    }
    nodo.nodeValue = f(desde);
    const t0 = performance.now();
    let raf = 0;
    const paso = (t: number) => {
      const p = Math.min(1, (t - t0) / 700);
      const v = desde + (valor - desde) * (1 - (1 - p) ** 4);
      mostrado.current = v;
      nodo.nodeValue = f(v);
      if (p < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [valor, reducido, f]);

  return (
    <span ref={ref} className={className}>
      {f(valor)}
    </span>
  );
}
