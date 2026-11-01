import { formaSl } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

// „za 1 odstotno točko“, „za 2 odstotni točki“, „za 3 odstotne točke“, „za 5 odstotnih točk“. Točke
// pridejo oblikovane (sl: „0,68“), zato se pred izbiro oblike pretvorijo v število.
const tock = (puntos: string) =>
  formaSl(Number(puntos.replace(/[.\s]/g, "").replace(",", ".")), "odstotno točko", "odstotni točki", "odstotne točke", "odstotnih točk");

export const textosSl: TextosUi<UiTasaEfectiva> = {
  slug: "efektivna-obrestna-mera",
  ui: () => ({
    direccion: "Katero obrestno mero imate?",
    nominalAEfectiva: "Nominalno letno mero (preračunaj v efektivno)",
    efectivaANominal: "Efektivno mero (preračunaj v nominalno)",
    tasa: "Letna obrestna mera (%)",
    tasaAyuda: "Vnesite jo točno tako, kot piše v ponudbi ali pogodbi.",
    capitalizacion: "Pripis obresti",
    capitalizacionAyuda: "Kako pogosto se obresti pripišejo stanju. Pri kreditih in kreditnih karticah običajno vsak mesec.",
    mensual: "Mesečno (12-krat na leto)",
    trimestral: "Četrtletno (4-krat na leto)",
    semestral: "Polletno (2-krat na leto)",
    diaria: "Dnevno (365-krat na leto)",
    efectiva: "Efektivna letna obrestna mera",
    nominal: "Nominalna letna obrestna mera",
    periodica: "Obrestna mera za obdobje",
    errorNegativa: "Obrestna mera ne more biti negativna. Vnesite število od 0 navzgor.",
    observacionDiferencia: (puntos) => `Efektivna mera je višja od nominalne za ${puntos} ${tock(puntos)}, ker se obresti računajo tudi na pripisane obresti.`,
  }),
};
