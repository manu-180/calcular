import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { suuremNullist } from "../lib/palk";

export default definirCalculadora({
  id: "ee.fie-maksud",
  mercado: "ee",
  concepto: "retencion-honorarios",
  slug: "fie-maksud",
  estado: "publicado",
  requiere: {
    "ee.sotsiaalmaks": "numero",
    "ee.sotsiaalmaksu-kuumaar": "numero",
    "ee.fie-kvartal": "numero",
    "ee.fie-sotsiaalmaksu-lagi": "numero",
    "ee.tulumaks": "numero",
    "ee.maksuvaba-aasta": "numero",
  },
  campos: [
    { id: "tulu", tipo: "moneda", etiqueta: "Ettevõtlustulu aastas", min: 0, porDefecto: 40000 },
    { id: "kulud", tipo: "moneda", etiqueta: "Ettevõtlusega seotud kulud aastas", min: 0, porDefecto: 10000 },
    { id: "maksuvaba", tipo: "si-no", etiqueta: "Maksuvaba tulu arvestatakse FIE tulust", ayuda: "Kui maksuvaba tulu on juba kasutatud palgalt, jäta valimata.", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    suuremNullist(e.tulu, "tulu");
    const kasum = Math.max(0, e.tulu - e.kulud);
    const maar = v["ee.sotsiaalmaks"] / 100;
    const miinimum = redondear(porcentaje(v["ee.sotsiaalmaksu-kuumaar"] * 12, v["ee.sotsiaalmaks"]));
    const lagi = redondear(porcentaje(v["ee.fie-sotsiaalmaksu-lagi"], v["ee.sotsiaalmaks"]));
    // TuMS § 14 lg 53 kuni 55: ettevõtlustulu jagatakse enne tulumaksu 1,33-ga; miinimumi ja lae korral
    // arvatakse tulust maha tegelik sotsiaalmaks.
    const jagatud = kasum / (1 + maar);
    const sotsiaalmaksArvutatud = jagatud * maar;
    let sotsiaalmaks = redondear(sotsiaalmaksArvutatud);
    let alus = jagatud;
    if (sotsiaalmaksArvutatud < miinimum) {
      sotsiaalmaks = miinimum;
      alus = Math.max(0, kasum - miinimum);
    } else if (sotsiaalmaksArvutatud > lagi) {
      sotsiaalmaks = lagi;
      alus = kasum - lagi;
    }
    const mv = e.maksuvaba ? v["ee.maksuvaba-aasta"] : 0;
    const maksustatav = redondear(Math.max(0, alus - mv));
    const tulumaks = redondear(porcentaje(maksustatav, v["ee.tulumaks"]));
    return {
      jaab: redondear(kasum - sotsiaalmaks - tulumaks),
      kasum: redondear(kasum),
      sotsiaalmaks,
      tulumaks,
      maksustatav,
      avanss: v["ee.fie-kvartal"],
      miinimum,
      lagi,
    };
  },
  resultado: [
    { clave: "jaab", etiqueta: "Pärast makse jääb aastas", formato: "moneda", destacada: true },
    { clave: "kasum", etiqueta: "Tulu pärast kulusid", formato: "moneda" },
    { clave: "sotsiaalmaks", etiqueta: "Sotsiaalmaks aastas", formato: "moneda" },
    { clave: "tulumaks", etiqueta: "Tulumaks", formato: "moneda" },
    { clave: "maksustatav", etiqueta: "Tulumaksuga maksustatav summa", formato: "moneda" },
    { clave: "avanss", etiqueta: "Sotsiaalmaksu avanss kvartalis", formato: "moneda" },
    { clave: "miinimum", etiqueta: "Sotsiaalmaksu miinimum aastas", formato: "moneda" },
    { clave: "lagi", etiqueta: "Sotsiaalmaksu lagi aastas", formato: "moneda" },
  ],
});
