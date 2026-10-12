import { definirCalculadora, porcentaje } from "@/motor/calculo";

// La exención (LISR art. 4 num. 5) mira el saldo promedio de TODOS los depósitos de la persona, no solo
// este: por eso se pide el saldo de las otras cuentas. La ley dice "inferior a": igual al límite ya retiene.
export default definirCalculadora({
  id: "sv.plazo-fijo",
  mercado: "sv",
  concepto: "plazo-fijo",
  slug: "plazo-fijo",
  estado: "publicado",
  requiere: {
    "sv.retencion-intereses": "numero",
    "sv.intereses-exento-saldo": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto del depósito", min: 0 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Tasa de interés anual", min: 0, max: 100 },
    { id: "dias", tipo: "entero", etiqueta: "Plazo en días", min: 1, max: 3650, porDefecto: 180 },
    {
      id: "titular",
      tipo: "opcion",
      etiqueta: "A nombre de quién está",
      opciones: [
        { valor: "persona", etiqueta: "Una persona" },
        { valor: "empresa", etiqueta: "Una empresa" },
      ],
      porDefecto: "persona",
    },
    {
      id: "otrosDepositos",
      tipo: "moneda",
      etiqueta: "Saldo de sus otras cuentas y depósitos",
      ayuda: "El promedio del mes en sus cuentas de ahorro, corrientes y otros depósitos.",
      min: 0,
      porDefecto: 0,
    },
    {
      id: "base",
      tipo: "opcion",
      etiqueta: "Días del año que usa su banco",
      opciones: [
        { valor: "365", etiqueta: "365 días" },
        { valor: "360", etiqueta: "360 días" },
      ],
      porDefecto: "365",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const interes = redondear((entrada.monto * entrada.tasa * entrada.dias) / 100 / Number(entrada.base));
    const saldo = entrada.monto + entrada.otrosDepositos;
    const exento = entrada.titular === "persona" && saldo < valores["sv.intereses-exento-saldo"];
    const retencion = exento ? 0 : redondear(porcentaje(interes, valores["sv.retencion-intereses"]));
    return {
      interes,
      retencion,
      neto: redondear(interes - retencion),
      total: redondear(entrada.monto + interes - retencion),
      observaciones: [
        exento
          ? "Sus intereses no pagan renta porque su saldo promedio en depósitos es menor al límite de la ley."
          : "El banco le retiene la renta al pagarle los intereses. Si el depósito es de una persona, con eso queda pagado el impuesto.",
      ],
    };
  },
  resultado: [
    { clave: "interes", etiqueta: "Intereses", formato: "moneda" },
    { clave: "retencion", etiqueta: "Retención de renta", formato: "moneda" },
    { clave: "neto", etiqueta: "Intereses que recibe", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Total al vencimiento", formato: "moneda" },
  ],
});
