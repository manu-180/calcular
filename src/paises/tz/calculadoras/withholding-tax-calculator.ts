import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tz.withholding-tax-calculator",
  mercado: "tz",
  concepto: "retencion-honorarios",
  slug: "withholding-tax-calculator",
  estado: "publicado",
  requiere: {
    "tz.wht-resident": "mapa",
    "tz.wht-non-resident": "mapa",
  },
  campos: [
    { id: "importe", tipo: "moneda", etiqueta: "Gross amount of the payment", min: 0, porDefecto: 1000000 },
    { id: "tipo", tipo: "opcion-dato", etiqueta: "Type of payment", dato: "tz.wht-resident", porDefecto: "service-fees" },
    {
      id: "residencia",
      tipo: "opcion",
      etiqueta: "Who receives it",
      opciones: [
        { valor: "resident", etiqueta: "A resident" },
        { valor: "non-resident", etiqueta: "A non-resident" },
      ],
      porDefecto: "resident",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.importe <= 0) throw new ErrorEntrada("Enter the gross amount of the payment.", "importe");
    const tabla = e.residencia === "resident" ? v["tz.wht-resident"] : v["tz.wht-non-resident"];
    const tasa = tabla[e.tipo];
    if (tasa === undefined) throw new ErrorEntrada("TRA does not list a rate for this payment to a non-resident.", "tipo");
    const retencion = redondear(porcentaje(e.importe, tasa));
    return { retencion, neto: redondear(e.importe - retencion), tasa };
  },
  resultado: [
    { clave: "retencion", etiqueta: "Withholding tax", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Amount the payee receives", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate", formato: "porcentaje", decimales: 0 },
  ],
});
