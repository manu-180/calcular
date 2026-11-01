import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { brutoIzNeta, parametri, REQUIERE_ZARADA } from "../lib/zarada";

export default definirCalculadora({
  id: "rs.neto-u-bruto",
  mercado: "rs",
  concepto: "propio",
  slug: "neto-u-bruto",
  estado: "publicado",
  requiere: REQUIERE_ZARADA,
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "Neto zarada koju želite", min: 0, porDefecto: 100000 },
    { id: "radnoVreme", tipo: "entero", etiqueta: "Radno vreme u procentima punog", ayuda: "Puno radno vreme je 100. Neoporezivi iznos se smanjuje srazmerno.", min: 1, max: 100, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("Unesite neto zaradu veću od nule.", "neto");
    const o = brutoIzNeta(e.neto, parametri(v), e.radnoVreme, redondear);
    return {
      bruto: o.bruto,
      doprinosi: o.doprinosi,
      porez: o.porez,
      doprinosiPoslodavca: o.doprinosiPoslodavca,
      trosakPoslodavca: o.trosakPoslodavca,
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Potrebna bruto zarada", formato: "moneda", destacada: true },
    { clave: "doprinosi", etiqueta: "Doprinosi zaposlenog", formato: "moneda" },
    { clave: "porez", etiqueta: "Porez na zarade", formato: "moneda" },
    { clave: "doprinosiPoslodavca", etiqueta: "Doprinosi poslodavca", formato: "moneda" },
    { clave: "trosakPoslodavca", etiqueta: "Ukupan trošak poslodavca", formato: "moneda" },
  ],
});
