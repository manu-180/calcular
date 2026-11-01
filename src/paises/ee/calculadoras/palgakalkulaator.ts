import { definirCalculadora, enMapa } from "@/motor/calculo";
import { brutoNetoks, suuremNullist, tooandjaKulu } from "../lib/palk";

export default definirCalculadora({
  id: "ee.palgakalkulaator",
  mercado: "ee",
  concepto: "sueldo-neto",
  slug: "palgakalkulaator",
  estado: "publicado",
  requiere: {
    "ee.tulumaks": "numero",
    "ee.maksuvaba-kuu": "numero",
    "ee.maksuvaba-pension-kuu": "numero",
    "ee.maksuvaba-aasta": "numero",
    "ee.maksuvaba-pension-aasta": "numero",
    "ee.tootuskindlustus-tootaja": "numero",
    "ee.tootuskindlustus-tooandja": "numero",
    "ee.kogumispension": "mapa",
    "ee.sotsiaalmaks": "numero",
    "ee.sotsiaalmaksu-miinimum": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Brutopalk kuus", min: 0, porDefecto: 2000 },
    { id: "sammas", tipo: "opcion-dato", dato: "ee.kogumispension", etiqueta: "II samba makse", porDefecto: "2" },
    { id: "maksuvaba", tipo: "si-no", etiqueta: "Maksuvaba tulu avaldus on selle tööandja juures esitatud", ayuda: "Maksuvaba tulu saab rakendada ainult ühe tööandja juures.", porDefecto: true },
    { id: "pensioniiga", tipo: "si-no", etiqueta: "Oled vanaduspensioniealine", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    suuremNullist(e.bruto, "bruto");
    const mv = !e.maksuvaba ? 0 : e.pensioniiga ? v["ee.maksuvaba-pension-kuu"] : v["ee.maksuvaba-kuu"];
    const p = brutoNetoks(
      e.bruto,
      { tulumaks: v["ee.tulumaks"], tootuskindlustus: v["ee.tootuskindlustus-tootaja"], kogumispension: enMapa(v["ee.kogumispension"], e.sammas), maksuvaba: mv },
      redondear,
    );
    const k = tooandjaKulu(e.bruto, v["ee.sotsiaalmaks"], v["ee.tootuskindlustus-tooandja"], v["ee.sotsiaalmaksu-miinimum"], redondear);
    return {
      neto: p.neto,
      tootuskindlustus: p.tootuskindlustus,
      kogumispension: p.kogumispension,
      maksuvaba: p.maksuvaba,
      tulumaks: p.tulumaks,
      netoAastas: redondear(p.neto * 12),
      sotsiaalmaks: k.sotsiaalmaks,
      tooandjaKulu: k.kulu,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Netopalk kuus", formato: "moneda", destacada: true },
    { clave: "tootuskindlustus", etiqueta: "Töötuskindlustusmakse", formato: "moneda" },
    { clave: "kogumispension", etiqueta: "II samba makse", formato: "moneda", ocultarSiCero: true },
    { clave: "maksuvaba", etiqueta: "Arvestatud maksuvaba tulu", formato: "moneda", ocultarSiCero: true },
    { clave: "tulumaks", etiqueta: "Tulumaks", formato: "moneda" },
    { clave: "netoAastas", etiqueta: "Netopalk aastas", formato: "moneda" },
    { clave: "sotsiaalmaks", etiqueta: "Tööandja sotsiaalmaks", formato: "moneda" },
    { clave: "tooandjaKulu", etiqueta: "Tööandja kogukulu kuus", formato: "moneda" },
  ],
  mundo: {
    bruto: "bruto",
    periodoBruto: "mes",
    neto: "neto",
    periodoNeto: "mes",
    entrada: { sammas: "2", maksuvaba: true, pensioniiga: false },
  },
});
