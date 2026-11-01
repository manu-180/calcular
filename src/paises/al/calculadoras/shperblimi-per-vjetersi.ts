import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "al.shperblimi-per-vjetersi",
  mercado: "al",
  concepto: "indemnizacion-despido",
  slug: "shperblimi-per-vjetersi",
  estado: "borrador",
  requiere: { "al.shperblim-vjetersi": "numero" },
  campos: [
    { id: "paga", tipo: "moneda", etiqueta: "Paga bruto në muaj", min: 0, porDefecto: 90000 },
    { id: "vjet", tipo: "entero", etiqueta: "Vite të plota pune", min: 0, porDefecto: 5 },
  ],
  calcular(e, v, { redondear }) {
    if (e.paga <= 0) throw new ErrorEntrada("Vendosni një pagë më të madhe se zero.", "paga");
    const shperblimi = e.vjet < 3 ? 0 : redondear(((e.paga * v["al.shperblim-vjetersi"]) / 30) * e.vjet);
    return { shperblimi, observaciones: e.vjet < 3 ? ["Shpërblimi për vjetërsi kërkon të paktën tre vjet pune."] : [] };
  },
  resultado: [{ clave: "shperblimi", etiqueta: "Shpërblimi për vjetërsi", formato: "moneda", destacada: true }],
});
