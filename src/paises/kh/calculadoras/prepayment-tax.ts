import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "kh.prepayment-tax",
  mercado: "kh",
  concepto: "propio",
  slug: "prepayment-tax",
  estado: "publicado",
  requiere: { "kh.prepayment-rate": "numero", "kh.minimum-tax-rate": "numero" },
  campos: [{ id: "ventas", tipo: "moneda", etiqueta: "ផលរបរប្រចាំខែ មិនរួម VAT (រៀល)", min: 0, porDefecto: 50000000 }],
  calcular(e, v, { redondear }) {
    if (e.ventas <= 0) throw new ErrorEntrada("សូមបញ្ចូលផលរបរ។", "ventas");
    return {
      mensual: redondear(porcentaje(e.ventas, v["kh.prepayment-rate"])),
      anual: redondear(porcentaje(e.ventas * 12, v["kh.prepayment-rate"])),
      minimo: redondear(porcentaje(e.ventas * 12, v["kh.minimum-tax-rate"])),
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "ប្រាក់រំដោះពន្ធក្នុងមួយខែ", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "ប្រាក់រំដោះពន្ធបើផលរបរដដែលពេញមួយឆ្នាំ", formato: "moneda" },
    { clave: "minimo", etiqueta: "ពន្ធអប្បបរមាប្រចាំឆ្នាំ", formato: "moneda" },
  ],
});
