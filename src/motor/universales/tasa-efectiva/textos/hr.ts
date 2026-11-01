import { formaHr } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

// „za 1 postotni bod”, „za 2 postotna boda”, „za 5 postotnih bodova”. Bodovi stižu formatirani
// (hr: „0,68”), pa se prije odabira oblika pretvaraju u broj.
const bodova = (puntos: string) =>
  formaHr(Number(puntos.replace(/[.\s]/g, "").replace(",", ".")), "postotni bod", "postotna boda", "postotnih bodova");

export const textosHr: TextosUi<UiTasaEfectiva> = {
  slug: "efektivna-kamatna-stopa",
  ui: () => ({
    direccion: "Koju stopu imate?",
    nominalAEfectiva: "Nominalnu godišnju stopu (preračunati u efektivnu)",
    efectivaANominal: "Efektivnu stopu (preračunati u nominalnu)",
    tasa: "Godišnja stopa (%)",
    tasaAyuda: "Unesite je točno onako kako piše u ponudi ili u ugovoru.",
    capitalizacion: "Pripis kamate",
    capitalizacionAyuda: "Koliko se često kamata pripisuje stanju. Kod kredita i kreditnih kartica obično svakog mjeseca.",
    mensual: "Mjesečno (12 puta godišnje)",
    trimestral: "Tromjesečno (4 puta godišnje)",
    semestral: "Polugodišnje (2 puta godišnje)",
    diaria: "Dnevno (365 puta godišnje)",
    efectiva: "Efektivna godišnja stopa",
    nominal: "Nominalna godišnja stopa",
    periodica: "Stopa za razdoblje",
    errorNegativa: "Stopa ne može biti negativna. Unesite broj od 0 naviše.",
    observacionDiferencia: (puntos) => `Efektivna stopa viša je od nominalne za ${puntos} ${bodova(puntos)} jer se kamata računa i na pripisanu kamatu.`,
  }),
};
