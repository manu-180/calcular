import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "co.iva",
  mercado: "co",
  concepto: "iva",
  slug: "iva",
  estado: "publicado",
  requiere: {
    "co.iva": "mapa",
  },
  campos: [
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "Qué quieres hacer",
      opciones: [
        { valor: "agregar", etiqueta: "Sumar el IVA a un precio" },
        { valor: "quitar", etiqueta: "Sacar el IVA de un precio que ya lo incluye" },
      ],
      porDefecto: "agregar",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Precio", min: 0 },
    { id: "tarifa", tipo: "opcion-dato", etiqueta: "Tarifa de IVA", dato: "co.iva", porDefecto: "general" },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = enMapa(valores["co.iva"], entrada.tarifa);
    const base = entrada.operacion === "agregar" ? entrada.monto : redondear(entrada.monto / (1 + tasa / 100));
    const iva = entrada.operacion === "agregar" ? redondear(porcentaje(base, tasa)) : redondear(entrada.monto - base);
    return { tasa, base, iva, total: redondear(base + iva) };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tarifa aplicada", formato: "porcentaje" },
    { clave: "base", etiqueta: "Precio sin IVA", formato: "moneda", decimales: 0 },
    { clave: "iva", etiqueta: "IVA", formato: "moneda", decimales: 0 },
    { clave: "total", etiqueta: "Precio con IVA", formato: "moneda", decimales: 0, destacada: true },
  ],
});
