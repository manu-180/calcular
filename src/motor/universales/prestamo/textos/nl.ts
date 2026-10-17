import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosNl: TextosUi<UiPrestamo> = {
  slug: "lening-berekenen",
  ui: () => ({
    monto: "Leenbedrag",
    tasa: "Rente per jaar (%)",
    tasaAyuda: "De nominale jaarrente uit de offerte. Kosten zitten daar niet in.",
    meses: "Looptijd in maanden",
    extra: "Extra aflossen per maand (niet verplicht)",
    extraAyuda: "Wat je elke maand extra wilt betalen om sneller klaar te zijn. Dat gaat helemaal van je schuld af.",
    cuota: "Maandbedrag",
    intereses: "Totale rente",
    total: "Totaal betaald",
    mesesReales: "Maanden tot je klaar bent met extra aflossen",
    ahorro: "Rente die je bespaart",
    tabla: "Aflossingsschema",
    colMes: "Maand",
    colPago: "Termijn",
    colInteres: "Rente",
    colCapital: "Aflossing",
    colSaldo: "Restschuld",
    errorMonto: "Vul een bedrag in dat groter is dan nul.",
    observacionCostos: "In het maandbedrag zitten geen verzekeringen, afsluitkosten of belastingen die de geldverstrekker kan rekenen. Vraag naar de totale kosten voordat je tekent.",
    observacionExtra: (meses, ahorro) => `Met extra aflossen ben je in ${meses} maanden klaar en bespaar je ${ahorro} aan rente.`,
  }),
};
