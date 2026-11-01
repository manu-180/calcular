import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosEt: TextosUi<UiMargenDeGanancia> = {
  slug: "marginaali-kalkulaator",
  ui: () => ({
    modo: "Mida tahad arvutada?",
    modoPrecio: "Katte, kui tead ostu- ja müügihinda",
    modoMargen: "Müügihinna soovitud katte jaoks",
    modoMarkup: "Müügihinna soovitud juurdehindluse jaoks",
    costo: "Ostuhind ühiku kohta",
    costoAyuda: "Mida ühe ühiku ostmine või valmistamine maksab, käibemaksuta.",
    precio: "Müügihind",
    precioAyuda: "Ainult siis, kui arvutad katet. Käibemaksuta.",
    objetivo: "Soovitud kate või juurdehindlus (%)",
    objetivoAyuda: "Ainult siis, kui arvutad müügihinda.",
    precioResultado: "Müügihind",
    margen: "Kate",
    margenAyuda: "Kasum protsentides müügihinnast.",
    markup: "Juurdehindlus",
    markupAyuda: "Kasum protsentides ostuhinnast.",
    ganancia: "Kasum ühiku kohta",
    errorCosto: "Sisesta ühe ühiku ostuhind.",
    errorFaltaPrecio: "Sisesta müügihind, et katet arvutada.",
    errorFaltaObjetivo: "Sisesta kate või juurdehindlus, mida soovid saavutada.",
    errorMargen100: "Kate peab olema alla 100%. Muidu oleks kogu hind kasum ilma ühegi kuluta.",
    observacionPerdida: "Selle hinnaga müüd alla ostuhinna ja kaotad iga müügiga raha.",
  }),
};
