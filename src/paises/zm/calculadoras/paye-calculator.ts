import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoPorBanda, paye, tasaMarginal } from "../lib/nomina";

export default definirCalculadora({
  id: "zm.paye-calculator",
  mercado: "zm",
  concepto: "impuesto-renta",
  slug: "paye-calculator",
  estado: "publicado",
  requiere: {
    "zm.paye-bands": "escala",
  },
  campos: [
    {
      id: "bruto",
      tipo: "moneda",
      etiqueta: "Gross pay for the month",
      min: 0,
      porDefecto: 15000,
      ayuda: "Basic pay plus taxable allowances such as housing, transport and lunch.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the month.", "bruto");
    const bandas = v["zm.paye-bands"];
    const impuesto = redondear(paye(bandas, e.bruto));
    const [b1, b2, b3, b4] = impuestoPorBanda(bandas, e.bruto).map((x) => redondear(x));
    return {
      paye: impuesto,
      neto: redondear(e.bruto - impuesto),
      banda1: b1,
      banda2: b2,
      banda3: b3,
      banda4: b4,
      anual: redondear(impuesto * 12),
      efectiva: (impuesto / e.bruto) * 100,
      marginal: tasaMarginal(bandas, e.bruto),
    };
  },
  resultado: [
    { clave: "paye", etiqueta: "PAYE for the month", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Pay after PAYE", formato: "moneda" },
    { clave: "banda1", etiqueta: "Tax on the first band", formato: "moneda" },
    { clave: "banda2", etiqueta: "Tax on the second band", formato: "moneda" },
    { clave: "banda3", etiqueta: "Tax on the third band", formato: "moneda" },
    { clave: "banda4", etiqueta: "Tax on the top band", formato: "moneda" },
    { clave: "anual", etiqueta: "PAYE over 12 months", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Share of your pay that goes in PAYE", formato: "porcentaje", decimales: 1 },
    { clave: "marginal", etiqueta: "Rate on your last kwacha", formato: "porcentaje", decimales: 0 },
  ],
});
