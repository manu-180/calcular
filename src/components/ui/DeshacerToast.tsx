"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { apilar, desapilar, type Quitada } from "@/lib/deshacer";

const ESPERA = 6000;

type Entrada<T> = { quitada: Quitada<T>; texto: string; vuelta: string };

export type ControlDeshacer = {
  ultima: { texto: string; clave: number } | null;
  anuncio: string;
  deshacer: () => void;
  pausar: (pausado: boolean) => void;
};

export function useDeshacer<T>(restaurar: (quitada: Quitada<T>) => void) {
  const [pila, setPila] = useState<Entrada<T>[]>([]);
  const [pausado, setPausado] = useState(false);
  const [anuncio, setAnuncio] = useState("");
  const [clave, setClave] = useState(0);
  const restaurarRef = useRef(restaurar);
  useLayoutEffect(() => {
    restaurarRef.current = restaurar;
  });

  useEffect(() => {
    if (pila.length === 0 || pausado) return;
    const t = window.setTimeout(() => setPila([]), ESPERA);
    return () => window.clearTimeout(t);
  }, [pila, pausado]);

  const registrar = useCallback((quitada: Quitada<T> | null, texto: string, vuelta: string) => {
    if (!quitada) return;
    setPila((p) => apilar(p, { quitada, texto, vuelta }));
    setClave((c) => c + 1);
    setAnuncio(`${texto}. Podés deshacerlo.`);
  }, []);

  const deshacer = useCallback(() => {
    const { pila: resto, ultima } = desapilar(pila);
    if (!ultima) return;
    restaurarRef.current(ultima.quitada);
    setPila(resto);
    setClave((c) => c + 1);
    setAnuncio(ultima.vuelta);
  }, [pila]);

  const descartar = useCallback(() => setPila([]), []);

  const tope = pila[pila.length - 1];
  const control: ControlDeshacer = {
    ultima: tope ? { texto: tope.texto, clave } : null,
    anuncio,
    deshacer,
    pausar: setPausado,
  };
  return { registrar, descartar, control };
}

export function DeshacerToast({ control }: { control: ControlDeshacer }) {
  const { ultima, anuncio, deshacer, pausar } = control;
  const [despeje, setDespeje] = useState(0);
  const visible = ultima !== null;

  useLayoutEffect(() => {
    if (!visible) return;
    const barra = document.querySelectorAll<HTMLElement>('.ca-herr-dock[data-visible="true"], .ca-herr-tip[data-visible="true"]');
    const arriba = Math.min(...[...barra].map((el) => el.getBoundingClientRect().top));
    setDespeje(Number.isFinite(arriba) ? Math.max(window.innerHeight - arriba - 6, 0) : 0);
  }, [visible]);

  useEffect(() => {
    if (!visible) pausar(false);
  }, [visible, pausar]);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[calc(max(1rem,env(safe-area-inset-bottom))+var(--despeje))] print:hidden"
        style={{ "--despeje": `${despeje}px` } as CSSProperties}
        data-sin-herramientas=""
      >
        {ultima && (
          <div
            key={ultima.clave}
            onPointerEnter={() => pausar(true)}
            onPointerLeave={() => pausar(false)}
            onFocus={() => pausar(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) pausar(false);
            }}
            className="pointer-events-auto flex max-w-md items-center gap-4 rounded-full bg-zinc-900 py-2 pl-5 pr-2 text-sm text-zinc-100 shadow-[0_14px_34px_-14px_rgba(0,0,0,0.5)] motion-safe:animate-[ca-col_0.26s_var(--ease-fluid)_backwards]"
          >
            <span className="min-w-0 truncate">{ultima.texto}</span>
            <button
              type="button"
              onClick={deshacer}
              className="min-h-10 shrink-0 rounded-full bg-white/10 px-4 font-semibold text-white outline-none transition-[background-color,transform] duration-150 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-emerald-300 active:scale-[0.96]"
            >
              Deshacer
            </button>
          </div>
        )}
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {anuncio}
      </p>
    </>
  );
}
