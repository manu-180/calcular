import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "kh.fringe-benefit-tax",
  mercado: "kh",
  concepto: "propio",
  slug: "fringe-benefit-tax",
  estado: "publicado",
  requiere: { "kh.fringe-benefit-rate": "numero" },
  campos: [{ id: "valor", tipo: "moneda", etiqueta: "តម្លៃអត្ថប្រយោជន៍បន្ថែមប្រចាំខែ រួមទាំងអាករ (រៀល)", min: 0, porDefecto: 1000000 }],
  calcular(e, v, { redondear }) {
    if (e.valor <= 0) throw new ErrorEntrada("សូមបញ្ចូលតម្លៃអត្ថប្រយោជន៍។", "valor");
    return { impuesto: redondear(porcentaje(e.valor, v["kh.fringe-benefit-rate"])), anual: redondear(12 * porcentaje(e.valor, v["kh.fringe-benefit-rate"])) };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "ពន្ធលើអត្ថប្រយោជន៍បន្ថែមក្នុងមួយខែ", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "ពន្ធបើបន្តពេញមួយឆ្នាំ", formato: "moneda" },
  ],
});
