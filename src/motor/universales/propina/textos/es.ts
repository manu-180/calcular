import { segunTrato, type TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosEs: TextosUi<UiPropina> = {
  slug: "propina",
  ui: (trato) => ({
    cuenta: "Total de la cuenta",
    porcentaje: "Propina (%)",
    porcentajeAyuda: segunTrato(trato, {
      tu: "Lo habitual es entre 10 % y 15 %, pero depende del lugar y de ti.",
      usted: "Lo habitual es entre 10 % y 15 %, pero depende del lugar y de usted.",
      vos: "Lo habitual es entre 10 % y 15 %, pero depende del lugar y de vos.",
    }),
    personas: "Cuántas personas pagan",
    redondear: "Redondear lo de cada persona hacia arriba",
    redondearAyuda: "Para que cada uno ponga un número entero. Lo que sobra queda de propina.",
    propina: "Propina",
    total: "Total con propina",
    porPersona: "Paga cada persona",
    propinaEfectiva: "Propina con el redondeo",
    errorPersonas: "Tiene que pagar al menos una persona.",
    observacionRedondeo: (efectiva) => `Con el redondeo, la propina queda en ${efectiva} % de la cuenta.`,
  }),
};
