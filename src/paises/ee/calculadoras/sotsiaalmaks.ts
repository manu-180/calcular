import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { suuremNullist } from "../lib/palk";

export default definirCalculadora({
  id: "ee.sotsiaalmaks",
  mercado: "ee",
  concepto: "aportes-seguridad-social",
  slug: "sotsiaalmaks",
  estado: "publicado",
  requiere: {
    "ee.sotsiaalmaks": "numero",
    "ee.sotsiaalmaksu-kuumaar": "numero",
    "ee.sotsiaalmaksu-miinimum": "numero",
    "ee.tootuskindlustus-tootaja": "numero",
    "ee.tootuskindlustus-tooandja": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Brutopalk kuus", min: 0, porDefecto: 2000 },
    { id: "miinimum", tipo: "si-no", etiqueta: "Arvesta minimaalse kohustusega", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    suuremNullist(e.bruto, "bruto");
    const arvutatud = redondear(porcentaje(e.bruto, v["ee.sotsiaalmaks"]));
    const sotsiaalmaks = e.miinimum ? Math.max(arvutatud, v["ee.sotsiaalmaksu-miinimum"]) : arvutatud;
    return {
      sotsiaalmaks,
      arvutatud,
      miinimum: v["ee.sotsiaalmaksu-miinimum"],
      kuumaar: v["ee.sotsiaalmaksu-kuumaar"],
      tkTootaja: redondear(porcentaje(e.bruto, v["ee.tootuskindlustus-tootaja"])),
      tkTooandja: redondear(porcentaje(e.bruto, v["ee.tootuskindlustus-tooandja"])),
      aastas: redondear(sotsiaalmaks * 12),
    };
  },
  resultado: [
    { clave: "sotsiaalmaks", etiqueta: "Sotsiaalmaks kuus", formato: "moneda", destacada: true },
    { clave: "arvutatud", etiqueta: "Arvutatud palgast", formato: "moneda" },
    { clave: "miinimum", etiqueta: "Minimaalne kohustus kuus", formato: "moneda" },
    { clave: "kuumaar", etiqueta: "Sotsiaalmaksu kuumäär", formato: "moneda" },
    { clave: "tkTootaja", etiqueta: "Töötaja töötuskindlustusmakse", formato: "moneda" },
    { clave: "tkTooandja", etiqueta: "Tööandja töötuskindlustusmakse", formato: "moneda" },
    { clave: "aastas", etiqueta: "Sotsiaalmaks aastas", formato: "moneda" },
  ],
});
