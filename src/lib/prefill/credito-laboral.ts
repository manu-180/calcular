import type { Prefill } from "./tipos";
import { numero, objeto, opcion } from "./_campos";
import { PRIMER_PERIODO, ULTIMO_PERIODO, existePeriodo, mesesEntre, sumarMeses, type Periodo } from "@/lib/inflacion";

// Sólo lo que hace falta para rehacer la cuenta: qué tipo de rubro, cuánto y desde qué mes. La
// carátula, las partes, el expediente y los nombres libres de cada rubro NO viajan: se escriben en
// la página del informe y mueren en el navegador.

export const CONCEPTOS = [
  { id: "credito", nombre: "Crédito laboral" },
  { id: "antiguedad", nombre: "Indemnización por antigüedad" },
  { id: "preaviso", nombre: "Indemnización sustitutiva de preaviso" },
  { id: "integracion", nombre: "Integración del mes de despido" },
  { id: "haberes", nombre: "Sueldo adeudado" },
  { id: "sac", nombre: "Aguinaldo (SAC)" },
  { id: "vacaciones", nombre: "Vacaciones no gozadas" },
  { id: "diferencias", nombre: "Diferencias salariales" },
  { id: "horas-extras", nombre: "Horas extras" },
  { id: "otro", nombre: "Otro rubro" },
] as const;

export type ConceptoId = (typeof CONCEPTOS)[number]["id"];

const IDS: readonly ConceptoId[] = CONCEPTOS.map((c) => c.id);

export type Rubro = { concepto: ConceptoId; monto: number; desde: Periodo };

export type Datos = {
  rubros: Rubro[];
  /** Mes del efectivo pago (o al que se quiere liquidar). */
  hasta: Periodo;
  /** Pacto de cuota litis, 0 a 20 (art. 277). */
  litis: number;
};

export const MAX_RUBROS = 12;
// Un tope que ningún crédito laboral real supera; arriba de esto es basura o un ataque.
const TOPE_MONTO = 100_000_000_000;
/** La calculadora deja elegir hasta 6 meses después del último IPC. Se tolera un poco más porque
 *  el tope se mide contra la serie del día en que se valida, no del día de la compra. */
export const MESES_PAGO_FUTURO = 12;

const PERIODO = /^\d{4}-(0[1-9]|1[0-2])$/;

function periodo(o: Record<string, unknown>, clave: string): Periodo | null {
  const v = Object.prototype.hasOwnProperty.call(o, clave) ? o[clave] : undefined;
  return typeof v === "string" && PERIODO.test(v) ? v : null;
}

export function nombreConcepto(id: ConceptoId): string {
  return CONCEPTOS.find((c) => c.id === id)?.nombre ?? "Crédito laboral";
}

function validar(raw: unknown): Datos | null {
  const o = objeto(raw);
  if (!o) return null;

  const hasta = periodo(o, "hasta");
  if (!hasta) return null;
  if (mesesEntre(PRIMER_PERIODO, hasta) < 0) return null;
  if (mesesEntre(hasta, sumarMeses(ULTIMO_PERIODO, MESES_PAGO_FUTURO)) < 0) return null;

  const rubrosRaw = Object.prototype.hasOwnProperty.call(o, "rubros") ? o.rubros : undefined;
  if (!Array.isArray(rubrosRaw) || rubrosRaw.length === 0 || rubrosRaw.length > MAX_RUBROS) return null;
  const rubros: Rubro[] = [];
  for (const r of rubrosRaw) {
    const ro = objeto(r);
    if (!ro) return null;
    const concepto = opcion(ro, "concepto", IDS);
    const monto = numero(ro, "monto", 0, TOPE_MONTO);
    const desde = periodo(ro, "desde");
    if (!concepto || monto === null || monto <= 0 || !desde) return null;
    if (!existePeriodo(desde) || mesesEntre(desde, hasta) < 0) return null;
    rubros.push({ concepto, monto, desde });
  }

  let litis = 0;
  if (Object.prototype.hasOwnProperty.call(o, "litis")) {
    const l = numero(o, "litis", 0, 20);
    if (l === null) return null;
    litis = l;
  }

  return { rubros, hasta, litis };
}

export const prefill: Prefill<Datos> = { validar };

/** Lo que la calculadora deja para el informe: su único rubro, leído como lo lee ella
 *  (`Number(x) || 0`). La cuota litis se acota igual que en el motor, que la topea en 0–20: así
 *  un «25» escrito da en el informe el mismo número que en pantalla. */
export function datosDeLaCalculadora(estado: {
  monto: string;
  desde: Periodo;
  hasta: Periodo;
  cuotaLitisPct: string;
}): Datos {
  return {
    rubros: [{ concepto: "credito", monto: Number(estado.monto) || 0, desde: estado.desde }],
    hasta: estado.hasta,
    litis: Math.min(Math.max(Number(estado.cuotaLitisPct) || 0, 0), 20),
  };
}
