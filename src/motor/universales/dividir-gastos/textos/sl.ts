import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosSl: TextosUi<UiDividirGastos> = {
  slug: "delitev-stroskov",
  ui: () => ({
    persona: (n) => `Oseba ${n}`,
    personaAyuda: "Vnesite, koliko je plačal vsak. Če kdo ni plačal ničesar, a si deli strošek, vnesite 0. Preostala polja pustite prazna.",
    total: "Skupni strošek",
    personas: "Število oseb",
    cuota: "Delež na osebo",
    transferencias: "Nakazila za poravnavo",
    tabla: "Kdo komu plača",
    colDe: "Plača",
    colPara: "Prejme",
    colMonto: "Znesek",
    errorPocas: "Da bi lahko strošek razdelili, vnesite vsaj dve osebi.",
    aMano: "Nihče nikomur ničesar ne dolguje: vsi so plačali enako.",
  }),
};
