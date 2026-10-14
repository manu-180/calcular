import { segunTrato, type TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosEs: TextosUi<UiReglaDeTres> = {
  slug: "regla-de-tres",
  ui: (trato) => ({
    tipo: "Tipo de regla de tres",
    directa: "Directa (si A sube, B sube)",
    inversa: "Inversa (si A sube, B baja)",
    a: "A",
    aAyuda: segunTrato(trato, {
      tu: "Se lee así: A es a B como C es a X. Escribe A, B y C.",
      usted: "Se lee así: A es a B como C es a X. Escriba A, B y C.",
      vos: "Se lee así: A es a B como C es a X. Escribí A, B y C.",
    }),
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Ese valor no puede ser 0: la cuenta divide por él.",
    fraseDirecta: (a, b, c, x) => `Si ${a} es a ${b}, ${c} es a ${x}. Cuenta: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Si con ${a} da ${b}, con ${c} da ${x}. Cuenta: ${a} × ${b} ÷ ${c}.`,
  }),
};
