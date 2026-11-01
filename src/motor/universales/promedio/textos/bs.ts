import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosBs: TextosUi<UiPromedio> = {
  slug: "kalkulator-prosjeka",
  ui: () => ({
    nota: (n) => `Ocjena ${n}`,
    notaAyuda: "Unesite svaku ocjenu ili vrijednost s njezinom težinom. Redove koje ne koristite ostavite prazne.",
    peso: (n) => `Težina ${n}`,
    pesoAyuda: "Može biti procenat, broj bodova (ECTS) ili koliko se puta vrijednost računa. Bez težina sve vrijednosti vrijede jednako.",
    ponderado: "Ponderirani prosjek",
    simple: "Obični prosjek",
    cantidad: "Broj vrijednosti",
    sumaPesos: "Zbir težina",
    errorSinNotas: "Unesite barem jednu vrijednost.",
    errorFaltaPeso: "Ovoj vrijednosti nedostaje težina. Ako koristite težine, unesite ih za sve vrijednosti.",
    errorFaltaNota: "Ovoj težini nedostaje vrijednost. Dopunite vrijednost ili obrišite težinu.",
    errorPesosCero: "Zbir težina je 0: barem jedna težina mora biti veća od nule.",
    sinPesos: "Bez težina ponderirani prosjek jednak je običnom.",
  }),
};
