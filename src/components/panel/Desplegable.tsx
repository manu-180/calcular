"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMenosMovimiento } from "./hooks";

// Se anima la fila de la grilla (0fr → 1fr) y no `height`: el alto real del contenido no se
// conoce hasta pintarlo, y así no hace falta medirlo.
export function Desplegable({
  abierto,
  id,
  children,
  enfocar = true,
}: {
  abierto: boolean;
  id?: string;
  children: ReactNode;
  enfocar?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducido = useMenosMovimiento();

  useEffect(() => {
    if (!abierto || !enfocar) return;
    const t = window.setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: reducido ? "auto" : "smooth", block: "nearest" });
    }, reducido ? 0 : 320);
    return () => window.clearTimeout(t);
  }, [abierto, enfocar, reducido]);

  return (
    <div
      id={id}
      ref={ref}
      inert={!abierto}
      className="grid transition-[grid-template-rows] duration-300 ease-fluid motion-reduce:transition-none"
      style={{ gridTemplateRows: abierto ? "1fr" : "0fr" }}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}
