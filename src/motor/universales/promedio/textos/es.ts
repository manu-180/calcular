import { conVariantes } from "../../comun/locales";
import { segunTrato, type TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

const base: TextosUi<UiPromedio> = {
  slug: "promedio-ponderado",
  ui: (trato) => ({
    nota: (n) => `Nota ${n}`,
    notaAyuda: segunTrato(trato, {
      tu: "Escribe cada nota con su peso. Deja vacías las que no uses.",
      usted: "Escriba cada nota con su peso. Deje vacías las que no use.",
      vos: "Escribí cada nota con su peso. Dejá vacías las que no uses.",
    }),
    peso: (n) => `Peso ${n}`,
    pesoAyuda: "Puede ser un porcentaje, créditos o las veces que cuenta. Sin pesos, todas valen lo mismo.",
    ponderado: "Promedio ponderado",
    simple: "Promedio simple",
    cantidad: "Notas",
    sumaPesos: "Suma de los pesos",
    errorSinNotas: "Hace falta al menos una nota.",
    errorFaltaPeso: segunTrato(trato, {
      tu: "Falta el peso de esta nota. Si usas pesos, ponlos en todas.",
      usted: "Falta el peso de esta nota. Si usa pesos, póngalos en todas.",
      vos: "Falta el peso de esta nota. Si usás pesos, ponelos en todas.",
    }),
    errorFaltaNota: segunTrato(trato, {
      tu: "Este peso no tiene nota. Completa la nota o borra el peso.",
      usted: "Este peso no tiene nota. Complete la nota o borre el peso.",
      vos: "Este peso no tiene nota. Completá la nota o borrá el peso.",
    }),
    errorPesosCero: "Los pesos suman 0: al menos uno tiene que ser mayor que cero.",
    sinPesos: "Sin pesos, el promedio ponderado es igual al simple.",
  }),
};

const espana = (): Partial<UiPromedio> => ({
  ponderado: "Media ponderada",
  simple: "Media simple",
  sinPesos: "Sin pesos, la media ponderada es igual a la simple.",
});

export const textosEs = conVariantes(base, { "es-ES": espana });
