import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "litra" : "galona");

export const textosSq: TextosUi<UiPintura> = {
  slug: "kalkulator-boje",
  ui: () => ({
    modo: "Cilat matje keni?",
    modoMedidas: "Gjatësia dhe lartësia e mureve",
    modoSuperficie: "Sipërfaqja totale",
    largo: (u) => `Gjatësia totale e mureve (${u})`,
    largoAyuda: "Të gjithë muret që lyeni, të mbledhur. Për një dhomë, perimetri.",
    alto: (u) => `Lartësia e mureve (${u})`,
    superficie: (u) => `Sipërfaqja për t'u lyer (${u})`,
    aberturas: (u) => `Dyer dhe dritare për t'u zbritur (${u})`,
    aberturasAyuda: "Një derë ka rreth 2 m², ndërsa një dritare e zakonshme nga 1 deri në 2 m².",
    manos: "Numri i shtresave",
    rendimiento: (u) => `Mbulimi i bojës (${u})`,
    rendimientoAyuda: "Shkruhet në ambalazh: sa sipërfaqe mbulon me një shtresë. Nëse nuk e dini, mbani vlerën e propozuar.",
    recomendado: (u) => `Bojë për t'u blerë (${volumen(u)})`,
    recomendadoAyuda: "Përfshin 10% më shumë për retushime dhe për atë që mbetet në rul.",
    necesario: (u) => `Sasia e saktë (${volumen(u)})`,
    neta: (u) => `Sipërfaqja për t'u lyer (${u})`,
    errorMedidas: "Plotësoni gjatësinë dhe lartësinë e mureve.",
    errorSuperficie: "Plotësoni sipërfaqen për t'u lyer.",
    errorAberturas: "Dyert dhe dritaret nuk mund të zënë gjithë murin.",
    errorRendimiento: "Mbulimi duhet të jetë më i madh se 0.",
  }),
};
