import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.impuesto-sobre-dividendos",
  mercado: "cr",
  concepto: "propio",
  slug: "impuesto-sobre-dividendos",
  estado: "publicado",
  requiere: {
    "cr.renta-capital": "mapa",
  },
  campos: [
    { id: "dividendos", tipo: "moneda", etiqueta: "Dividendos a repartir", min: 0 },
    {
      id: "socio",
      tipo: "opcion",
      etiqueta: "Quién los recibe",
      opciones: [
        { valor: "persona", etiqueta: "Una persona física" },
        { valor: "sociedad", etiqueta: "Otra sociedad de Costa Rica con actividad económica que paga renta" },
        { valor: "acciones", etiqueta: "Se pagan en acciones de la propia sociedad" },
      ],
      porDefecto: "persona",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const exento = entrada.socio !== "persona";
    const retencion = exento ? 0 : redondear(porcentaje(entrada.dividendos, enMapa(valores["cr.renta-capital"], "general")));
    return {
      retencion,
      neto: redondear(entrada.dividendos - retencion),
      observaciones: exento
        ? ["Esta distribución está exenta del impuesto sobre las rentas de capital (Ley 7092, artículo 28 bis, inciso 3)."]
        : ["La sociedad retiene el impuesto al pagar y es el impuesto final para quien recibe los dividendos."],
    };
  },
  resultado: [
    { clave: "retencion", etiqueta: "Impuesto retenido", formato: "moneda" },
    { clave: "neto", etiqueta: "Dividendos netos", formato: "moneda", destacada: true },
  ],
});
