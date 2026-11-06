import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "kh.patent-tax",
  mercado: "kh",
  concepto: "propio",
  slug: "patent-tax",
  estado: "publicado",
  requiere: { "kh.patent-tax": "mapa" },
  campos: [
    { id: "categoria", tipo: "opcion-dato", dato: "kh.patent-tax", etiqueta: "ប្រភេទអ្នកជាប់ពន្ធ", porDefecto: "small" },
    { id: "segundoSemestre", tipo: "si-no", etiqueta: "ចាប់អាជីវកម្មក្នុងខែកក្កដា ដល់ខែធ្នូ", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    const anual = enMapa(v["kh.patent-tax"], e.categoria);
    return { pago: redondear(e.segundoSemestre ? anual / 2 : anual), anual };
  },
  resultado: [
    { clave: "pago", etiqueta: "ពន្ធប៉ាតង់ត្រូវបង់", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "ពន្ធប៉ាតង់ពេញមួយឆ្នាំ", formato: "moneda" },
  ],
});
