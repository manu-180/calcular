import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.iva",
  mercado: "cr",
  concepto: "iva",
  slug: "iva",
  estado: "publicado",
  requiere: {
    "cr.iva": "mapa",
  },
  campos: [
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "Qué desea hacer",
      opciones: [
        { valor: "agregar", etiqueta: "Sumar el IVA a un precio" },
        { valor: "quitar", etiqueta: "Sacar el IVA de un precio que ya lo incluye" },
      ],
      porDefecto: "agregar",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Precio", min: 0 },
    { id: "tarifa", tipo: "opcion-dato", etiqueta: "Tarifa de IVA", dato: "cr.iva", porDefecto: "general" },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = enMapa(valores["cr.iva"], entrada.tarifa);
    const base = entrada.operacion === "agregar" ? entrada.monto : redondear(entrada.monto / (1 + tasa / 100));
    const iva = entrada.operacion === "agregar" ? redondear(porcentaje(base, tasa)) : redondear(entrada.monto - base);
    return { tasa, base, iva, total: redondear(base + iva) };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tarifa aplicada", formato: "porcentaje" },
    { clave: "base", etiqueta: "Precio sin IVA", formato: "moneda" },
    { clave: "iva", etiqueta: "IVA", formato: "moneda" },
    { clave: "total", etiqueta: "Precio con IVA", formato: "moneda", destacada: true },
  ],
});
