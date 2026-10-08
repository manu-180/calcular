import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "hn.isv",
  mercado: "hn",
  concepto: "iva",
  slug: "isv",
  estado: "publicado",
  requiere: {
    "hn.isv": "mapa",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto", min: 0 },
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "Qué quiere hacer",
      opciones: [
        { valor: "agregar", etiqueta: "Agregar el ISV a un precio sin impuesto" },
        { valor: "quitar", etiqueta: "Quitar el ISV de un precio con impuesto" },
      ],
      porDefecto: "agregar",
    },
    { id: "tasa", tipo: "opcion-dato", dato: "hn.isv", etiqueta: "Tasa", porDefecto: "general" },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = enMapa(valores["hn.isv"], entrada.tasa);
    const base = entrada.operacion === "agregar" ? entrada.monto : redondear(entrada.monto / (1 + tasa / 100));
    const isv = entrada.operacion === "agregar" ? redondear(porcentaje(base, tasa)) : redondear(entrada.monto - base);
    return { tasa, base, isv, total: redondear(base + isv) };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tasa del ISV", formato: "porcentaje" },
    { clave: "base", etiqueta: "Precio sin ISV", formato: "moneda" },
    { clave: "isv", etiqueta: "ISV", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Precio con ISV", formato: "moneda" },
  ],
});
