import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "kh.accommodation-tax",
  mercado: "kh",
  concepto: "propio",
  slug: "accommodation-tax",
  estado: "publicado",
  requiere: { "kh.accommodation-rate": "numero" },
  campos: [{ id: "tarifa", tipo: "moneda", etiqueta: "ថ្លៃស្នាក់នៅ មិនរួម VAT (រៀល)", min: 0, porDefecto: 4000000 }],
  calcular(e, v, { redondear }) {
    if (e.tarifa <= 0) throw new ErrorEntrada("សូមបញ្ចូលថ្លៃស្នាក់នៅ។", "tarifa");
    return { impuesto: redondear(porcentaje(e.tarifa, v["kh.accommodation-rate"])), tasa: v["kh.accommodation-rate"] };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "អាករលើការស្នាក់នៅ", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "អត្រា", formato: "porcentaje" },
  ],
});
