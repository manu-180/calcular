import { aplicarEscalaMarginal, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export const OPCIONES_ESTADO_CIVIL = [
  { valor: "single", etiqueta: "Single" },
  { valor: "mfj", etiqueta: "Married filing jointly" },
  { valor: "mfs", etiqueta: "Married filing separately" },
  { valor: "hoh", etiqueta: "Head of household" },
] as const;

export type EstadoCivil = (typeof OPCIONES_ESTADO_CIVIL)[number]["valor"];

export const ESCALAS = {
  "us.tax-brackets-single": "escala",
  "us.tax-brackets-mfj": "escala",
  "us.tax-brackets-mfs": "escala",
  "us.tax-brackets-hoh": "escala",
} as const;

export type ValoresEscalas = { readonly [K in keyof typeof ESCALAS]: readonly FilaEscala[] };

export function estadoValido(estado: string): EstadoCivil {
  if (!OPCIONES_ESTADO_CIVIL.some((o) => o.valor === estado)) throw new ErrorEntrada({ codigo: "opcion-invalida" });
  return estado as EstadoCivil;
}

export function escalaDe(valores: ValoresEscalas, estado: EstadoCivil): readonly FilaEscala[] {
  return valores[`us.tax-brackets-${estado}`];
}

export function impuestoFederal(escala: readonly FilaEscala[], gravable: number): number {
  return aplicarEscalaMarginal(escala, Math.max(0, gravable));
}

export function tasaMarginal(escala: readonly FilaEscala[], gravable: number): number {
  let tasa = escala[0].tasa;
  for (const f of escala) if (gravable > f.desde) tasa = f.tasa;
  return tasa;
}

// Los mapas de dos claves del IRS distinguen solo la declaración conjunta del resto.
export function claveConjunta(estado: EstadoCivil): "mfj" | "other" {
  return estado === "mfj" ? "mfj" : "other";
}

export function maxPersonas(estado: EstadoCivil): number {
  return estado === "mfj" ? 2 : 1;
}

export function deduccionEstandar(
  estandar: Readonly<Record<string, number>>,
  adicional: Readonly<Record<string, number>>,
  estado: EstadoCivil,
  casillas: number,
): number {
  const porCasilla = estado === "single" || estado === "hoh" ? enMapa(adicional, "unmarried") : enMapa(adicional, "married");
  return enMapa(estandar, estado) + casillas * porCasilla;
}

// Schedule 1-A, parte V: cada persona elegible resta el 6 % del MAGI que pasa el umbral de sus 6000.
// Con declaración separada no hay deducción.
export function deduccionSenior(
  monto: number,
  umbrales: Readonly<Record<string, number>>,
  tasa: number,
  estado: EstadoCivil,
  magi: number,
  personas: number,
): { porPersona: number; total: number } {
  if (estado === "mfs" || personas <= 0) return { porPersona: 0, total: 0 };
  const exceso = Math.max(0, magi - enMapa(umbrales, claveConjunta(estado)));
  const porPersona = Math.max(0, monto - (exceso * tasa) / 100);
  return { porPersona, total: porPersona * personas };
}

// Schedule 1-A, partes II y III: se resta un monto fijo por cada 1000 enteros de MAGI sobre el
// umbral (se redondea hacia abajo: 1500 de exceso cuenta como un solo bloque de 1000).
export function recorteObbba(magi: number, umbral: number, porBloque: number): number {
  return Math.floor(Math.max(0, magi - umbral) / 1000) * porBloque;
}

export function personasValidas(personas: number, estado: EstadoCivil, campo: string): number {
  if (personas > maxPersonas(estado)) {
    throw new ErrorEntrada(estado === "mfj" ? "A joint return has two people at most." : "Only a joint return can count two people.", campo);
  }
  return personas;
}
