import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "us.employer-payroll-tax",
  mercado: "us",
  concepto: "costo-empleador",
  slug: "employer-payroll-tax",
  estado: "publicado",
  requiere: {
    "us.social-security-rate": "numero",
    "us.medicare-rate": "numero",
    "us.social-security-wage-base": "numero",
    "us.futa-rate": "numero",
    "us.futa-credit": "numero",
    "us.futa-wage-base": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Yearly wages per employee", min: 0, porDefecto: 50000 },
    { id: "empleados", tipo: "entero", etiqueta: "Number of employees at that pay", min: 1, porDefecto: 1 },
    { id: "sutaTasa", tipo: "porcentaje", etiqueta: "Your state unemployment tax rate (SUTA)", min: 0, max: 20, requerido: false, ayuda: "It's on the rate notice from your state workforce agency." },
    { id: "sutaBase", tipo: "moneda", etiqueta: "Your state's SUTA wage base", min: 0, requerido: false, ayuda: "Leave it blank to apply the rate to all wages." },
  ],
  calcular(entrada, valores, { redondear }) {
    const w = entrada.salario;
    const socialSecurity = redondear(porcentaje(Math.min(w, valores["us.social-security-wage-base"]), valores["us.social-security-rate"]));
    const medicare = redondear(porcentaje(w, valores["us.medicare-rate"]));
    const futa = redondear(porcentaje(Math.min(w, valores["us.futa-wage-base"]), valores["us.futa-rate"] - valores["us.futa-credit"]));
    const suta = entrada.sutaTasa === null ? 0 : redondear(porcentaje(Math.min(w, entrada.sutaBase ?? w), entrada.sutaTasa));
    const impuestos = redondear(socialSecurity + medicare + futa + suta);
    const costo = redondear(w + impuestos);
    return {
      socialSecurity,
      medicare,
      futa,
      suta,
      impuestos,
      costo,
      porcentajeExtra: w > 0 ? redondear((impuestos / w) * 100) : 0,
      costoTotal: redondear(costo * entrada.empleados),
      observaciones: [
        "FUTA assumes you pay your state unemployment tax on time and get the full credit. Employers in a credit reduction state pay more.",
        "Benefits, workers' compensation insurance and local payroll taxes are not included.",
      ],
    };
  },
  resultado: [
    { clave: "socialSecurity", etiqueta: "Employer Social Security", formato: "moneda" },
    { clave: "medicare", etiqueta: "Employer Medicare", formato: "moneda" },
    { clave: "futa", etiqueta: "Federal unemployment tax (FUTA)", formato: "moneda" },
    { clave: "suta", etiqueta: "State unemployment tax (SUTA)", formato: "moneda", ocultarSiCero: true },
    { clave: "impuestos", etiqueta: "Payroll taxes per employee", formato: "moneda" },
    { clave: "porcentajeExtra", etiqueta: "Taxes on top of wages", formato: "porcentaje" },
    { clave: "costo", etiqueta: "Total cost per employee", formato: "moneda", destacada: true },
    { clave: "costoTotal", etiqueta: "Total cost for all employees", formato: "moneda" },
  ],
});
