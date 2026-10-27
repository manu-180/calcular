import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lr.nasscorp-contribution",
  mercado: "lr",
  concepto: "aportes-seguridad-social",
  slug: "nasscorp-contribution",
  estado: "publicado",
  requiere: {
    "lr.nasscorp-employee": "numero",
    "lr.nasscorp-employer": "numero",
    "lr.nasscorp-injury": "numero",
  },
  campos: [{ id: "salario", tipo: "moneda", etiqueta: "Gross monthly earnings", min: 0, porDefecto: 40000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your gross monthly earnings.", "salario");
    const empleado = redondear(porcentaje(entrada.salario, v["lr.nasscorp-employee"]));
    const pensionEmpleador = redondear(porcentaje(entrada.salario, v["lr.nasscorp-employer"]));
    const riesgo = redondear(porcentaje(entrada.salario, v["lr.nasscorp-injury"]));
    const empleador = redondear(pensionEmpleador + riesgo);
    return {
      empleado,
      pensionEmpleador,
      riesgo,
      empleador,
      pension: redondear(empleado + pensionEmpleador),
      total: redondear(empleado + empleador),
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total paid to NASSCORP a month", formato: "moneda", destacada: true },
    { clave: "empleado", etiqueta: "Deducted from your pay (pension)", formato: "moneda" },
    { clave: "pensionEmpleador", etiqueta: "Employer pension contribution", formato: "moneda" },
    { clave: "riesgo", etiqueta: "Employer Employment Injury Scheme contribution", formato: "moneda" },
    { clave: "empleador", etiqueta: "Total paid by the employer", formato: "moneda" },
    { clave: "pension", etiqueta: "Credited to the National Pension Scheme", formato: "moneda" },
  ],
});
