import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "litraa" : "gallonaa");

export const textosFi: TextosUi<UiPintura> = {
  slug: "maalimenekki",
  ui: () => ({
    modo: "Mitkä mitat tiedät?",
    modoMedidas: "Seinien pituus ja korkeus",
    modoSuperficie: "Maalattava kokonaispinta-ala",
    largo: (u) => `Seinien yhteenlaskettu pituus (${u})`,
    largoAyuda: "Kaikki maalattavat seinät yhteensä. Huoneessa se on huoneen ympärysmitta.",
    alto: (u) => `Huonekorkeus (${u})`,
    superficie: (u) => `Maalattava pinta-ala (${u})`,
    aberturas: (u) => `Vähennettävät ovet ja ikkunat (${u})`,
    aberturasAyuda: "Ovi on noin 2 m² (21 ft²) ja tavallinen ikkuna 1 tai 2 m².",
    manos: "Maalikerrosten määrä",
    rendimiento: (u) => `Maalin riittoisuus (${u})`,
    rendimientoAyuda: "Riittoisuus on merkitty maalipurkkiin: kuinka monta neliötä litra peittää yhdellä kerralla. Jos et tiedä, pidä ehdotettu arvo.",
    recomendado: (u) => `Ostettava maali (${volumen(u)})`,
    recomendadoAyuda: "Mukana 10 % lisää paikkauksiin ja teloihin jäävään maaliin.",
    necesario: (u) => `Tarkka määrä (${volumen(u)})`,
    neta: (u) => `Maalattava pinta-ala (${u})`,
    errorMedidas: "Syötä seinien pituus ja korkeus.",
    errorSuperficie: "Syötä maalattava pinta-ala.",
    errorAberturas: "Ovet ja ikkunat eivät voi viedä koko seinää.",
    errorRendimiento: "Riittoisuuden on oltava suurempi kuin 0.",
  }),
};
