import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ke.withholding-tax-calculator",
  mercado: "ke",
  concepto: "retencion-honorarios",
  slug: "withholding-tax-calculator",
  estado: "publicado",
  requiere: {
    "ke.wht-resident": "mapa",
    "ke.wht-non-resident": "mapa",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Gross amount of the payment", min: 0, porDefecto: 100000 },
    { id: "tipo", tipo: "opcion-dato", etiqueta: "Type of payment", dato: "ke.wht-resident", porDefecto: "professional" },
    {
      id: "residencia",
      tipo: "opcion",
      etiqueta: "Who receives it",
      opciones: [
        { valor: "resident", etiqueta: "A resident of Kenya" },
        { valor: "non-resident", etiqueta: "A non-resident" },
      ],
      porDefecto: "resident",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.importe <= 0) throw new ErrorEntrada("Enter the gross amount of the payment.", "importe");
    const tasa = enMapa(e.residencia === "resident" ? v["ke.wht-resident"] : v["ke.wht-non-resident"], e.tipo);
    const retencion = redondear(porcentaje(e.importe, tasa));
    return { retencion, neto: redondear(e.importe - retencion), tasa };
  },
  resultado: [
    { clave: "retencion", etiqueta: "Withholding tax to deduct", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Amount the payee receives", formato: "moneda" },
    { clave: "tasa", etiqueta: "Withholding rate", formato: "porcentaje", decimales: 1 },
  ],
});
