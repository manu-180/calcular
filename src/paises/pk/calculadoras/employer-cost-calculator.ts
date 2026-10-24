import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pk.employer-cost-calculator",
  mercado: "pk",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: {
    "pk.eobi-employer": "numero",
    "pk.minimum-wage": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Gross monthly salary", min: 0, porDefecto: 80000 },
    { id: "pf", tipo: "porcentaje", etiqueta: "Employer provident fund share (if any)", min: 0, max: 20, porDefecto: 0 },
    { id: "empleados", tipo: "entero", etiqueta: "Number of employees on this salary", min: 1, max: 100000, porDefecto: 1 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada("Enter the monthly salary.", "sueldo");
    const eobi = redondear(porcentaje(v["pk.minimum-wage"], v["pk.eobi-employer"]));
    const pf = redondear(porcentaje(entrada.sueldo, entrada.pf));
    const costo = redondear(entrada.sueldo + eobi + pf);
    return { costo, eobi, pf, anual: redondear(costo * 12 * entrada.empleados) };
  },
  resultado: [
    { clave: "costo", etiqueta: "Cost to the employer a month (per employee)", formato: "moneda", destacada: true },
    { clave: "eobi", etiqueta: "EOBI employer share", formato: "moneda" },
    { clave: "pf", etiqueta: "Employer provident fund", formato: "moneda", ocultarSiCero: true },
    { clave: "anual", etiqueta: "Cost for the year (all employees)", formato: "moneda" },
  ],
});
