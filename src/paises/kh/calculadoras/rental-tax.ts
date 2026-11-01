import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "kh.rental-tax",
  mercado: "kh",
  concepto: "propio",
  slug: "rental-tax",
  estado: "publicado",
  requiere: { "kh.rental-rate": "numero", "kh.rental-exempt": "numero" },
  campos: [{ id: "renta", tipo: "moneda", etiqueta: "ថ្លៃឈ្នួលផ្ទះ ឬដីប្រចាំខែ (រៀល)", min: 0, porDefecto: 2000000 }],
  calcular(e, v, { redondear }) {
    if (e.renta <= 0) throw new ErrorEntrada("សូមបញ្ចូលថ្លៃឈ្នួល។", "renta");
    const impuesto = e.renta < v["kh.rental-exempt"] ? 0 : redondear(porcentaje(e.renta, v["kh.rental-rate"]));
    return { impuesto, neto: redondear(e.renta - impuesto), anual: impuesto * 12 };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "ពន្ធក្នុងមួយខែ", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "ថ្លៃឈ្នួលក្រោយពន្ធ", formato: "moneda" },
    { clave: "anual", etiqueta: "ពន្ធក្នុងមួយឆ្នាំ", formato: "moneda" },
  ],
});
