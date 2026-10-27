import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { brutoDesdeNeto, impuesto } from "../lib/impuestos";

export default definirCalculadora({
  id: "bw.tax-free-salary-gross-up",
  mercado: "bw",
  concepto: "propio",
  slug: "tax-free-salary-gross-up",
  estado: "publicado",
  requiere: {
    "bw.paye-resident": "escala",
    "bw.paye-non-resident": "escala",
  },
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "Net salary promised a month", min: 0, porDefecto: 7500 },
    {
      id: "residencia",
      tipo: "opcion",
      etiqueta: "Tax residence of the employee",
      opciones: [
        { valor: "resident", etiqueta: "Resident of Botswana" },
        { valor: "non-resident", etiqueta: "Non-resident" },
      ],
      porDefecto: "resident",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.neto <= 0) throw new ErrorEntrada("Enter the net salary.", "neto");
    const escala = entrada.residencia === "resident" ? v["bw.paye-resident"] : v["bw.paye-non-resident"];
    const brutoAnual = brutoDesdeNeto(escala, entrada.neto * 12);
    const impuestoAnual = impuesto(escala, brutoAnual);
    const paye = redondear(impuestoAnual / 12);
    return {
      paye,
      bruto: redondear(entrada.neto + paye),
      impuestoAnual: redondear(impuestoAnual),
      brutoAnual: redondear(brutoAnual),
    };
  },
  resultado: [
    { clave: "paye", etiqueta: "PAYE the employer pays a month", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Grossed-up salary a month", formato: "moneda" },
    { clave: "impuestoAnual", etiqueta: "PAYE a year", formato: "moneda" },
    { clave: "brutoAnual", etiqueta: "Grossed-up salary a year", formato: "moneda" },
  ],
});
