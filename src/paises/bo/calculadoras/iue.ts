import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bo.iue",
  mercado: "bo",
  concepto: "propio",
  slug: "iue",
  estado: "publicado",
  requiere: {
    "bo.iue": "numero",
    "bo.iue-utilidad-presunta": "mapa",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Qué quiere calcular",
      opciones: [
        { valor: "empresa", etiqueta: "El IUE de mi empresa sobre su utilidad neta" },
        { valor: "exterior", etiqueta: "La retención por un pago a alguien del exterior" },
      ],
      porDefecto: "empresa",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Utilidad neta de la gestión o monto que paga al exterior", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const alicuota = valores["bo.iue"];
    // Al exterior se presume, sin prueba en contrario, que la utilidad es la mitad de lo pagado (Ley 843, art. 51).
    const base = entrada.tipo === "empresa" ? entrada.monto : redondear(porcentaje(entrada.monto, enMapa(valores["bo.iue-utilidad-presunta"], "exterior")));
    const impuesto = redondear(porcentaje(base, alicuota));
    const observaciones =
      entrada.tipo === "empresa"
        ? ["La utilidad neta es la que resulta de sus estados financieros, con los ajustes de la ley. Si hubo pérdida, no hay IUE."]
        : ["Lo retiene quien paga o remesa, como pago único y definitivo, y lo entrega al SIN."];
    return { base, impuesto, tasaEfectiva: entrada.monto > 0 ? redondear((impuesto / entrada.monto) * 100) : 0, observaciones };
  },
  resultado: [
    { clave: "base", etiqueta: "Utilidad gravada", formato: "moneda" },
    { clave: "tasaEfectiva", etiqueta: "Tasa sobre el monto que escribió", formato: "porcentaje" },
    { clave: "impuesto", etiqueta: "IUE", formato: "moneda", destacada: true },
  ],
});
