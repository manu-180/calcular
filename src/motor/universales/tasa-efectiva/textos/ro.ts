import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosRo: TextosUi<UiTasaEfectiva> = {
  slug: "calculator-dae",
  ui: () => ({
    direccion: "Ce dobândă aveți?",
    nominalAEfectiva: "Dobânda nominală (transformați în dobânda efectivă)",
    efectivaANominal: "Dobânda efectivă (transformați în dobânda nominală)",
    tasa: "Dobânda anuală (%)",
    tasaAyuda: "Introduceți-o exact cum apare în ofertă sau în contract.",
    capitalizacion: "Capitalizare",
    capitalizacionAyuda: "Cât de des se adaugă dobânda la sold. La credite și carduri, capitalizarea este de obicei lunară.",
    mensual: "Lunară (de 12 ori pe an)",
    trimestral: "Trimestrială (de 4 ori pe an)",
    semestral: "Semestrială (de 2 ori pe an)",
    diaria: "Zilnică (de 365 de ori pe an)",
    efectiva: "Dobânda anuală efectivă",
    nominal: "Dobânda anuală nominală",
    periodica: "Dobânda pe perioadă",
    errorNegativa: "Dobânda nu poate fi negativă. Introduceți un număr de la 0 în sus.",
    observacionDiferencia: (puntos) => `Dobânda efectivă este cu ${puntos} puncte procentuale mai mare decât cea nominală, pentru că dobânda produce la rândul ei dobândă.`,
  }),
};
