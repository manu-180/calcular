import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosEt: TextosUi<UiDividirGastos> = {
  slug: "kulude-jagamine",
  ui: () => ({
    persona: (n) => `Inimene ${n}`,
    personaAyuda: "Sisesta, kui palju igaüks on maksnud. Kui keegi pole midagi maksnud, aga osaleb kuludes, sisesta 0. Jäta ülejäänud väljad tühjaks.",
    total: "Kulud kokku",
    personas: "Inimesi",
    cuota: "Osa inimese kohta",
    transferencias: "Tasaarvelduseks vajalikud maksed",
    tabla: "Kes maksab kellele",
    colDe: "Maksja",
    colPara: "Saaja",
    colMonto: "Summa",
    errorPocas: "Kulude jagamiseks on vaja vähemalt kahte inimest.",
    aMano: "Olete tasa. Kõik on maksnud sama palju.",
  }),
};
