import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "kh.property-tax",
  mercado: "kh",
  concepto: "propio",
  slug: "property-tax",
  estado: "publicado",
  requiere: { "kh.property-rate": "numero", "kh.property-base-share": "numero", "kh.property-allowance": "numero" },
  campos: [{ id: "valor", tipo: "moneda", etiqueta: "តម្លៃសរុបនៃដី និងសំណង់ (រៀល)", min: 0, porDefecto: 633600000 }],
  calcular(e, v, { redondear }) {
    if (e.valor <= 0) throw new ErrorEntrada("សូមបញ្ចូលតម្លៃអចលនទ្រព្យ។", "valor");
    const base = Math.max(0, porcentaje(e.valor, v["kh.property-base-share"]) - v["kh.property-allowance"]);
    return { impuesto: redondear(porcentaje(base, v["kh.property-rate"])), base: redondear(base) };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "ពន្ធលើអចលនទ្រព្យប្រចាំឆ្នាំ", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "មូលដ្ឋានគិតពន្ធ", formato: "moneda" },
  ],
});
