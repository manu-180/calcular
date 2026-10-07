import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.iva",
  mercado: "uy",
  concepto: "iva",
  slug: "iva",
  estado: "publicado",
  requiere: {
    "uy.iva-basica": "numero",
    "uy.iva-minima": "numero",
  },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué querés hacer",
      opciones: [
        { valor: "agregar", etiqueta: "Sumarle el IVA a un precio sin IVA" },
        { valor: "quitar", etiqueta: "Sacarle el IVA a un precio con IVA" },
      ],
      porDefecto: "agregar",
    },
    {
      id: "tasa",
      tipo: "opcion",
      etiqueta: "Tasa",
      opciones: [
        { valor: "basica", etiqueta: "Básica (la general)" },
        { valor: "minima", etiqueta: "Mínima (solo para los bienes y servicios que fija la ley)" },
      ],
      porDefecto: "basica",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Monto", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = entrada.tasa === "basica" ? valores["uy.iva-basica"] : valores["uy.iva-minima"];
    if (entrada.sentido === "agregar") {
      const iva = redondear(porcentaje(entrada.monto, tasa));
      return { tasa, neto: entrada.monto, iva, total: redondear(entrada.monto + iva) };
    }
    const neto = redondear(entrada.monto / (1 + tasa / 100));
    return { tasa, neto, iva: redondear(entrada.monto - neto), total: entrada.monto };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tasa aplicada", formato: "porcentaje" },
    { clave: "neto", etiqueta: "Precio sin IVA", formato: "moneda" },
    { clave: "iva", etiqueta: "IVA", formato: "moneda" },
    { clave: "total", etiqueta: "Precio con IVA", formato: "moneda", destacada: true },
  ],
});
