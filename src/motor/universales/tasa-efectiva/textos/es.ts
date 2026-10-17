import { conVariantes } from "../../comun/locales";
import { segunTrato, type TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

const base: TextosUi<UiTasaEfectiva> = {
  slug: "tasa-efectiva-anual",
  ui: (trato) => ({
    direccion: segunTrato(trato, { tu: "¿Qué tasa tienes?", usted: "¿Qué tasa tiene?", vos: "¿Qué tasa tenés?" }),
    nominalAEfectiva: "Nominal anual (pasar a efectiva)",
    efectivaANominal: "Efectiva anual (pasar a nominal)",
    tasa: "Tasa anual (%)",
    tasaAyuda: segunTrato(trato, {
      tu: "Escríbela como figura en el contrato o en la oferta.",
      usted: "Escríbala como figura en el contrato o en la oferta.",
      vos: "Escribila como figura en el contrato o en la oferta.",
    }),
    capitalizacion: "Capitalización",
    capitalizacionAyuda: "Cada cuánto se suman los intereses al capital. En préstamos y tarjetas suele ser mensual.",
    mensual: "Mensual (12 veces al año)",
    trimestral: "Trimestral (4 veces al año)",
    semestral: "Semestral (2 veces al año)",
    diaria: "Diaria (365 veces al año)",
    efectiva: "Tasa efectiva anual",
    nominal: "Tasa nominal anual",
    periodica: "Tasa de cada período",
    errorNegativa: segunTrato(trato, {
      tu: "La tasa no puede ser negativa. Escribe un número desde 0.",
      usted: "La tasa no puede ser negativa. Escriba un número desde 0.",
      vos: "La tasa no puede ser negativa. Escribí un número desde 0.",
    }),
    observacionDiferencia: (puntos) =>
      `La efectiva es ${puntos} puntos más alta que la nominal porque los intereses también generan intereses.`,
  }),
};

const espana = (): Partial<UiTasaEfectiva> => ({
  direccion: "¿Qué tipo tienes?",
  nominalAEfectiva: "TIN, tipo nominal (pasar a TAE)",
  efectivaANominal: "TAE (pasar a TIN)",
  tasa: "Tipo de interés anual (%)",
  tasaAyuda: "Escríbelo como aparece en el contrato o en la oferta.",
  efectiva: "TAE",
  nominal: "TIN (tipo nominal anual)",
  periodica: "Tipo de cada periodo",
  errorNegativa: "El tipo de interés no puede ser negativo. Escribe un número desde 0.",
  observacionDiferencia: (puntos) => `La TAE es ${puntos} puntos más alta que el TIN porque los intereses también generan intereses.`,
});

export const textosEs = conVariantes(base, { "es-ES": espana });
