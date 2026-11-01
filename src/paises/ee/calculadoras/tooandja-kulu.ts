import { definirCalculadora } from "@/motor/calculo";
import { suuremNullist, tooandjaKulu } from "../lib/palk";

export default definirCalculadora({
  id: "ee.tooandja-kulu",
  mercado: "ee",
  concepto: "costo-empleador",
  slug: "tooandja-kulu",
  estado: "publicado",
  requiere: {
    "ee.sotsiaalmaks": "numero",
    "ee.sotsiaalmaksu-miinimum": "numero",
    "ee.tootuskindlustus-tooandja": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Brutopalk kuus", min: 0, porDefecto: 2000 },
    { id: "miinimum", tipo: "si-no", etiqueta: "Selle töötaja eest kehtib sotsiaalmaksu minimaalne kohustus", ayuda: "Tavaliselt peamine töökoht. Erandid on seaduses: näiteks pensionär või teine töökoht, mille eest kohustus on juba täidetud.", porDefecto: true },
    { id: "kuud", tipo: "entero", etiqueta: "Mitme kuu kulu arvutan", min: 1, max: 60, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    suuremNullist(e.bruto, "bruto");
    const k = tooandjaKulu(e.bruto, v["ee.sotsiaalmaks"], v["ee.tootuskindlustus-tooandja"], e.miinimum ? v["ee.sotsiaalmaksu-miinimum"] : null, redondear);
    return {
      kulu: k.kulu,
      sotsiaalmaks: k.sotsiaalmaks,
      tootuskindlustus: k.tootuskindlustus,
      kokku: redondear(k.kulu * e.kuud),
      observaciones: k.miinimumRakendus ? ["Palgast arvutatud sotsiaalmaks jääb alla minimaalse kohustuse, seega tasub tööandja miinimumi."] : [],
    };
  },
  resultado: [
    { clave: "kulu", etiqueta: "Tööandja kogukulu kuus", formato: "moneda", destacada: true },
    { clave: "sotsiaalmaks", etiqueta: "Sotsiaalmaks", formato: "moneda" },
    { clave: "tootuskindlustus", etiqueta: "Tööandja töötuskindlustusmakse", formato: "moneda" },
    { clave: "kokku", etiqueta: "Kulu kogu perioodi eest", formato: "moneda" },
  ],
});
