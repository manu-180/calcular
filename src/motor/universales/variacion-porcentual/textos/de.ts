import { textosConSuiza } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

const textos: TextosUi<UiVariacion> = {
  slug: "prozentuale-veraenderung",
  ui: () => ({
    inicial: "Alter Wert",
    final: "Neuer Wert",
    variacion: "Prozentuale Veränderung",
    diferencia: "Differenz",
    vuelta: "Zurück zum alten Wert",
    vueltaAyuda: "Um wie viel Prozent sich der neue Wert ändern müsste, damit er wieder beim alten liegt.",
    errorInicialCero: "Der alte Wert darf nicht 0 sein. Von null aus gibt es keine prozentuale Veränderung.",
    subio: (p) => `Der Wert ist um ${p} % gestiegen.`,
    bajo: (p) => `Der Wert ist um ${p} % gesunken.`,
    igual: "Keine Veränderung. Beide Werte sind gleich.",
  }),
};

export const textosDe = textosConSuiza(textos);
