import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mx.iva",
  mercado: "mx",
  concepto: "iva",
  slug: "iva",
  estado: "publicado",
  requiere: {
    "mx.iva-general": "numero",
    "mx.iva-frontera": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto", min: 0 },
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "Qué quieres hacer",
      opciones: [
        { valor: "agregar", etiqueta: "Agregar el IVA a un precio sin IVA" },
        { valor: "quitar", etiqueta: "Quitar el IVA de un precio con IVA" },
      ],
      porDefecto: "agregar",
    },
    {
      id: "tasa",
      tipo: "opcion",
      etiqueta: "Tasa",
      opciones: [
        { valor: "general", etiqueta: "General" },
        { valor: "frontera", etiqueta: "Región fronteriza norte, con estímulo fiscal" },
      ],
      porDefecto: "general",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = entrada.tasa === "frontera" ? valores["mx.iva-frontera"] : valores["mx.iva-general"];
    const base = entrada.operacion === "agregar" ? entrada.monto : redondear(entrada.monto / (1 + tasa / 100));
    const iva = entrada.operacion === "agregar" ? redondear(porcentaje(base, tasa)) : redondear(entrada.monto - base);
    return {
      tasa,
      base,
      iva,
      total: redondear(base + iva),
      observaciones:
        entrada.tasa === "frontera"
          ? ["La tasa reducida vale para ventas y servicios en locales de la región fronteriza norte, y el negocio tiene que cumplir las reglas del SAT para usar el estímulo."]
          : [],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tasa de IVA", formato: "porcentaje" },
    { clave: "base", etiqueta: "Precio sin IVA", formato: "moneda" },
    { clave: "iva", etiqueta: "IVA", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Precio con IVA", formato: "moneda" },
  ],
});
