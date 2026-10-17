import { textosConSuiza } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiCalorias } from "../definicion";

const textos: TextosUi<UiCalorias> = {
  slug: "kalorienbedarf",
  ui: () => ({
    sexo: "Geschlecht",
    mujer: "Weiblich",
    hombre: "Männlich",
    edad: "Alter (Jahre)",
    peso: (u) => `Gewicht (${u})`,
    altura: (u) => `Körpergröße (${u})`,
    pies: "Körpergröße: Fuß (ft)",
    pulgadas: "Körpergröße: Zoll (in)",
    actividad: "Aktivität",
    sedentaria: "Kaum Bewegung",
    ligera: "Leicht (Sport an 1 bis 3 Tagen pro Woche)",
    moderada: "Moderat (Sport an 3 bis 5 Tagen pro Woche)",
    alta: "Hoch (Sport an 6 oder 7 Tagen pro Woche)",
    muyAlta: "Sehr hoch (hartes Training oder körperliche Arbeit)",
    objetivo: "Ziel",
    mantener: "Gewicht halten",
    bajar: "Langsam abnehmen",
    subir: "Langsam zunehmen",
    basal: "Grundumsatz (kcal pro Tag)",
    basalAyuda: "Was Ihr Körper in völliger Ruhe verbraucht.",
    mantenimiento: "Kalorienbedarf zum Halten des Gewichts (kcal pro Tag)",
    calObjetivo: "Kalorien für Ihr Ziel (kcal pro Tag)",
    calObjetivoAyuda: "Eine moderate Änderung: 500 kcal weniger pro Tag zum Abnehmen, 300 mehr zum Zunehmen.",
    errorEdad: "Die Formel ist für Menschen von 15 bis 100 Jahren gedacht.",
    errorPeso: "Das Gewicht muss über 0 liegen.",
    errorAltura: "Die Körpergröße muss über 0 liegen.",
    notaMinimo: (kcal) => `Beim Abnehmen geht der Wert nicht unter ${kcal} kcal pro Tag. Wer weniger essen möchte, sollte das ärztlich begleiten lassen.`,
    aviso: "Das ist eine Schätzung nach der Mifflin-St.-Jeor-Formel. Jeder Körper ist anders. Sie ersetzt keine Beratung durch Ärztin, Arzt oder Ernährungsfachkraft.",
  }),
};

export const textosDe = textosConSuiza(textos);
