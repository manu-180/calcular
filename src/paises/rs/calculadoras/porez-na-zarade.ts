import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { obracunaj, parametri, REQUIERE_ZARADA } from "../lib/zarada";

export default definirCalculadora({
  id: "rs.porez-na-zarade",
  mercado: "rs",
  concepto: "impuesto-renta",
  slug: "porez-na-zarade",
  estado: "publicado",
  requiere: REQUIERE_ZARADA,
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Mesečna bruto zarada", min: 0, porDefecto: 150000 },
    { id: "radnoVreme", tipo: "entero", etiqueta: "Radno vreme u procentima punog", min: 1, max: 100, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Unesite bruto zaradu veću od nule.", "bruto");
    const p = parametri(v);
    const o = obracunaj(e.bruto, p, e.radnoVreme, redondear);
    return {
      porez: o.porez,
      neoporeziviDeo: redondear((p.neoporezivi * e.radnoVreme) / 100),
      osnovica: o.poreskaOsnovica,
      efektivnaStopa: (o.porez / e.bruto) * 100,
      porezGodisnje: redondear(o.porez * 12),
    };
  },
  resultado: [
    { clave: "porez", etiqueta: "Porez na zarade mesečno", formato: "moneda", destacada: true },
    { clave: "neoporeziviDeo", etiqueta: "Neoporezivi deo", formato: "moneda" },
    { clave: "osnovica", etiqueta: "Osnovica poreza", formato: "moneda" },
    { clave: "efektivnaStopa", etiqueta: "Stvarna stopa na bruto", formato: "porcentaje", decimales: 2 },
    { clave: "porezGodisnje", etiqueta: "Porez za godinu", formato: "moneda" },
  ],
});
