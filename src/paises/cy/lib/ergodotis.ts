import { enMapa, porcentaje } from "@/motor/calculo";
import type { ValoresDe } from "@/motor/tipos";

export const REQUIERE_EISFORON = {
  "cy.eisfora-ka-misthotou": "numero",
  "cy.eisfora-ka-ergodoti": "numero",
  "cy.anotato-orio-ka": "numero",
  "cy.eisfores-gesy": "mapa",
  "cy.anotato-orio-gesy": "numero",
  "cy.eisfores-tameion-ergodoti": "mapa",
} as const;

export type ValoresEisforon = ValoresDe<typeof REQUIERE_EISFORON>;

export interface Eisfores {
  adeies: number;
  kaMisthotou: number;
  gesyMisthotou: number;
  misthotou: number;
  kaErgodoti: number;
  gesyErgodoti: number;
  pleonasmos: number;
  anaptyxi: number;
  synochi: number;
  ergodoti: number;
  synolo: number;
}

// Οδηγός Εργοδότη: lo que el empleador paga al Κεντρικό Ταμείο Αδειών cuenta como sueldo para todos
// los demás fondos. Seguridad social, vacaciones, redundancia y desarrollo humano van hasta el tope;
// cohesión social, sin tope. El ΓεΣΥ tiene su propio tope anual (se pasa ya llevado al período).
export function eisfores(
  misthos: number,
  tameioAdeion: boolean,
  orioKa: number,
  orioGesy: number,
  v: ValoresEisforon,
  redondear: (n: number) => number,
): Eisfores {
  const t = v["cy.eisfores-tameion-ergodoti"];
  const adeies = tameioAdeion ? redondear(porcentaje(Math.min(misthos, orioKa), enMapa(t, "adeies"))) : 0;
  const olo = misthos + adeies;
  const vasi = Math.min(olo, orioKa);
  const vasiGesy = Math.min(olo, orioGesy);
  const kaMisthotou = redondear(porcentaje(vasi, v["cy.eisfora-ka-misthotou"]));
  const gesyMisthotou = redondear(porcentaje(vasiGesy, enMapa(v["cy.eisfores-gesy"], "misthotos")));
  const kaErgodoti = redondear(porcentaje(vasi, v["cy.eisfora-ka-ergodoti"]));
  const gesyErgodoti = redondear(porcentaje(vasiGesy, enMapa(v["cy.eisfores-gesy"], "ergodotis")));
  const pleonasmos = redondear(porcentaje(vasi, enMapa(t, "pleonasmos")));
  const anaptyxi = redondear(porcentaje(vasi, enMapa(t, "anaptyxi")));
  const synochi = redondear(porcentaje(olo, enMapa(t, "synochi")));
  const misthotou = redondear(kaMisthotou + gesyMisthotou);
  const ergodoti = redondear(kaErgodoti + gesyErgodoti + adeies + pleonasmos + anaptyxi + synochi);
  return { adeies, kaMisthotou, gesyMisthotou, misthotou, kaErgodoti, gesyErgodoti, pleonasmos, anaptyxi, synochi, ergodoti, synolo: redondear(misthotou + ergodoti) };
}

export function eisforesMina(misthos: number, tameioAdeion: boolean, v: ValoresEisforon, redondear: (n: number) => number): Eisfores {
  return eisfores(misthos, tameioAdeion, v["cy.anotato-orio-ka"], v["cy.anotato-orio-gesy"] / 12, v, redondear);
}
