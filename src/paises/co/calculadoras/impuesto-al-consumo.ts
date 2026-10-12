import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "co.impuesto-al-consumo",
  mercado: "co",
  concepto: "propio",
  slug: "impuesto-al-consumo",
  estado: "publicado",
  requiere: {
    "co.impoconsumo-restaurantes": "numero",
  },
  campos: [
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "Qué quieres hacer",
      opciones: [
        { valor: "agregar", etiqueta: "Sumar el impuesto al consumo a un precio" },
        { valor: "quitar", etiqueta: "Sacar el impuesto de un precio que ya lo incluye" },
      ],
      porDefecto: "agregar",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Valor de la cuenta (sin propina)", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = valores["co.impoconsumo-restaurantes"];
    const base = entrada.operacion === "agregar" ? entrada.monto : redondear(entrada.monto / (1 + tasa / 100));
    const impuesto = entrada.operacion === "agregar" ? redondear(porcentaje(base, tasa)) : redondear(entrada.monto - base);
    return { tasa, base, impuesto, total: redondear(base + impuesto) };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tarifa", formato: "porcentaje" },
    { clave: "base", etiqueta: "Valor sin impuesto", formato: "moneda", decimales: 0 },
    { clave: "impuesto", etiqueta: "Impuesto al consumo", formato: "moneda", decimales: 0 },
    { clave: "total", etiqueta: "Total con impuesto", formato: "moneda", decimales: 0, destacada: true },
  ],
});
