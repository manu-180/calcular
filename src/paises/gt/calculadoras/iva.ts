import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gt.iva",
  mercado: "gt",
  concepto: "iva",
  slug: "iva",
  estado: "publicado",
  requiere: {
    "gt.iva": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto", min: 0 },
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "Qué quiere hacer",
      opciones: [
        { valor: "agregar", etiqueta: "Agregar el IVA a un precio sin IVA" },
        { valor: "quitar", etiqueta: "Quitar el IVA de un precio con IVA" },
      ],
      porDefecto: "agregar",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = valores["gt.iva"];
    const base = entrada.operacion === "agregar" ? entrada.monto : redondear(entrada.monto / (1 + tasa / 100));
    const iva = entrada.operacion === "agregar" ? redondear(porcentaje(base, tasa)) : redondear(entrada.monto - base);
    return { tasa, base, iva, total: redondear(base + iva) };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tarifa del IVA", formato: "porcentaje" },
    { clave: "base", etiqueta: "Precio sin IVA", formato: "moneda" },
    { clave: "iva", etiqueta: "IVA", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Precio con IVA", formato: "moneda" },
  ],
});
