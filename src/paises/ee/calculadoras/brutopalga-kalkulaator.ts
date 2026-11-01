import { definirCalculadora, enMapa } from "@/motor/calculo";
import { netoBrutoks, suuremNullist, tooandjaKulu } from "../lib/palk";

export default definirCalculadora({
  id: "ee.brutopalga-kalkulaator",
  mercado: "ee",
  concepto: "propio",
  slug: "brutopalga-kalkulaator",
  estado: "publicado",
  requiere: {
    "ee.tulumaks": "numero",
    "ee.maksuvaba-kuu": "numero",
    "ee.tootuskindlustus-tootaja": "numero",
    "ee.tootuskindlustus-tooandja": "numero",
    "ee.kogumispension": "mapa",
    "ee.sotsiaalmaks": "numero",
    "ee.sotsiaalmaksu-miinimum": "numero",
  },
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "Soovitud netopalk kuus", min: 0, porDefecto: 1500 },
    { id: "sammas", tipo: "opcion-dato", dato: "ee.kogumispension", etiqueta: "II samba makse", porDefecto: "2" },
    { id: "maksuvaba", tipo: "si-no", etiqueta: "Maksuvaba tulu rakendatakse sellele palgale", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    suuremNullist(e.neto, "neto");
    const p = netoBrutoks(
      e.neto,
      {
        tulumaks: v["ee.tulumaks"],
        tootuskindlustus: v["ee.tootuskindlustus-tootaja"],
        kogumispension: enMapa(v["ee.kogumispension"], e.sammas),
        maksuvaba: e.maksuvaba ? v["ee.maksuvaba-kuu"] : 0,
      },
      redondear,
    );
    const k = tooandjaKulu(p.bruto, v["ee.sotsiaalmaks"], v["ee.tootuskindlustus-tooandja"], v["ee.sotsiaalmaksu-miinimum"], redondear);
    return { bruto: p.bruto, tootuskindlustus: p.tootuskindlustus, kogumispension: p.kogumispension, tulumaks: p.tulumaks, tooandjaKulu: k.kulu };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Vajalik brutopalk", formato: "moneda", destacada: true },
    { clave: "tootuskindlustus", etiqueta: "Töötuskindlustusmakse", formato: "moneda" },
    { clave: "kogumispension", etiqueta: "II samba makse", formato: "moneda", ocultarSiCero: true },
    { clave: "tulumaks", etiqueta: "Tulumaks", formato: "moneda" },
    { clave: "tooandjaKulu", etiqueta: "Tööandja kogukulu kuus", formato: "moneda" },
  ],
});
