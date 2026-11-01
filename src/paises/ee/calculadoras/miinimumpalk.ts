import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { brutoNetoks, tooandjaKulu } from "../lib/palk";

export default definirCalculadora({
  id: "ee.miinimumpalk",
  mercado: "ee",
  concepto: "salario-minimo",
  slug: "miinimumpalk",
  estado: "publicado",
  requiere: {
    "ee.miinimumpalk-kuu": "numero",
    "ee.miinimumpalk-tund": "numero",
    "ee.tulumaks": "numero",
    "ee.maksuvaba-kuu": "numero",
    "ee.tootuskindlustus-tootaja": "numero",
    "ee.tootuskindlustus-tooandja": "numero",
    "ee.kogumispension": "mapa",
    "ee.sotsiaalmaks": "numero",
    "ee.sotsiaalmaksu-miinimum": "numero",
  },
  campos: [
    { id: "tunnid", tipo: "numero", etiqueta: "Töötunnid nädalas", ayuda: "Täistööaeg on 40 tundi nädalas.", min: 1, max: 40, porDefecto: 40 },
    { id: "sammas", tipo: "opcion-dato", dato: "ee.kogumispension", etiqueta: "II samba makse", porDefecto: "2" },
  ],
  calcular(e, v, { redondear }) {
    if (e.tunnid <= 0 || e.tunnid > 40) throw new ErrorEntrada("Töötunde nädalas võib olla 1 kuni 40.", "tunnid");
    const kuu = redondear((v["ee.miinimumpalk-kuu"] * e.tunnid) / 40);
    const p = brutoNetoks(
      kuu,
      { tulumaks: v["ee.tulumaks"], tootuskindlustus: v["ee.tootuskindlustus-tootaja"], kogumispension: enMapa(v["ee.kogumispension"], e.sammas), maksuvaba: v["ee.maksuvaba-kuu"] },
      redondear,
    );
    const k = tooandjaKulu(kuu, v["ee.sotsiaalmaks"], v["ee.tootuskindlustus-tooandja"], e.tunnid === 40 ? v["ee.sotsiaalmaksu-miinimum"] : null, redondear);
    return { kuu, neto: p.neto, tund: v["ee.miinimumpalk-tund"], aastas: redondear(kuu * 12), tooandjaKulu: k.kulu };
  },
  resultado: [
    { clave: "kuu", etiqueta: "Kuutasu alammäär bruto", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Neto maksuvaba tuluga", formato: "moneda" },
    { clave: "tund", etiqueta: "Tunnitasu alammäär bruto", formato: "moneda" },
    { clave: "aastas", etiqueta: "Bruto aastas", formato: "moneda" },
    { clave: "tooandjaKulu", etiqueta: "Tööandja kogukulu kuus", formato: "moneda" },
  ],
});
