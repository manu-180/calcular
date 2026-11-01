import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";

type Mapa = Readonly<Record<string, number>>;

// Tablas por años completos: la clave es el primer año del tramo («1» = 1 a 4 años). Devuelve el
// valor del tramo más alto que alcanza, o 0 si no llega al primero.
export function anaEti(mapa: Mapa, eti: number): number {
  let valor = 0;
  let mejor = -1;
  for (const [k, v] of Object.entries(mapa)) {
    const desde = Number(k);
    if (eti >= desde && desde > mejor) {
      mejor = desde;
      valor = v;
    }
  }
  return valor;
}

export function elegxosEton(eti: number, campo: string): void {
  if (!Number.isInteger(eti) || eti < 0) throw new ErrorEntrada("Εισάγετε τα συμπληρωμένα έτη (0 ή περισσότερα).", campo);
}

export function prosthesiMinon(fecha: FechaISO, mines: number): FechaISO {
  const [a, m, d] = fecha.split("-").map(Number);
  const total = a * 12 + (m - 1) + mines;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  const ultimo = new Date(Date.UTC(anio, mes, 0)).getUTCDate();
  return `${anio}-${String(mes).padStart(2, "0")}-${String(Math.min(d, ultimo)).padStart(2, "0")}` as FechaISO;
}
