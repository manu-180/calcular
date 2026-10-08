import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pa.itbms",
  mercado: "pa",
  concepto: "iva",
  slug: "itbms",
  estado: "publicado",
  requiere: {
    "pa.itbms": "mapa",
  },
  campos: [
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "Qué quieres hacer",
      opciones: [
        { valor: "agregar", etiqueta: "Sumar el ITBMS a un precio" },
        { valor: "quitar", etiqueta: "Sacar el ITBMS de un precio que ya lo incluye" },
      ],
      porDefecto: "agregar",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Precio", min: 0 },
    { id: "tarifa", tipo: "opcion-dato", etiqueta: "Tarifa", dato: "pa.itbms", porDefecto: "general" },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = enMapa(valores["pa.itbms"], entrada.tarifa);
    const base = entrada.operacion === "agregar" ? entrada.monto : redondear(entrada.monto / (1 + tasa / 100));
    const itbms = entrada.operacion === "agregar" ? redondear(porcentaje(base, tasa)) : redondear(entrada.monto - base);
    return { tasa, base, itbms, total: redondear(base + itbms) };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tarifa aplicada", formato: "porcentaje" },
    { clave: "base", etiqueta: "Precio sin ITBMS", formato: "moneda" },
    { clave: "itbms", etiqueta: "ITBMS", formato: "moneda" },
    { clave: "total", etiqueta: "Precio con ITBMS", formato: "moneda", destacada: true },
  ],
});
