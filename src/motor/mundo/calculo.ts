import type { CargaCompartida, GrillaMundo, PaisMundo } from "./tipos";

// Brutos anuales en dólares internacionales donde se corre la calculadora de cada país. Espaciados en
// escala logarítmica: los tramos de impuesto se apiñan en los sueldos bajos y medios. Donde la ley pone
// un escalón entre dos vecinos, la grilla agrega puntos propios del país (grilla.ts, densificar).
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

export function diasDelAnio(anio: number): number {
  return bisiesto(anio) ? 366 : 365;
}

// Día del año en que se termina de «pagar» la carga si todo lo que se gana desde el 1 de enero fuera
// primero al Estado (la cuenta del Tax Freedom Day, con la carga de la persona). Con carga cero es 0:
// no hay ningún día para el Estado, y la página lo dice con su propio texto en vez de «1 de enero».
export function diaDeLibertad(tasa: number, anio: number): number {
  if (!(tasa > 0)) return 0;
  const dias = diasDelAnio(anio);
  return Math.min(dias, Math.max(1, Math.ceil(tasa * dias)));
}

// El día de una carga compartida sale siempre de su tasa redondeada: la tarjeta, la página y el duelo
// dicen la misma fecha y el link no lleva un número más fino que el porcentaje.
export function diaDeCarga(carga: Pick<CargaCompartida, "tasa">, anio: number): number {
  return diaDeLibertad(carga.tasa / 100, anio);
}

export function fechaDelDia(dia: number, anio: number): Date {
  return new Date(Date.UTC(anio, 0, dia));
}

export interface FilaMundo {
  pais: PaisMundo;
  // Promedio de 12 meses del neto anual, para comparar países con distinta cantidad de pagas.
  netoMensualLocal: number;
  // El neto de ese país expresado en la moneda de quien compara, por poder de compra.
  netoMensualEquivalente: number;
  tasa: number;
}

function filasPpa(grilla: GrillaMundo, base: PaisMundo, brutoPpa: number): FilaMundo[] {
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

// Mismo sueldo en poder de compra, corrido por la calculadora oficial de cada país. El bruto es ANUAL
// (con aguinaldo y pagas extra), en la moneda del país de origen.
export function compararDesde(grilla: GrillaMundo, origen: string, brutoAnualLocal: number): FilaMundo[] {
  const base = grilla.paises.find((p) => p.mercado === origen);
  if (!base || !(brutoAnualLocal > 0) || !(base.ppa > 0)) return [];
  return filasPpa(grilla, base, brutoAnualLocal / base.ppa);
}

// Privacidad del link compartido. La carga no se calcula con el sueldo sino con el centro de su franja:
// franjas de bruto en dólares internacionales con una razón de 1,25 entre bordes, así cada carga posible
// corresponde a un rango de sueldos de por lo menos ±10 % (check_mundo lo prueba con la grilla real).
// Redondear solo la tasa no alcanza: donde la tasa sube rápido o tiene un pico, una banda de 2 puntos
// encierra un rango de sueldos angosto. Encima de eso la tasa va en múltiplos de 2 y la ventaja en
// múltiplos de 5.
export const RAZON_FRANJA = 1.25;
export const PASO_TASA = 2;
export const PASO_VENTAJA = 5;
export const TOPE_VENTAJA = 995;
// Por debajo de esto la carga es cero: la calculadora no descuenta nada (umbral de un redondeo de centavos).
const CARGA_NULA = 5e-4;

export function franjaDe(brutoPpa: number): { indice: number; centro: number; desde: number; hasta: number } | null {
  if (!(brutoPpa > 0) || !Number.isFinite(brutoPpa)) return null;
  const indice = Math.floor(Math.log(brutoPpa) / Math.log(RAZON_FRANJA));
  return { indice, centro: RAZON_FRANJA ** (indice + 0.5), desde: RAZON_FRANJA ** indice, hasta: RAZON_FRANJA ** (indice + 1) };
}

export function redondearTasa(tasa: number): number {
  if (!(tasa >= CARGA_NULA)) return 0;
  return Math.min(100, Math.max(PASO_TASA, Math.round((tasa * 100) / PASO_TASA) * PASO_TASA));
}

export function redondearVentaja(pct: number): number {
  if (!(pct > 0)) return 0;
  return Math.min(TOPE_VENTAJA, Math.round(pct / PASO_VENTAJA) * PASO_VENTAJA);
}

export function cargaDesde(grilla: GrillaMundo, origen: string, brutoAnualLocal: number): CargaCompartida | null {
  const base = grilla.paises.find((p) => p.mercado === origen);
  if (!base || !(base.ppa > 0)) return null;
  const franja = franjaDe(brutoAnualLocal / base.ppa);
  if (!franja) return null;
  const filas = filasPpa(grilla, base, franja.centro);
  const propia = filas.find((f) => f.pais.mercado === origen);
  if (!propia || !filas.length) return null;
  // Cero solo si tampoco se paga nada en el borde de arriba de la franja: «no pagás nada» tiene que
  // valer para todos los sueldos que comparten esa carga.
  const t = tasaEfectiva(base, franja.centro);
  const tasa = t < CARGA_NULA && tasaEfectiva(base, franja.hasta) < CARGA_NULA ? 0 : redondearTasa(Math.max(t, CARGA_NULA));
  const mejor = filas[0];
  const ventaja = mejor.pais.mercado !== origen && propia.netoMensualEquivalente > 0 ? redondearVentaja((mejor.netoMensualEquivalente / propia.netoMensualEquivalente - 1) * 100) : 0;
  return { mercado: origen, tasa, mejor: ventaja > 0 ? mejor.pais.iso : base.iso, ventaja };
}

// Formato del `c` de los links compartidos: mercado.tasa.mejor.ventaja (ej. "mx.30.PT.15"). Solo
// caracteres que no se codifican en una URL.
export function codificarCarga(c: CargaCompartida): string {
  return [c.mercado, c.tasa, c.mejor, c.ventaja].join(".");
}

// Lo mínimo de la grilla para validar una carga: qué mercados y qué países hay.
export interface PaisesDeCarga {
  readonly paises: readonly { readonly mercado: string; readonly iso: string }[];
}

// Lee un `c` con tolerancia (mayúsculas cambiadas, ceros a la izquierda, valores fuera de la escala) y
// dice si ya estaba en su forma canónica. Un mercado o un país que no están en la grilla, o un número
// fuera de rango, no se arreglan: la carga es inválida.
export function normalizarCarga(valor: string | null | undefined, grilla: PaisesDeCarga): { carga: CargaCompartida; canonica: boolean } | null {
  if (typeof valor !== "string" || !valor || valor.length > 40) return null;
  const partes = valor.split(".");
  if (partes.length !== 4) return null;
  const [m, t, me, v] = partes;
  if (!/^[a-z]{2}(-[a-z]{2})?$/i.test(m) || !/^[a-z]{2}$/i.test(me) || !/^\d{1,3}$/.test(t) || !/^\d{1,3}$/.test(v)) return null;
  const mercado = m.toLowerCase();
  const origen = grilla.paises.find((p) => p.mercado === mercado);
  const mejorPedido = me.toUpperCase();
  if (!origen || !grilla.paises.some((p) => p.iso === mejorPedido)) return null;
  const tasaCruda = Number(t);
  const ventajaCruda = Number(v);
  if (tasaCruda > 100 || ventajaCruda > 999) return null;
  const tasa = tasaCruda === 0 ? 0 : Math.max(PASO_TASA, Math.round(tasaCruda / PASO_TASA) * PASO_TASA);
  const ventaja = mejorPedido === origen.iso ? 0 : redondearVentaja(ventajaCruda);
  const carga: CargaCompartida = { mercado, tasa, mejor: ventaja > 0 ? mejorPedido : origen.iso, ventaja };
  return { carga, canonica: codificarCarga(carga) === valor };
}

// Solo la forma canónica: lo que arma cargaDesde. La OG y el navegador no dibujan otra cosa.
export function decodificarCarga(valor: string | null | undefined, grilla: PaisesDeCarga): CargaCompartida | null {
  const n = normalizarCarga(valor, grilla);
  return n?.canonica ? n.carga : null;
}
