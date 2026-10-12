"use client";

import { useSyncExternalStore } from "react";
import type { FechaISO } from "../tipos";

const sinSuscripcion = () => () => {};
const hoyLocal = () => new Intl.DateTimeFormat("en-CA").format(new Date()) as FechaISO;
const enServidor = () => null;
// Copia de cercania() de frescura.ts: importarla traería el registro entero al bundle del navegador.
const dias = (desde: string, hasta: string) => Math.round((Date.parse(`${hasta}T00:00:00Z`) - Date.parse(`${desde}T00:00:00Z`)) / 86_400_000);

// "hoy" y "ayer" solo los puede decir el navegador: el HTML se cachea hasta una hora (ISR) y una
// página armada ayer a la noche no puede decir "hoy" a la mañana. El servidor pinta la fecha
// completa y el cliente la cambia por "hoy"/"ayer" si corresponde (useSyncExternalStore: sin
// desajuste de hidratación).
export function FechaViva({ fecha, absoluta, hoy, ayer }: { fecha: FechaISO; absoluta: string; hoy: string; ayer: string }) {
  const hoyVisitante = useSyncExternalStore(sinSuscripcion, hoyLocal, enServidor);
  const d = hoyVisitante ? dias(fecha, hoyVisitante) : null;
  return <time dateTime={fecha}>{d === 0 ? hoy : d === 1 ? ayer : absoluta}</time>;
}
