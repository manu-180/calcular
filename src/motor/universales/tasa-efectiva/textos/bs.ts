import { formaBs } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

// „za 1 procentualni bod”, „za 2 procentualna boda”, „za 5 procentualnih bodova”. Bodovi stižu formatirani
// (bs: „0,68”), pa se prije odabira oblika pretvaraju u broj.
const bodova = (puntos: string) =>
  formaBs(Number(puntos.replace(/[.\s]/g, "").replace(",", ".")), "procentualni bod", "procentualna boda", "procentualnih bodova");

export const textosBs: TextosUi<UiTasaEfectiva> = {
  slug: "efektivna-kamatna-stopa",
  ui: () => ({
    direccion: "Koju stopu imate?",
    nominalAEfectiva: "Nominalnu godišnju stopu (preračunati u efektivnu)",
    efectivaANominal: "Efektivnu stopu (preračunati u nominalnu)",
    tasa: "Godišnja stopa (%)",
    tasaAyuda: "Unesite je tačno onako kako piše u ponudi ili u ugovoru.",
    capitalizacion: "Pripis kamate",
    capitalizacionAyuda: "Koliko se često kamata pripisuje stanju. Kod kredita i kreditnih kartica obično svakog mjeseca.",
    mensual: "Mjesečno (12 puta godišnje)",
    trimestral: "Tromjesečno (4 puta godišnje)",
    semestral: "Polugodišnje (2 puta godišnje)",
    diaria: "Dnevno (365 puta godišnje)",
    efectiva: "Efektivna godišnja stopa",
    nominal: "Nominalna godišnja stopa",
    periodica: "Stopa za period",
    errorNegativa: "Stopa ne može biti negativna. Unesite broj od 0 naviše.",
    observacionDiferencia: (puntos) => `Efektivna stopa viša je od nominalne za ${puntos} ${bodova(puntos)} jer se kamata računa i na pripisanu kamatu.`,
  }),
};
