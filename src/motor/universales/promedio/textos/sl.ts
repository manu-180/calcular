import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosSl: TextosUi<UiPromedio> = {
  slug: "izracun-povprecja",
  ui: () => ({
    nota: (n) => `Ocena ${n}`,
    notaAyuda: "Vnesite vsako oceno ali vrednost z njeno utežjo. Vrstice, ki jih ne uporabljate, pustite prazne.",
    peso: (n) => `Utež ${n}`,
    pesoAyuda: "Lahko je odstotek, število točk (ECTS) ali kolikokrat se vrednost šteje. Brez uteži imajo vse vrednosti enako težo.",
    ponderado: "Tehtano povprečje",
    simple: "Navadno povprečje",
    cantidad: "Število vrednosti",
    sumaPesos: "Vsota uteži",
    errorSinNotas: "Vnesite vsaj eno vrednost.",
    errorFaltaPeso: "Tej vrednosti manjka utež. Če uporabljate uteži, jih vnesite za vse vrednosti.",
    errorFaltaNota: "Tej uteži manjka vrednost. Dopolnite vrednost ali izbrišite utež.",
    errorPesosCero: "Vsota uteži je 0: vsaj ena utež mora biti večja od nič.",
    sinPesos: "Brez uteži je tehtano povprečje enako navadnemu.",
  }),
};
