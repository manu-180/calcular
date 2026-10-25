import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "litri" : "galoni");

export const textosSr: TextosUi<UiPintura> = {
  slug: "potrosnja-boje",
  ui: () => ({
    modo: "Koje mere znate?",
    modoMedidas: "Dužinu i visinu zidova",
    modoSuperficie: "Ukupnu površinu",
    largo: (u) => `Ukupna dužina zidova (${u})`,
    largoAyuda: "Svi zidovi koje krečite, zajedno. Za prostoriju je to obim.",
    alto: (u) => `Visina zidova (${u})`,
    superficie: (u) => `Površina za krečenje (${u})`,
    aberturas: (u) => `Vrata i prozori koji se oduzimaju (${u})`,
    aberturasAyuda: "Vrata imaju oko 2 m², a običan prozor 1 do 2 m².",
    manos: "Broj slojeva",
    rendimiento: (u) => `Izdašnost boje (${u})`,
    rendimientoAyuda: "Piše na pakovanju: koliko površine pokriva jedan sloj. Ako je ne znate, ostavite predloženu vrednost.",
    recomendado: (u) => `Boje za kupovinu (${volumen(u)})`,
    recomendadoAyuda: "Uključuje 10 % više za popravke i ono što ostane u valjku.",
    necesario: (u) => `Tačna količina (${volumen(u)})`,
    neta: (u) => `Površina za krečenje (${u})`,
    errorMedidas: "Popunite dužinu i visinu zidova.",
    errorSuperficie: "Popunite površinu za krečenje.",
    errorAberturas: "Vrata i prozori ne mogu zauzimati ceo zid.",
    errorRendimiento: "Izdašnost mora biti veća od 0.",
  }),
};
