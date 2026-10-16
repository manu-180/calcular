import { aplicarEscalaMarginal, ErrorEntrada } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// El año fiscal de Hong Kong va del 1 de abril al 31 de marzo; las claves de los mapas por año son
// "2026-27" (la etiqueta visible es "2026/27").
export function anioFiscal(fecha: string): string {
  const anio = Number(fecha.slice(0, 4));
  const inicio = Number(fecha.slice(5, 7)) >= 4 ? anio : anio - 1;
  return `${inicio}-${String((inicio + 1) % 100).padStart(2, "0")}`;
}

export function etiquetaAnio(clave: string): string {
  return clave.replace("-", "/");
}

// Un año que todavía no tiene montos cargados usa el último publicado, que es lo que aplica el IRD
// hasta que el presupuesto siguiente los cambia.
export function delAnio(mapa: Readonly<Record<string, number>>, anio: string): number {
  if (anio in mapa) return mapa[anio];
  const anteriores = Object.keys(mapa).filter((k) => k <= anio).sort();
  const clave = anteriores[anteriores.length - 1] ?? Object.keys(mapa).sort()[0];
  if (clave === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  return mapa[clave];
}

export interface Asignaciones {
  basica: Readonly<Record<string, number>>;
  casado: Readonly<Record<string, number>>;
  hijo: Readonly<Record<string, number>>;
  monoparental: Readonly<Record<string, number>>;
  padres60: Readonly<Record<string, number>>;
  padres55: Readonly<Record<string, number>>;
}

export interface Familia {
  casado: boolean;
  monoparental: boolean;
  hijos: number;
  hijosRecientes: number;
  padres60: number;
  padres60Conviven: number;
  padres55: number;
  padres55Conviven: number;
}

export function totalAsignaciones(a: Asignaciones, f: Familia, anio: string): number {
  const hijos = Math.min(9, Math.max(0, Math.floor(f.hijos)));
  const recientes = Math.min(hijos, Math.max(0, Math.floor(f.hijosRecientes)));
  const p60 = Math.max(0, Math.floor(f.padres60));
  const p55 = Math.max(0, Math.floor(f.padres55));
  const c60 = Math.min(p60, Math.max(0, Math.floor(f.padres60Conviven)));
  const c55 = Math.min(p55, Math.max(0, Math.floor(f.padres55Conviven)));
  let total = f.casado ? delAnio(a.casado, anio) : delAnio(a.basica, anio);
  if (!f.casado && f.monoparental && hijos > 0) total += delAnio(a.monoparental, anio);
  total += (hijos + recientes) * delAnio(a.hijo, anio);
  total += (p60 + c60) * delAnio(a.padres60, anio);
  total += (p55 + c55) * delAnio(a.padres55, anio);
  return total;
}

export interface ResultadoSalarios {
  ingresoNeto: number;
  asignaciones: number;
  baseImponible: number;
  progresivo: number;
  estandar: number;
  impuesto: number;
  metodo: "progressive" | "standard";
}

// El impuesto es el menor entre la escala progresiva sobre el ingreso neto menos asignaciones y la
// tasa estándar sobre el ingreso neto sin restar asignaciones (PAM 39, IRD).
export function impuestoSalarios(
  ingresoNeto: number,
  asignaciones: number,
  progresiva: readonly FilaEscala[],
  estandar: readonly FilaEscala[],
): ResultadoSalarios {
  const neto = Math.max(0, ingresoNeto);
  const base = Math.max(0, neto - asignaciones);
  const progresivo = aplicarEscalaMarginal(progresiva, base);
  const conEstandar = aplicarEscalaMarginal(estandar, neto);
  const usaEstandar = conEstandar < progresivo;
  return {
    ingresoNeto: neto,
    asignaciones,
    baseImponible: base,
    progresivo,
    estandar: conEstandar,
    impuesto: usaEstandar ? conEstandar : progresivo,
    metodo: usaEstandar ? "standard" : "progressive",
  };
}

export function tope(monto: number | null, maximo: number): number {
  return Math.min(Math.max(0, monto ?? 0), maximo);
}

// Las escalas de stamp duty mezclan dos tipos de fila: las de alivio marginal (cuotaFija más un
// porcentaje del excedente sobre "desde") y las de tasa plana sobre el precio entero.
export function stampDuty(escala: readonly FilaEscala[], precio: number): number {
  let fila = escala[0];
  for (const f of escala) if (precio > f.desde) fila = f;
  const bruto = fila.cuotaFija !== undefined ? fila.cuotaFija + ((precio - fila.desde) * fila.tasa) / 100 : (precio * fila.tasa) / 100;
  return Math.ceil(bruto - 1e-7);
}
