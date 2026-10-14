import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosNl: TextosUi<UiIva> = {
  slug: "btw-berekenen",
  ui: () => ({
    operacion: "Wat wil je doen?",
    agregar: "Btw optellen bij een prijs exclusief btw",
    quitar: "Btw eruit halen bij een prijs inclusief btw",
    monto: "Prijs",
    montoAyuda: "Exclusief btw als je btw optelt, inclusief btw als je btw eruit haalt.",
    otraTasa: "Ander btw-tarief (%)",
    otraTasaAyuda: "Niet verplicht. Geldt voor je product een verlaagd tarief, vul dat dan hier in. Anders rekent de rekenhulp met het algemene tarief.",
    neto: "Prijs exclusief btw",
    impuesto: "Btw",
    total: "Prijs inclusief btw",
    tasaUsada: "Gebruikt tarief",
    errorTasa: "Dit btw-tarief klopt niet.",
  }),
};
