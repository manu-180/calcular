import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "litre" : "galoni");

export const textosHr: TextosUi<UiPintura> = {
  slug: "potrosnja-boje",
  ui: () => ({
    modo: "Koje mjere znate?",
    modoMedidas: "Duljinu i visinu zidova",
    modoSuperficie: "Ukupnu površinu",
    largo: (u) => `Ukupna duljina zidova (${u})`,
    largoAyuda: "Svi zidovi koje bojite, zajedno. Za prostoriju je to opseg.",
    alto: (u) => `Visina zidova (${u})`,
    superficie: (u) => `Površina za bojanje (${u})`,
    aberturas: (u) => `Vrata i prozori koji se oduzimaju (${u})`,
    aberturasAyuda: "Vrata imaju oko 2 m², a običan prozor 1 do 2 m².",
    manos: "Broj slojeva",
    rendimiento: (u) => `Izdašnost boje (${u})`,
    rendimientoAyuda: "Piše na pakiranju: koliko površine pokriva jedan sloj. Ako je ne znate, ostavite predloženu vrijednost.",
    recomendado: (u) => `Boja za kupnju (${volumen(u)})`,
    recomendadoAyuda: "Uključuje 10 % više za popravke i ono što ostane na valjku.",
    necesario: (u) => `Točna količina (${volumen(u)})`,
    neta: (u) => `Površina za bojanje (${u})`,
    errorMedidas: "Unesite duljinu i visinu zidova.",
    errorSuperficie: "Unesite površinu za bojanje.",
    errorAberturas: "Vrata i prozori ne mogu zauzimati cijeli zid.",
    errorRendimiento: "Izdašnost mora biti veća od 0.",
  }),
};
