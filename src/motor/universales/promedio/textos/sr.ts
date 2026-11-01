import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosSr: TextosUi<UiPromedio> = {
  slug: "kalkulator-proseka",
  ui: () => ({
    nota: (n) => `Ocena ${n}`,
    notaAyuda: "Unesite svaku ocenu ili vrednost sa njenom težinom. Redove koje ne koristite ostavite prazne.",
    peso: (n) => `Težina ${n}`,
    pesoAyuda: "Može biti procenat, broj bodova (ESPB ili ECTS) ili koliko puta se vrednost računa. Bez težina sve vrednosti vrede isto.",
    ponderado: "Ponderisani prosek",
    simple: "Običan prosek",
    cantidad: "Broj vrednosti",
    sumaPesos: "Zbir težina",
    errorSinNotas: "Unesite najmanje jednu vrednost.",
    errorFaltaPeso: "Ovoj vrednosti nedostaje težina. Ako koristite težine, unesite ih za sve vrednosti.",
    errorFaltaNota: "Ovoj težini nedostaje vrednost. Dopunite vrednost ili obrišite težinu.",
    errorPesosCero: "Zbir težina je 0: bar jedna težina mora biti veća od nule.",
    sinPesos: "Bez težina ponderisani prosek je isti kao običan.",
  }),
};
