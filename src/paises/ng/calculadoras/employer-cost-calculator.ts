import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ng.employer-cost-calculator",
  mercado: "ng",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: {
    "ng.pension-employer": "numero",
    "ng.nsitf-rate": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Employee's gross pay a month", min: 0, porDefecto: 500000 },
    { id: "pensionable", tipo: "moneda", etiqueta: "Basic, housing and transport a month", min: 0, porDefecto: 450000, ayuda: "The base for pension contributions." },
    { id: "empleados", tipo: "entero", etiqueta: "Number of employees on this pay", min: 1, max: 100000, porDefecto: 1 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.bruto <= 0) throw new ErrorEntrada("Enter the gross pay.", "bruto");
    if (entrada.pensionable > entrada.bruto) throw new ErrorEntrada("The pension base cannot be more than gross pay.", "pensionable");
    const pension = redondear(porcentaje(entrada.pensionable, v["ng.pension-employer"]));
    const nsitf = redondear(porcentaje(entrada.bruto, v["ng.nsitf-rate"]));
    const costo = redondear(entrada.bruto + pension + nsitf);
    return {
      costo,
      pension,
      nsitf,
      anual: redondear(costo * 12 * entrada.empleados),
      porcentajeExtra: ((pension + nsitf) / entrada.bruto) * 100,
    };
  },
  resultado: [
    { clave: "costo", etiqueta: "Cost to the employer a month (per employee)", formato: "moneda", destacada: true },
    { clave: "pension", etiqueta: "Employer pension contribution", formato: "moneda" },
    { clave: "nsitf", etiqueta: "Employees' Compensation (NSITF)", formato: "moneda" },
    { clave: "anual", etiqueta: "Cost for the year (all employees)", formato: "moneda" },
    { clave: "porcentajeExtra", etiqueta: "On top of gross pay", formato: "porcentaje", decimales: 2 },
  ],
});
