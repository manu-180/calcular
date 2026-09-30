"use client";

import { useEffect, useId, useRef, type PointerEvent, type ReactNode } from "react";
import { IcoCerrar } from "./iconos";
import { useMenosMovimiento } from "./hooks";

const CIERRE_MS = 260;

export function Hoja({
  abierta,
  titulo,
  onCerrar,
  children,
}: {
  abierta: boolean;
  titulo: string;
  onCerrar: () => void;
  children: ReactNode;
}) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const encabezado = useRef<HTMLHeadingElement>(null);
  const volverA = useRef<HTMLElement | null>(null);
  const arrastre = useRef<{ y0: number; t0: number; dy: number } | null>(null);
  const reducido = useMenosMovimiento();
  const idTitulo = useId();

  useEffect(() => {
    const d = dialogo.current;
    if (!d) return;
    if (abierta && !d.open) {
      volverA.current = document.activeElement as HTMLElement | null;
      d.removeAttribute("data-cerrando");
      d.style.transform = "";
      d.showModal();
      document.documentElement.style.overflow = "hidden";
      encabezado.current?.focus({ preventScroll: true });
      return;
    }
    if (abierta && d.open) {
      d.removeAttribute("data-cerrando");
      d.style.transform = "";
      return;
    }
    if (!abierta && d.open) {
      const terminar = () => {
        d.close();
        d.removeAttribute("data-cerrando");
        d.style.transform = "";
        document.documentElement.style.overflow = "";
        volverA.current?.focus({ preventScroll: true });
      };
      if (reducido) return terminar();
      d.setAttribute("data-cerrando", "");
      const t = window.setTimeout(terminar, CIERRE_MS);
      return () => window.clearTimeout(t);
    }
  }, [abierta, reducido]);

  useEffect(
    () => () => {
      document.documentElement.style.overflow = "";
    },
    [],
  );

  const bajar = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || arrastre.current) return;
    if ((e.target as HTMLElement).closest("button")) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    arrastre.current = { y0: e.clientY, t0: performance.now(), dy: 0 };
    if (dialogo.current) dialogo.current.style.transition = "none";
  };

  const mover = (e: PointerEvent<HTMLDivElement>) => {
    const a = arrastre.current;
    const d = dialogo.current;
    if (!a || !d) return;
    const bruto = e.clientY - a.y0;
    a.dy = bruto > 0 ? bruto : -Math.sqrt(-bruto) * 2;
    d.style.transform = `translateY(${a.dy}px)`;
  };

  const soltar = () => {
    const a = arrastre.current;
    const d = dialogo.current;
    arrastre.current = null;
    if (!a || !d) return;
    const velocidad = a.dy / Math.max(1, performance.now() - a.t0);
    d.style.transition = "";
    if (a.dy > 120 || (a.dy > 16 && velocidad > 0.5)) {
      onCerrar();
      return;
    }
    d.style.transition = "transform 0.3s var(--ease-snappy, cubic-bezier(0.32, 0.72, 0, 1))";
    d.style.transform = "";
    window.setTimeout(() => {
      if (dialogo.current) dialogo.current.style.transition = "";
    }, 320);
  };

  return (
    <dialog
      ref={dialogo}
      aria-labelledby={idTitulo}
      className="panel-hoja"
      onCancel={(e) => {
        e.preventDefault();
        onCerrar();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCerrar();
      }}
    >
      <div
        className="shrink-0 cursor-grab touch-none select-none px-5 pb-3 pt-2 active:cursor-grabbing"
        onPointerDown={bajar}
        onPointerMove={mover}
        onPointerUp={soltar}
        onPointerCancel={soltar}
      >
        <div className="mx-auto h-1.5 w-10 rounded-full bg-zinc-300" aria-hidden />
        <div className="mt-2 flex items-center justify-between gap-3">
          <h2 ref={encabezado} id={idTitulo} tabIndex={-1} className="text-base font-semibold text-zinc-900 outline-none focus-visible:shadow-none">
            {titulo}
          </h2>
          <button
            type="button"
            onClick={onCerrar}
            className="-mr-2 grid size-11 place-items-center rounded-full text-zinc-600 transition-[transform,background-color] duration-150 hover:bg-zinc-100 active:scale-95"
          >
            <IcoCerrar />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-zinc-100 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        {children}
      </div>
    </dialog>
  );
}
