import { formaSr } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

// «za 1 procentni poen», «za 2 procentna poena», «za 5 procentnih poena». Poeni stižu formatirani
// (sr-Latn: «0,68»), pa se pre izbora oblika pretvaraju u broj.
const poena = (puntos: string) =>
  formaSr(Number(puntos.replace(/[.\s]/g, "").replace(",", ".")), "procentni poen", "procentna poena", "procentnih poena");

export const textosSr: TextosUi<UiTasaEfectiva> = {
  slug: "efektivna-kamatna-stopa",
  ui: () => ({
    direccion: "Koju stopu imate?",
    nominalAEfectiva: "Nominalnu godišnju stopu (pretvoriti u efektivnu)",
    efectivaANominal: "Efektivnu stopu (pretvoriti u nominalnu)",
    tasa: "Godišnja stopa (%)",
    tasaAyuda: "Unesite je tačno onako kako piše u ponudi ili u ugovoru.",
    capitalizacion: "Pripisivanje kamate",
    capitalizacionAyuda: "Koliko često se kamata pripisuje stanju. Kod kredita i kreditnih kartica obično svakog meseca.",
    mensual: "Mesečno (12 puta godišnje)",
    trimestral: "Tromesečno (4 puta godišnje)",
    semestral: "Polugodišnje (2 puta godišnje)",
    diaria: "Dnevno (365 puta godišnje)",
    efectiva: "Efektivna godišnja stopa",
    nominal: "Nominalna godišnja stopa",
    periodica: "Stopa za period",
    errorNegativa: "Stopa ne može biti negativna. Unesite broj od 0 naviše.",
    observacionDiferencia: (puntos) => `Efektivna stopa je za ${puntos} ${poena(puntos)} viša od nominalne, jer se kamata obračunava i na pripisanu kamatu.`,
  }),
};
