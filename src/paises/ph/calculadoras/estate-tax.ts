import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { peso } from "../lib/nomina";

export default definirCalculadora({
  id: "ph.estate-tax",
  mercado: "ph",
  concepto: "propio",
  slug: "estate-tax",
  estado: "publicado",
  requiere: {
    "ph.estate-tax-rate": "numero",
    "ph.estate-standard-deduction": "numero",
    "ph.estate-family-home-cap": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross estate (everything the person left)", min: 0, porDefecto: 12000000 },
    { id: "casa", tipo: "moneda", etiqueta: "Fair market value of the family home (included above)", min: 0, porDefecto: 4000000 },
    {
      id: "otras",
      tipo: "moneda",
      etiqueta: "Other deductions (claims against the estate, unpaid debts)",
      min: 0,
      porDefecto: 0,
      ayuda: "Debts must meet the conditions of Section 86 of the Tax Code, such as a notarized debt instrument.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.bruto <= 0) throw new ErrorEntrada("Enter the value of the gross estate.", "bruto");
    if (entrada.casa > entrada.bruto) throw new ErrorEntrada("The family home is part of the gross estate, so it cannot be worth more.", "casa");
    const estandar = v["ph.estate-standard-deduction"];
    const casa = Math.min(entrada.casa, v["ph.estate-family-home-cap"]);
    const deducciones = estandar + casa + entrada.otras;
    const neto = Math.max(0, entrada.bruto - deducciones);
    const impuesto = redondear(porcentaje(neto, v["ph.estate-tax-rate"]));
    const observaciones = ["For the estate of a citizen or resident of the Philippines. Other deductions in Section 86 of the Tax Code can lower the tax further."];
    if (entrada.casa > casa) observaciones.push(`Only ${peso(casa)} of the family home is deductible. The rest is taxed.`);
    return {
      impuesto,
      neto: redondear(neto),
      deducciones: redondear(deducciones),
      estandar,
      casa: redondear(casa),
      efectiva: (impuesto / entrada.bruto) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Estate tax", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Net taxable estate", formato: "moneda" },
    { clave: "deducciones", etiqueta: "Total deductions", formato: "moneda" },
    { clave: "estandar", etiqueta: "Standard deduction", formato: "moneda" },
    { clave: "casa", etiqueta: "Family home deduction", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Tax as a share of the gross estate", formato: "porcentaje", decimales: 2 },
  ],
});
