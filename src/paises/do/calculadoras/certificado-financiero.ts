import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.certificado-financiero",
  mercado: "do",
  concepto: "plazo-fijo",
  slug: "certificado-financiero",
  estado: "publicado",
  requiere: {
    "do.retencion-intereses": "numero",
  },
  campos: [
    { id: "capital", tipo: "moneda", etiqueta: "Monto a invertir", min: 0 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Tasa de interés anual", ayuda: "La que te ofrece el banco o la asociación.", min: 0, max: 100 },
    { id: "dias", tipo: "entero", etiqueta: "Plazo en días", min: 1, porDefecto: 360 },
    {
      id: "base",
      tipo: "opcion",
      etiqueta: "Días del año que usa la entidad",
      ayuda: "Mira tu contrato. Si no lo sabes, deja 365.",
      opciones: [
        { valor: "365", etiqueta: "365 días" },
        { valor: "360", etiqueta: "360 días" },
      ],
      porDefecto: "365",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const interes = redondear((entrada.capital * entrada.tasa * entrada.dias) / 100 / Number(entrada.base));
    const retencion = redondear(porcentaje(interes, valores["do.retencion-intereses"]));
    const neto = redondear(interes - retencion);
    return {
      interes,
      retencion,
      neto,
      final: redondear(entrada.capital + neto),
      observaciones: [
        "La retención de ISR sobre los intereses es pago definitivo. Si tu renta del año es baja, puedes pedir que te la devuelvan en tu declaración.",
        "Es una estimación con interés simple, pagado al vencimiento. Si la entidad capitaliza o paga cada mes, el monto cambia un poco.",
      ],
    };
  },
  resultado: [
    { clave: "interes", etiqueta: "Intereses brutos", formato: "moneda" },
    { clave: "retencion", etiqueta: "Retención de ISR", formato: "moneda" },
    { clave: "neto", etiqueta: "Intereses netos", formato: "moneda", destacada: true },
    { clave: "final", etiqueta: "Monto al vencimiento", formato: "moneda" },
  ],
});
