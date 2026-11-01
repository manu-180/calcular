import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosLv: TextosUi<UiInteresCompuesto> = {
  slug: "salikto-procentu-kalkulators",
  ui: () => ({
    capital: "Sākuma summa",
    aporte: "Ikmēneša iemaksa (nav obligāti)",
    aporteAyuda: "Cik pievienosiet katru mēnesi. Iemaksu ieskaita katra mēneša beigās.",
    tasa: "Procentu likme gadā (%)",
    anios: "Gadu skaits",
    capitalizacion: "Procentu kapitalizācija",
    anual: "Reizi gadā",
    semestral: "Reizi pusgadā",
    trimestral: "Reizi ceturksnī",
    mensual: "Reizi mēnesī",
    diaria: "Katru dienu",
    saldo: "Galīgā summa",
    aportado: "Kopā iemaksāts",
    intereses: "Saņemtie procenti",
    tabla: "Pieaugums pa gadiem",
    colAnio: "Gads",
    colAportado: "Iemaksas",
    colIntereses: "Procenti",
    colSaldo: "Summa gada beigās",
    errorSinDinero: "Ievadiet sākuma summu vai ikmēneša iemaksu.",
    observacionIntereses: (porcentaje) => `${porcentaje}% no galīgās summas veido procenti.`,
  }),
};
