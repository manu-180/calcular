import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { obracunaj, parametri, REQUIERE_ZARADA } from "../lib/zarada";

export default definirCalculadora({
  id: "rs.kalkulator-plate",
  mercado: "rs",
  concepto: "sueldo-neto",
  slug: "kalkulator-plate",
  estado: "publicado",
  requiere: REQUIERE_ZARADA,
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Mesečna bruto zarada", min: 0, porDefecto: 150000 },
    { id: "radnoVreme", tipo: "entero", etiqueta: "Radno vreme u procentima punog", ayuda: "Puno radno vreme je 100. Neoporezivi iznos se smanjuje srazmerno.", min: 1, max: 100, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Unesite bruto zaradu veću od nule.", "bruto");
    const o = obracunaj(e.bruto, parametri(v), e.radnoVreme, redondear);
    const observaciones: string[] = [];
    if (e.bruto < o.osnovicaDoprinosa) observaciones.push("Zarada je niža od najniže osnovice, pa se doprinosi plaćaju na najnižu osnovicu.");
    if (e.bruto > o.osnovicaDoprinosa) observaciones.push("Zarada je viša od najviše osnovice, pa se doprinosi plaćaju samo do te granice.");
    return {
      neto: o.neto,
      pio: o.pio,
      zdravstvo: o.zdravstvo,
      nezaposlenost: o.nezaposlenost,
      doprinosi: o.doprinosi,
      poreskaOsnovica: o.poreskaOsnovica,
      porez: o.porez,
      netoGodisnje: redondear(o.neto * 12),
      trosakPoslodavca: o.trosakPoslodavca,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Neto zarada mesečno", formato: "moneda", destacada: true },
    { clave: "pio", etiqueta: "Doprinos za PIO", formato: "moneda" },
    { clave: "zdravstvo", etiqueta: "Doprinos za zdravstvo", formato: "moneda" },
    { clave: "nezaposlenost", etiqueta: "Doprinos za nezaposlenost", formato: "moneda" },
    { clave: "doprinosi", etiqueta: "Doprinosi zaposlenog ukupno", formato: "moneda" },
    { clave: "poreskaOsnovica", etiqueta: "Osnovica poreza", formato: "moneda" },
    { clave: "porez", etiqueta: "Porez na zarade", formato: "moneda" },
    { clave: "netoGodisnje", etiqueta: "Neto zarada za godinu", formato: "moneda" },
    { clave: "trosakPoslodavca", etiqueta: "Ukupan mesečni trošak poslodavca", formato: "moneda" },
  ],
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes", entrada: { radnoVreme: 100 } },
});
