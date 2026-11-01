import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "fj.secondary-employment-tax-calculator",
  mercado: "fj",
  concepto: "propio",
  slug: "secondary-employment-tax-calculator",
  estado: "publicado",
  requiere: {
    "fj.paye-secondary-rate": "numero",
    "fj.paye-no-declaration-rate": "numero",
    "fj.paye-bands": "escala",
  },
  campos: [
    { id: "pago", tipo: "moneda", etiqueta: "Gross pay from the job", min: 0, porDefecto: 1000 },
    {
      id: "codigo",
      tipo: "opcion",
      etiqueta: "Tax code on file with the employer",
      opciones: [
        { valor: "s", etiqueta: "Code S, a second or extra job" },
        { valor: "none", etiqueta: "No declaration given" },
      ],
      porDefecto: "s",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.pago <= 0) throw new ErrorEntrada("Enter the gross pay from the job.", "pago");
    const tasa = e.codigo === "s" ? v["fj.paye-secondary-rate"] : v["fj.paye-no-declaration-rate"];
    const impuesto = redondear(porcentaje(e.pago, tasa));
    return {
      impuesto,
      neto: redondear(e.pago - impuesto),
      tasa,
      umbral: v["fj.paye-bands"][1].desde,
      observaciones: [
        "This is the amount your employer must withhold. Your final tax comes from your total income, so FRCS can still ask for more or refund some.",
      ],
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "PAYE withheld", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Pay after PAYE", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate withheld", formato: "porcentaje", decimales: 0 },
    { clave: "umbral", etiqueta: "Tax free threshold on your main job, per year", formato: "moneda", decimales: 0 },
  ],
});
