import { aplicarEscalaMarginal, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import type { ValoresDe } from "@/motor/tipos";

export const REQUIERE_MISTHOU = {
  "cy.eisfora-ka-misthotou": "numero",
  "cy.anotato-orio-ka": "numero",
  "cy.eisfores-gesy": "mapa",
  "cy.anotato-orio-gesy": "numero",
  "cy.klimaka-forou": "escala",
  "cy.orio-ekptosis-eisforon": "numero",
  "cy.ekptosi-teknou": "mapa",
} as const;

export type ValoresMisthou = ValoresDe<typeof REQUIERE_MISTHOU>;

export const OPCIONES_MISTHON = [
  { valor: "12", etiqueta: "12 μισθοί" },
  { valor: "13", etiqueta: "13 μισθοί (με 13ο μισθό)" },
] as const;

export function elegxosTeknon(tekna: number) {
  if (tekna < 0 || tekna > 15) throw new ErrorEntrada("Τα εξαρτώμενα τέκνα πρέπει να είναι από 0 έως 15.", "tekna");
}

// Primero 1.000, segundo 1.250, tercero y siguientes 1.500 (guía del Τμήμα Φορολογίας, 2026). El
// monoparental la recibe doble.
export function ekptosiTeknon(v: Pick<ValoresMisthou, "cy.ekptosi-teknou">, tekna: number, monogoneas: boolean): number {
  let s = 0;
  for (let i = 1; i <= tekna; i++) s += enMapa(v["cy.ekptosi-teknou"], String(Math.min(i, 3)));
  return monogoneas ? s * 2 : s;
}

export interface Misthodosia {
  kaMina: number;
  gesyMina: number;
  forosMina: number;
  katharaMina: number;
  miktaEtous: number;
  kaEtous: number;
  gesyEtous: number;
  ekptosiEisforon: number;
  ekptosiTeknon: number;
  forologiteo: number;
  forosEtous: number;
  katharaEtous: number;
  plafonKa: boolean;
}

// El 13.º se cotiza junto con el sueldo del mes en que se paga y solo hasta el tope mensual
// (Οδηγός Εργοδότη). El impuesto anual se retiene repartido entre los sueldos del año.
export function misthodosia(
  miktos: number,
  misthoi: number,
  tekna: number,
  monogoneas: boolean,
  v: ValoresMisthou,
  redondear: (n: number) => number,
): Misthodosia {
  const orio = v["cy.anotato-orio-ka"];
  const syntKa = v["cy.eisfora-ka-misthotou"];
  const syntGesy = enMapa(v["cy.eisfores-gesy"], "misthotos");
  const kaMina = redondear(porcentaje(Math.min(miktos, orio), syntKa));
  const ka13 = misthoi > 12 ? redondear(porcentaje(Math.min(miktos, Math.max(0, orio - miktos)), syntKa)) : 0;
  const miktaEtous = redondear(miktos * misthoi);
  const kaEtous = redondear(kaMina * 12 + ka13);
  const gesyEtous = redondear(porcentaje(Math.min(miktaEtous, v["cy.anotato-orio-gesy"]), syntGesy));
  const gesyMina = redondear(gesyEtous / misthoi);
  const ekptosiEisforon = redondear(Math.min(kaEtous + gesyEtous, porcentaje(miktaEtous, v["cy.orio-ekptosis-eisforon"])));
  const tekn = ekptosiTeknon(v, tekna, monogoneas);
  const forologiteo = redondear(Math.max(0, miktaEtous - ekptosiEisforon - tekn));
  const forosEtous = redondear(aplicarEscalaMarginal(v["cy.klimaka-forou"], forologiteo));
  const forosMina = redondear(forosEtous / misthoi);
  const katharaMina = redondear(miktos - kaMina - gesyMina - forosMina);
  const katharaEtous = redondear(miktaEtous - kaEtous - gesyEtous - forosEtous);
  return {
    kaMina,
    gesyMina,
    forosMina,
    katharaMina,
    miktaEtous,
    kaEtous,
    gesyEtous,
    ekptosiEisforon,
    ekptosiTeknon: tekn,
    forologiteo,
    forosEtous,
    katharaEtous,
    plafonKa: miktos > orio,
  };
}
