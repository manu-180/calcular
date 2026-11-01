import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { suuremNullist } from "../lib/palk";

export default definirCalculadora({
  id: "ee.tulumaksu-kalkulaator",
  mercado: "ee",
  concepto: "impuesto-renta",
  slug: "tulumaksu-kalkulaator",
  estado: "publicado",
  requiere: {
    "ee.tulumaks": "numero",
    "ee.maksuvaba-aasta": "numero",
    "ee.maksuvaba-pension-aasta": "numero",
    "ee.mahaarvamiste-piir": "numero",
    "ee.iii-sammas-maar": "numero",
    "ee.iii-sammas-piir": "numero",
  },
  campos: [
    { id: "tulu", tipo: "moneda", etiqueta: "Maksustatav tulu aastas", min: 0, porDefecto: 30000 },
    { id: "kohustuslikud", tipo: "moneda", etiqueta: "Töötuskindlustus ja II sammas aastas", ayuda: "Töötaja makstud summad. Need arvatakse tulust maha.", min: 0, porDefecto: 1080 },
    { id: "koolitus", tipo: "moneda", etiqueta: "Koolituskulud, kingid ja annetused", min: 0, porDefecto: 0 },
    { id: "kolmas", tipo: "moneda", etiqueta: "III samba maksed", min: 0, porDefecto: 0 },
    { id: "pensioniiga", tipo: "si-no", etiqueta: "Oled vanaduspensioniealine", porDefecto: false },
    { id: "kinnipeetud", tipo: "moneda", etiqueta: "Aasta jooksul kinni peetud tulumaks (ei ole kohustuslik)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    suuremNullist(e.tulu, "tulu");
    if (e.kohustuslikud > e.tulu) throw new ErrorEntrada("Maksed ei saa olla suuremad kui tulu.", "kohustuslikud");
    const mv = Math.min(e.pensioniiga ? v["ee.maksuvaba-pension-aasta"] : v["ee.maksuvaba-aasta"], e.tulu - e.kohustuslikud);
    const alus = e.tulu - e.kohustuslikud - mv;
    const k = Math.min(e.koolitus, v["ee.mahaarvamiste-piir"], alus * 0.5);
    const kolmas = Math.min(e.kolmas, porcentaje(e.tulu - e.kohustuslikud, v["ee.iii-sammas-maar"]), v["ee.iii-sammas-piir"], alus - k);
    const maksustatav = redondear(Math.max(0, alus - k - kolmas));
    const tulumaks = redondear(porcentaje(maksustatav, v["ee.tulumaks"]));
    const ilma = redondear(porcentaje(alus, v["ee.tulumaks"]));
    return {
      tulumaks,
      maksuvaba: redondear(mv),
      mahaarvamised: redondear(k + kolmas),
      maksustatav,
      kokkuhoid: redondear(ilma - tulumaks),
      enammakstud: e.kinnipeetud === null ? null : redondear(e.kinnipeetud - tulumaks),
    };
  },
  resultado: [
    { clave: "tulumaks", etiqueta: "Tulumaks aastas", formato: "moneda", destacada: true },
    { clave: "maksuvaba", etiqueta: "Maksuvaba tulu", formato: "moneda" },
    { clave: "mahaarvamised", etiqueta: "Arvestatud mahaarvamised", formato: "moneda", ocultarSiCero: true },
    { clave: "maksustatav", etiqueta: "Maksustatav summa", formato: "moneda" },
    { clave: "kokkuhoid", etiqueta: "Mahaarvamistest tulev kokkuhoid", formato: "moneda", ocultarSiCero: true },
    { clave: "enammakstud", etiqueta: "Tagastatav summa (miinus tähendab juurdemakset)", formato: "moneda" },
  ],
});
