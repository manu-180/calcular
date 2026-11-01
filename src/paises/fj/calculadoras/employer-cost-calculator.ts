import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "fj.employer-cost-calculator",
  mercado: "fj",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: {
    "fj.fnpf-employer-rate": "numero",
    "fj.fnpf-incentive-cap": "numero",
    "fj.fnpf-excess-deduction": "numero",
    "fj.corporate-tax-rate": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross monthly pay", min: 0, porDefecto: 3000 },
    { id: "tasaEmpleador", tipo: "porcentaje", etiqueta: "FNPF rate you pay, if above the mandatory rate", min: 0, max: 100, requerido: false, ayuda: "Leave empty to pay only the mandatory rate." },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter the gross monthly pay.", "bruto");
    const obligatoria = v["fj.fnpf-employer-rate"];
    const tope = v["fj.fnpf-incentive-cap"];
    const tasa = e.tasaEmpleador ?? obligatoria;
    if (tasa < obligatoria) throw new ErrorEntrada("The rate cannot be lower than the mandatory employer rate.", "tasaEmpleador");
    if (tasa > tope) throw new ErrorEntrada("The deduction on the excess applies up to the cap rate. Enter a rate within it.", "tasaEmpleador");
    const fnpf = redondear(porcentaje(e.bruto, tasa));
    const exceso = redondear(porcentaje(e.bruto, tasa - obligatoria));
    const ahorroAnual = redondear(porcentaje(exceso * 12 * (v["fj.fnpf-excess-deduction"] / 100), v["fj.corporate-tax-rate"]));
    const costoMensual = redondear(e.bruto + fnpf);
    return {
      fnpf,
      costoMensual,
      costoAnual: redondear(costoMensual * 12),
      exceso,
      ahorroAnual,
      observaciones: ["The tax saving assumes a company taxed at the standard corporate rate and enough profit to use the deduction."],
    };
  },
  resultado: [
    { clave: "costoMensual", etiqueta: "Total monthly cost of the employee", formato: "moneda", destacada: true },
    { clave: "fnpf", etiqueta: "Employer FNPF contribution", formato: "moneda" },
    { clave: "costoAnual", etiqueta: "Total cost over 12 months", formato: "moneda" },
    { clave: "exceso", etiqueta: "FNPF above the mandatory rate, per month", formato: "moneda", ocultarSiCero: true },
    { clave: "ahorroAnual", etiqueta: "Company tax saved on the excess in a year", formato: "moneda", ocultarSiCero: true },
  ],
});
