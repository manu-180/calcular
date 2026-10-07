import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.iva",
  mercado: "cl",
  concepto: "iva",
  slug: "iva",
  estado: "publicado",
  requiere: {
    "cl.iva": "numero",
  },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué quieres hacer",
      opciones: [
        { valor: "agregar", etiqueta: "Agregar IVA a un monto neto" },
        { valor: "quitar", etiqueta: "Sacar el IVA de un precio con IVA" },
      ],
      porDefecto: "agregar",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Monto", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = valores["cl.iva"];
    if (entrada.sentido === "agregar") {
      const iva = redondear(porcentaje(entrada.monto, tasa));
      return { neto: entrada.monto, iva, total: entrada.monto + iva };
    }
    const neto = redondear(entrada.monto / (1 + tasa / 100));
    return { neto, iva: entrada.monto - neto, total: entrada.monto };
  },
  resultado: [
    { clave: "neto", etiqueta: "Monto neto", formato: "moneda" },
    { clave: "iva", etiqueta: "IVA", formato: "moneda" },
    { clave: "total", etiqueta: "Total con IVA", formato: "moneda", destacada: true },
  ],
});
