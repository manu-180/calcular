"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";

// Lo único que corre en el navegador: la cuenta regresiva contra el día de quien mira (el HTML se
// cachea y una página armada ayer no puede decir «mañana» hoy), el filtro por tema y el botón de
// copiar. Todo el calendario llega pintado del servidor; esto no trae datos.

const sinSuscripcion = () => () => {};
const hoyLocal = () => new Intl.DateTimeFormat("en-CA").format(new Date());
const enServidor = () => null;
const dias = (desde: string, hasta: string) => Math.round((Date.parse(`${hasta}T00:00:00Z`) - Date.parse(`${desde}T00:00:00Z`)) / 86_400_000);

export interface TextosCuenta {
  hoy: string;
  manana: string;
  ayer: string;
  // Con «{n}» en el lugar del número: las funciones del diccionario no cruzan al navegador.
  en: string;
  hace: string;
  // Solo en idiomas con más de dos formas de plural (el árabe: يومين، 3 أيام، 11 يومًا): una plantilla
  // por categoría de Intl.PluralRules. Sin esto valen `en`, `hace` y la unidad que llega armada.
  plurales?: { locale: string; en: Record<string, string>; hace: Record<string, string>; unidad: Record<string, string> };
}

function categoria(n: number, t: TextosCuenta): string {
  return t.plurales ? new Intl.PluralRules(t.plurales.locale).select(n) : "other";
}

function rotulo(n: number, t: TextosCuenta): string {
  if (n === 0) return t.hoy;
  if (n === 1) return t.manana;
  if (n === -1) return t.ayer;
  const m = Math.abs(n);
  const plantilla = t.plurales?.[n > 0 ? "en" : "hace"][categoria(m, t)] ?? (n > 0 ? t.en : t.hace);
  return plantilla.replace("{n}", String(m));
}

function useDias(fecha: string, servidor: number): number {
  const hoy = useSyncExternalStore(sinSuscripcion, hoyLocal, enServidor);
  return hoy ? dias(hoy, fecha) : servidor;
}

export function Cuenta({ fecha, dias: servidor, textos }: { fecha: string; dias: number; textos: TextosCuenta }) {
  const n = useDias(fecha, servidor);
  return <span className="cy-cal-cuenta">{rotulo(n, textos)}</span>;
}

// La cifra grande del héroe: el número de días y su unidad, o «Hoy»/«Mañana» sin número.
export function CuentaGrande({ fecha, dias: servidor, textos, otros }: { fecha: string; dias: number; textos: TextosCuenta; otros: string }) {
  const n = Math.max(0, useDias(fecha, servidor));
  if (n <= 1) return <span className="cy-cal-gran-palabra">{n === 0 ? textos.hoy : textos.manana}</span>;
  return (
    <>
      <span className="cy-cal-gran-numero">{n}</span>
      <span className="cy-cal-gran-unidad">{textos.plurales?.unidad[categoria(n, textos)] ?? otros}</span>
    </>
  );
}

export function Filtro({ tipos, etiqueta, todo, children }: { tipos: readonly { id: string; nombre: string; n: number }[]; etiqueta: string; todo: string; children: ReactNode }) {
  const [activo, setActivo] = useState<string | null>(null);
  return (
    <div className="cy-cal-filtrable" data-filtro={activo ?? undefined}>
      {tipos.length > 1 ? (
        <div className="cy-cal-filtro" role="group" aria-label={etiqueta}>
          <button type="button" aria-pressed={activo === null} onClick={() => setActivo(null)}>
            {todo}
          </button>
          {tipos.map((x) => (
            <button key={x.id} type="button" data-tipo={x.id} aria-pressed={activo === x.id} onClick={() => setActivo(activo === x.id ? null : x.id)}>
              <span className="cy-cal-punto" aria-hidden="true" />
              {x.nombre}
              <span className="cy-cal-filtro-n">{x.n}</span>
            </button>
          ))}
        </div>
      ) : null}
      {children}
    </div>
  );
}

export function Copiar({ texto, copiar, copiado }: { texto: string; copiar: string; copiado: string }) {
  const [hecho, setHecho] = useState(false);
  return (
    <button
      type="button"
      className="cy-cal-boton cy-cal-boton-claro"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(texto);
          setHecho(true);
          setTimeout(() => setHecho(false), 2200);
        } catch {
          window.prompt(copiar, texto);
        }
      }}
    >
      <span aria-live="polite">{hecho ? copiado : copiar}</span>
    </button>
  );
}
