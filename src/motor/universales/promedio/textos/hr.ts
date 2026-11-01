import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosHr: TextosUi<UiPromedio> = {
  slug: "kalkulator-prosjeka",
  ui: () => ({
    nota: (n) => `Ocjena ${n}`,
    notaAyuda: "Unesite svaku ocjenu ili vrijednost s njezinom težinom. Retke koje ne koristite ostavite prazne.",
    peso: (n) => `Težina ${n}`,
    pesoAyuda: "Može biti postotak, broj bodova (ECTS) ili koliko se puta vrijednost računa. Bez težina sve vrijednosti vrijede jednako.",
    ponderado: "Ponderirani prosjek",
    simple: "Obični prosjek",
    cantidad: "Broj vrijednosti",
    sumaPesos: "Zbroj težina",
    errorSinNotas: "Unesite barem jednu vrijednost.",
    errorFaltaPeso: "Ovoj vrijednosti nedostaje težina. Ako koristite težine, unesite ih za sve vrijednosti.",
    errorFaltaNota: "Ovoj težini nedostaje vrijednost. Dopunite vrijednost ili obrišite težinu.",
    errorPesosCero: "Zbroj težina je 0: barem jedna težina mora biti veća od nule.",
    sinPesos: "Bez težina ponderirani prosjek jednak je običnom.",
  }),
};
