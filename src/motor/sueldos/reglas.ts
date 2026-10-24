import { esExperiencia, esOcupacion, type Experiencia, type Ocupacion } from "./catalogo";

// Reglas de un aporte, iguales en el navegador (avisa antes de enviar) y en /api/sueldos (decide). Sin
// dependencias: el endpoint le pasa el país de la grilla del mundo y nada más.

// Montos en dólares internacionales por mes (paridad de poder adquisitivo). REFERENCIA es el mismo
// sueldo de ejemplo de la página del mundo: no es la mediana de nadie, es una escala para poner topes.
// Ninguna calculadora del registro tiene hoy el salario mínimo mensual en una forma común (por hora en
// AU, CA y US; por día en otros), así que el piso va por PPA y la opción del mínimo queda para cuando
// exista ese dato.
export const REFERENCIA_PPA_MENSUAL = 3000;
export const PISO_PPA_MENSUAL = 100;
export const TECHO_REFERENCIAS = 50;
export const FRACCION_MINIMO = 0.3;

export interface PaisAportable {
  mercado: string;
  moneda: string;
  // Moneda local por dólar internacional (la de la grilla del mundo).
  ppa: number;
  // Sueldo mínimo mensual en moneda local, si algún día la grilla lo trae.
  minimoMensual?: number;
}

export interface Limites {
  min: number;
  max: number;
}

// Dos cifras significativas, como el ejemplo de la página del mundo: 1.234.567 → 1.200.000. Se guarda
// así para que el monto exacto de nadie quede en la base.
export function dosCifras(n: number): number {
  if (!Number.isFinite(n) || n <= 0) return 0;
  const p = Math.pow(10, Math.floor(Math.log10(n)) - 1);
  const r = Math.round(n / p) * p;
  // 10^k con k negativo deja colas binarias (0,30000000000000004): se limpian con la misma precisión.
  return Number(r.toPrecision(2));
}

export function limitesDe(pais: PaisAportable): Limites {
  const porPpa = PISO_PPA_MENSUAL * pais.ppa;
  const porMinimo = pais.minimoMensual && pais.minimoMensual > 0 ? FRACCION_MINIMO * pais.minimoMensual : 0;
  return { min: Math.max(porPpa, porMinimo), max: TECHO_REFERENCIAS * REFERENCIA_PPA_MENSUAL * pais.ppa };
}

export function dentroDeLimites(bruto: number, pais: PaisAportable): boolean {
  const { min, max } = limitesDe(pais);
  return Number.isFinite(bruto) && bruto >= min && bruto <= max;
}

// Mes del aporte en UTC (AAAA-MM). Lo pone el servidor: la fecha exacta no se guarda nunca.
export function mesDe(fecha: Date): string {
  return fecha.toISOString().slice(0, 7);
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const MERCADO = /^[a-z]{2,3}$/;

export interface FilaAporte {
  id: string;
  mercado: string;
  moneda: string;
  ocupacion: Ocupacion;
  experiencia: Experiencia;
  bruto_mensual: number;
  mes: string;
}

// El cuerpo que manda el navegador. Claves cortas a propósito: no hay nada más que esto.
export interface CuerpoAporte {
  id: string;
  m: string;
  o: string;
  e: string;
  b: number;
  // Consentimiento explícito: sin true no se guarda.
  ok: true;
}

// Cualquier falla devuelve solo un motivo para el log; el endpoint nunca se lo dice a quien envía.
export function validarAporte(cuerpo: unknown, buscar: (mercado: string) => PaisAportable | undefined, ahora: Date): { fila: FilaAporte } | { error: string } {
  if (!cuerpo || typeof cuerpo !== "object" || Array.isArray(cuerpo)) return { error: "forma" };
  const c = cuerpo as Record<string, unknown>;
  const claves = Object.keys(c);
  if (claves.length !== 6 || !["id", "m", "o", "e", "b", "ok"].every((k) => claves.includes(k))) return { error: "claves" };
  if (c.ok !== true) return { error: "consentimiento" };
  if (typeof c.id !== "string" || !UUID.test(c.id)) return { error: "id" };
  if (typeof c.m !== "string" || !MERCADO.test(c.m)) return { error: "mercado" };
  const pais = buscar(c.m);
  if (!pais || !(pais.ppa > 0)) return { error: "mercado" };
  if (!esOcupacion(c.o)) return { error: "ocupacion" };
  if (!esExperiencia(c.e)) return { error: "experiencia" };
  if (typeof c.b !== "number" || !Number.isFinite(c.b)) return { error: "monto" };
  const bruto = dosCifras(c.b);
  if (!dentroDeLimites(bruto, pais)) return { error: "rango" };
  return { fila: { id: c.id, mercado: pais.mercado, moneda: pais.moneda, ocupacion: c.o, experiencia: c.e, bruto_mensual: bruto, mes: mesDe(ahora) } };
}
