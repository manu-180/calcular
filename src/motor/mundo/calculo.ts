import type { CargaCompartida, GrillaMundo, PaisMundo } from "./tipos";

// Brutos anuales en dólares internacionales donde se corre la calculadora de cada país. Espaciados en
// escala logarítmica: los tramos de impuesto se apiñan en los sueldos bajos y medios, y entre dos
// puntos vecinos la interpolación lineal queda dentro del redondeo que se muestra.
export const BRUTOS_GRILLA: readonly number[] = Array.from({ length: 56 }, (_, i) => Math.round(2000 * Math.pow(400000 / 2000, i / 55)));

export function netoAnualPpa(pais: PaisMundo, brutoPpa: number): number {
  const p = pais.puntos;
  if (!p.length || brutoPpa <= 0) return 0;
  if (brutoPpa <= p[0].bruto) return brutoPpa * (p[0].neto / p[0].bruto);
  const ultimo = p[p.length - 1];
  if (brutoPpa >= ultimo.bruto) return brutoPpa * (ultimo.neto / ultimo.bruto);
  let lo = 0;
  let hi = p.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (p[mid].bruto <= brutoPpa) lo = mid;
    else hi = mid;
  }
  const a = p[lo];
  const b = p[hi];
  return a.neto + ((brutoPpa - a.bruto) / (b.bruto - a.bruto)) * (b.neto - a.neto);
}

export function tasaEfectiva(pais: PaisMundo, brutoPpa: number): number {
  if (brutoPpa <= 0) return 0;
  return Math.min(1, Math.max(0, 1 - netoAnualPpa(pais, brutoPpa) / brutoPpa));
}

function bisiesto(anio: number): boolean {
  return (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0;
}

// Día del año en que se termina de «pagar» la carga si todo lo que se gana desde el 1 de enero fuera
// primero al Estado. Es la misma cuenta del Tax Freedom Day, pero con la carga de la persona.
export function diaDeLibertad(tasa: number, anio: number): number {
  const dias = bisiesto(anio) ? 366 : 365;
  return Math.min(dias, Math.max(1, Math.ceil(tasa * dias)));
}

export function fechaDelDia(dia: number, anio: number): Date {
  return new Date(Date.UTC(anio, 0, dia));
}

export interface FilaMundo {
  pais: PaisMundo;
  netoMensualLocal: number;
  // El neto de ese país expresado en la moneda de quien compara, por poder de compra.
  netoMensualEquivalente: number;
  tasa: number;
}

// Mismo sueldo en poder de compra, corrido por la calculadora oficial de cada país.
export function compararDesde(grilla: GrillaMundo, origen: string, brutoMensualLocal: number): FilaMundo[] {
  const base = grilla.paises.find((p) => p.mercado === origen);
  if (!base || brutoMensualLocal <= 0) return [];
  const brutoPpa = (brutoMensualLocal * 12) / base.ppa;
  return grilla.paises
    .map((pais) => {
      const neto = netoAnualPpa(pais, brutoPpa);
      return {
        pais,
        netoMensualLocal: (neto * pais.ppa) / 12,
        netoMensualEquivalente: (neto * base.ppa) / 12,
        tasa: tasaEfectiva(pais, brutoPpa),
      };
    })
    .sort((a, b) => b.netoMensualEquivalente - a.netoMensualEquivalente);
}

export function cargaDesde(grilla: GrillaMundo, origen: string, brutoMensualLocal: number, anio: number): CargaCompartida | null {
  const filas = compararDesde(grilla, origen, brutoMensualLocal);
  const propia = filas.find((f) => f.pais.mercado === origen);
  if (!propia || !filas.length) return null;
  const mejor = filas[0];
  const ventaja = propia.netoMensualEquivalente > 0 ? Math.round((mejor.netoMensualEquivalente / propia.netoMensualEquivalente - 1) * 100) : 0;
  return {
    mercado: origen,
    tasa: Math.round(propia.tasa * 1000),
    dia: diaDeLibertad(propia.tasa, anio),
    mejor: mejor.pais.iso,
    ventaja: Math.min(999, Math.max(0, ventaja)),
  };
}

// Formato del parámetro `c` de los links compartidos: mercado.tasa.dia.mejor.ventaja (ej.
// "mx.312.115.PT.18"). Cualquier cosa fuera de rango se descarta entera: una OG o un duelo con datos
// inventados no se dibuja.
export function codificarCarga(c: CargaCompartida): string {
  return [c.mercado, c.tasa, c.dia, c.mejor, c.ventaja].join(".");
}

export function decodificarCarga(valor: string | null | undefined): CargaCompartida | null {
  if (!valor || valor.length > 40) return null;
  const partes = valor.split(".");
  if (partes.length !== 5) return null;
  const [mercado, tasa, dia, mejor, ventaja] = partes;
  if (!/^[a-z]{2}(-[a-z]{2})?$/.test(mercado) || !/^[A-Z]{2}$/.test(mejor)) return null;
  const n = [tasa, dia, ventaja].map((x) => (/^\d{1,4}$/.test(x) ? Number(x) : NaN));
  if (n.some(Number.isNaN)) return null;
  const [t, d, v] = n;
  if (t > 1000 || d < 1 || d > 366 || v > 999) return null;
  return { mercado, tasa: t, dia: d, mejor, ventaja: v };
}
