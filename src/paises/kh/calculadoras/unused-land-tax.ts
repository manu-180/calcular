import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "kh.unused-land-tax",
  mercado: "kh",
  concepto: "propio",
  slug: "unused-land-tax",
  estado: "publicado",
  requiere: { "kh.unused-land-rate": "numero", "kh.unused-land-exempt-m2": "numero" },
  campos: [
    { id: "area", tipo: "numero", etiqueta: "ផ្ទៃដីសរុប (ម៉ែត្រការ៉េ)", min: 0, porDefecto: 90000 },
    { id: "precio", tipo: "moneda", etiqueta: "តម្លៃដីក្នុងមួយម៉ែត្រការ៉េ (រៀល)", min: 0, porDefecto: 15000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.area <= 0) throw new ErrorEntrada("សូមបញ្ចូលផ្ទៃដី។", "area");
    if (e.precio <= 0) throw new ErrorEntrada("សូមបញ្ចូលតម្លៃដី។", "precio");
    const base = Math.max(0, e.area - v["kh.unused-land-exempt-m2"]) * e.precio;
    return { impuesto: redondear(porcentaje(base, v["kh.unused-land-rate"])), base };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "ពន្ធប្រចាំឆ្នាំ", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "មូលដ្ឋានគិតពន្ធ", formato: "moneda" },
  ],
});
