"use client";

import { useSyncExternalStore } from "react";

// Puntos por compartir: viven en el navegador (localStorage), no en una cuenta. Son un juego para tentar a
// compartir, no un premio canjeable: por eso no hay servidor ni verificación de que el share se publicó.
// Cada canal suma una sola vez por tarjeta (`clave`): cambiar de cosa o de sueldo arma otra tarjeta y vuelve
// a sumar, que es justo lo que se quiere.

export type CanalPuntos = "instagram" | "whatsapp" | "facebook" | "x";

export const PUNTOS_POR_CANAL: Readonly<Record<CanalPuntos, number>> = { instagram: 30, whatsapp: 20, facebook: 20, x: 20 };

export interface Nivel {
  n: number;
  nombre: string;
  desde: number;
}

export const NIVELES: readonly Nivel[] = [
  { n: 1, nombre: "Curioso", desde: 0 },
  { n: 2, nombre: "Vecino informado", desde: 20 },
  { n: 3, nombre: "Dato de sobremesa", desde: 70 },
  { n: 4, nombre: "Referente del grupo", desde: 150 },
  { n: 5, nombre: "Economista de asado", desde: 260 },
  { n: 6, nombre: "Ministro de las cuentas", desde: 400 },
  { n: 7, nombre: "Leyenda de calcular.ar", desde: 600 },
];

const CLAVE = "calcular:puntos:v1";
// Tope de tarjetas recordadas: lo viejo se olvida y puede volver a sumar, sin crecer sin fin.
const MAX_HECHOS = 400;

interface Guardado {
  puntos: number;
  hechos: string[];
}

const VACIO: Guardado = { puntos: 0, hechos: [] };
let actual: Guardado | null = null;
const oyentes = new Set<() => void>();

function leer(): Guardado {
  if (actual) return actual;
  try {
    const g = JSON.parse(localStorage.getItem(CLAVE) ?? "null") as Partial<Guardado> | null;
    actual = g && typeof g.puntos === "number" && g.puntos >= 0 && Array.isArray(g.hechos) ? { puntos: Math.floor(g.puntos), hechos: g.hechos.filter((h) => typeof h === "string") } : VACIO;
  } catch {
    actual = VACIO;
  }
  return actual;
}

function escribir(g: Guardado) {
  actual = g;
  try {
    localStorage.setItem(CLAVE, JSON.stringify(g));
  } catch {}
  oyentes.forEach((o) => o());
}

function suscribir(o: () => void) {
  oyentes.add(o);
  const otraPestana = (e: StorageEvent) => {
    if (e.key !== CLAVE) return;
    actual = null;
    o();
  };
  window.addEventListener("storage", otraPestana);
  return () => {
    oyentes.delete(o);
    window.removeEventListener("storage", otraPestana);
  };
}

export function nivelDe(puntos: number) {
  let i = 0;
  while (i + 1 < NIVELES.length && puntos >= NIVELES[i + 1].desde) i++;
  const nivel = NIVELES[i];
  const siguiente = NIVELES[i + 1] ?? null;
  const progreso = siguiente ? (puntos - nivel.desde) / (siguiente.desde - nivel.desde) : 1;
  return { nivel, siguiente, progreso: Math.max(0, Math.min(1, progreso)) };
}

export function usarPuntos(): number {
  return useSyncExternalStore(
    suscribir,
    () => leer().puntos,
    () => 0,
  );
}

// Devuelve los puntos sumados (0 si esa tarjeta ya sumó por ese canal).
export function sumarPuntos(canal: CanalPuntos, clave: string): number {
  const g = leer();
  const hecho = `${canal}|${clave}`;
  if (g.hechos.includes(hecho)) return 0;
  const suma = PUNTOS_POR_CANAL[canal];
  escribir({ puntos: g.puntos + suma, hechos: [...g.hechos, hecho].slice(-MAX_HECHOS) });
  return suma;
}

export function yaSumo(canal: CanalPuntos, clave: string): boolean {
  return leer().hechos.includes(`${canal}|${clave}`);
}
