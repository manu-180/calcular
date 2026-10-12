import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.certificado-de-deposito",
  mercado: "cr",
  concepto: "plazo-fijo",
  slug: "certificado-de-deposito",
  estado: "publicado",
  requiere: {
    "cr.renta-capital": "mapa",
    "cr.tbp": "serie",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto a invertir", min: 0, porDefecto: 1000000 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Tasa de interés anual bruta que ofrece la entidad", min: 0, max: 50 },
    { id: "plazo", tipo: "entero", etiqueta: "Plazo en días", min: 1, max: 3650, porDefecto: 180 },
    {
      id: "base",
      tipo: "opcion",
      etiqueta: "Base de días del año que usa la entidad",
      ayuda: "Revise en el contrato si la entidad usa 360 o 365 días.",
      opciones: [
        { valor: "360", etiqueta: "360 días" },
        { valor: "365", etiqueta: "365 días" },
      ],
      porDefecto: "360",
    },
    { id: "emisor", tipo: "opcion-dato", etiqueta: "Quién emite el certificado", dato: "cr.renta-capital", porDefecto: "general" },
  ],
  calcular(entrada, valores, { redondear }) {
    const interes = redondear((entrada.monto * entrada.tasa * entrada.plazo) / (100 * Number(entrada.base)));
    const tasaImpuesto = enMapa(valores["cr.renta-capital"], entrada.emisor);
    const impuesto = redondear(porcentaje(interes, tasaImpuesto));
    const neto = redondear(interes - impuesto);
    const tbp = valores["cr.tbp"];
    return {
      interes,
      tasaImpuesto,
      impuesto,
      neto,
      total: redondear(entrada.monto + neto),
      tbp: tbp.valor,
      fechaTbp: tbp.fecha,
      observaciones: ["La retención la hace la entidad al pagar los intereses y es el impuesto final: no se declara de nuevo."],
    };
  },
  resultado: [
    { clave: "interes", etiqueta: "Intereses brutos", formato: "moneda" },
    { clave: "tasaImpuesto", etiqueta: "Retención del impuesto", formato: "porcentaje" },
    { clave: "impuesto", etiqueta: "Impuesto retenido", formato: "moneda" },
    { clave: "neto", etiqueta: "Intereses netos", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Monto al vencimiento", formato: "moneda" },
    { clave: "tbp", etiqueta: "Tasa básica pasiva del BCCR (referencia)", formato: "porcentaje" },
    { clave: "fechaTbp", etiqueta: "Fecha de la tasa básica pasiva", formato: "fecha" },
  ],
});
