import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bg.danak-dividenti",
  mercado: "bg",
  concepto: "propio",
  slug: "danak-dividenti",
  estado: "borrador",
  requiere: { "bg.danak-dividenti": "numero" },
  campos: [{ id: "bruto", tipo: "moneda", etiqueta: "Брутен дивидент", min: 0, porDefecto: 1000 }],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Въведете сума над нула.", "bruto");
    const danak = redondear((e.bruto * v["bg.danak-dividenti"]) / 100);
    return { neto: redondear(e.bruto - danak), danak };
  },
  resultado: [
    { clave: "neto", etiqueta: "Нетен дивидент", formato: "moneda", destacada: true },
    { clave: "danak", etiqueta: "Данък", formato: "moneda" },
  ],
});
