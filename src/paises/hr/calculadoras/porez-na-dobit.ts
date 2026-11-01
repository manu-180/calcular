import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hr.porez-na-dobit",
  mercado: "hr",
  concepto: "propio",
  slug: "porez-na-dobit",
  estado: "publicado",
  requiere: { "hr.porez-dobit-niza": "numero", "hr.porez-dobit-visa": "numero", "hr.porez-dobit-prag": "numero" },
  campos: [
    { id: "prihodi", tipo: "moneda", etiqueta: "Prihodi u poreznom razdoblju", min: 0, porDefecto: 500000 },
    { id: "dobit", tipo: "moneda", etiqueta: "Porezna osnovica (dobit)", min: 0, porDefecto: 60000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.dobit > e.prihodi) throw new ErrorEntrada("Dobit ne može biti veća od prihoda.", "dobit");
    const stopa = e.prihodi <= v["hr.porez-dobit-prag"] ? v["hr.porez-dobit-niza"] : v["hr.porez-dobit-visa"];
    const porez = redondear((e.dobit * stopa) / 100);
    return { porez, stopa, ostaje: redondear(e.dobit - porez) };
  },
  resultado: [
    { clave: "porez", etiqueta: "Porez na dobit", formato: "moneda", destacada: true },
    { clave: "stopa", etiqueta: "Primijenjena stopa", formato: "porcentaje" },
    { clave: "ostaje", etiqueta: "Dobit nakon poreza", formato: "moneda" },
  ],
});
