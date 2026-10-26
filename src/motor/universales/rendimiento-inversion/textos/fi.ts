import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosFi: TextosUi<UiRendimientoInversion> = {
  slug: "tuottolaskuri",
  ui: () => ({
    inicial: "Sijoitettu summa",
    final: "Loppuarvo",
    finalAyuda: "Sijoituksen arvo nyt tai summa, jonka sait, kun myit sen.",
    cobrado: "Matkan varrella saadut tuotot (valinnainen)",
    cobradoAyuda: "Osingot, korot tai vuokrat, jotka sait etkä sijoittanut uudelleen.",
    anios: "Vuodet",
    aniosAyuda: "Voit käyttää desimaaleja vuoden osille, esimerkiksi 1,5 vuotta.",
    ganancia: "Voitto",
    roi: "Kokonaistuotto (ROI)",
    cagr: "Vuosituotto (CAGR)",
    cagrAyuda: "Vuotuinen tuotto, joka antaa saman lopputuloksen, kun se kasvaa korkoa korolle vuodesta toiseen.",
    errorInicial: "Syötä, paljonko sijoitit alussa.",
    observacionCorto: "Alle vuoden jaksolla vuosituotto venyttää lyhyen tuloksen kuin se toistuisi koko vuoden. Tulkitse sitä varovasti.",
    observacionInflacion: "Jos haluat tietää, onko ostovoimasi kasvanut, vertaa vuosituottoa saman ajan inflaatioon.",
  }),
};
