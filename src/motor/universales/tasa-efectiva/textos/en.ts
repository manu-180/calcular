import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosEn: TextosUi<UiTasaEfectiva> = {
  slug: "apr-to-apy",
  ui: () => ({
    direccion: "Which rate do you have?",
    nominalAEfectiva: "Nominal rate, APR (convert to APY)",
    efectivaANominal: "Effective rate, APY (convert to APR)",
    tasa: "Annual rate (%)",
    tasaAyuda: "Enter it exactly as it appears on the offer or contract.",
    capitalizacion: "Compounding",
    capitalizacionAyuda: "How often interest is added to the balance. Loans and credit cards usually compound monthly.",
    mensual: "Monthly (12 times a year)",
    trimestral: "Quarterly (4 times a year)",
    semestral: "Semiannually (2 times a year)",
    diaria: "Daily (365 times a year)",
    efectiva: "Effective annual rate (APY)",
    nominal: "Nominal annual rate (APR)",
    periodica: "Rate per period",
    errorNegativa: "The rate can't be negative. Enter a number from 0 up.",
    observacionDiferencia: (puntos) => `The effective rate is ${puntos} points higher than the nominal rate because interest earns interest too.`,
  }),
};
