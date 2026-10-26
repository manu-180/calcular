import { definirCasos } from "@/motor/calculo";
import ylityokorvaus from "./ylityokorvaus";

const TAL = "https://www.finlex.fi/fi/lainsaadanto/2019/872";

export default definirCasos(ylityokorvaus, [
  {
    nombre: "20 euroa tunnilta, 3 tuntia vuorokautista ja 4 tuntia viikoittaista ylityötä",
    origen: { tipo: "recalculado", url: TAL, detalle: "20 §: 2 × 30 + 1 × 40 = 100; viikoittainen 4 × 30 = 120. Yhteensä 220, josta korotusosat 80." },
    fecha: "2026-10-24",
    entrada: { tuntipalkka: 20, vrkTunnit: 3, vrkPaivat: 1, viikkoTunnit: 4, sunnuntaiTunnit: 0 },
    esperado: { yhteensa: 220, perusosa: 140, korotukset: 80, tunnit: 7 },
  },
  {
    nombre: "Kaksi tuntia kolmena päivänä ja sunnuntaityötä",
    origen: { tipo: "recalculado", url: TAL, detalle: "6 tuntia × 15 × 1,5 = 135. Sunnuntain korotus 8 × 15 × 100 % = 120. Yhteensä 255." },
    fecha: "2026-10-24",
    entrada: { tuntipalkka: 15, vrkTunnit: 2, vrkPaivat: 3, viikkoTunnit: 0, sunnuntaiTunnit: 8 },
    esperado: { yhteensa: 255, tunnit: 6 },
  },
]);
