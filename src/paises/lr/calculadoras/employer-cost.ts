import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lr.employer-cost",
  mercado: "lr",
  concepto: "costo-empleador",
  slug: "employer-cost",
  estado: "publicado",
  requiere: {
    "lr.nasscorp-employer": "numero",
    "lr.nasscorp-injury": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Gross monthly salary", min: 0, porDefecto: 40000 },
    { id: "empleados", tipo: "entero", etiqueta: "Number of employees on this salary", min: 1, porDefecto: 1 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter the gross monthly salary.", "salario");
    if (entrada.empleados < 1) throw new ErrorEntrada("Enter at least one employee.", "empleados");
    const pension = redondear(porcentaje(entrada.salario, v["lr.nasscorp-employer"]));
    const riesgo = redondear(porcentaje(entrada.salario, v["lr.nasscorp-injury"]));
    const mensual = redondear(entrada.salario + pension + riesgo);
    return {
      mensual,
      pension,
      riesgo,
      anual: redondear(mensual * 12),
      total: redondear(mensual * entrada.empleados),
      totalAnual: redondear(mensual * entrada.empleados * 12),
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Cost of one employee a month", formato: "moneda", destacada: true },
    { clave: "pension", etiqueta: "NASSCORP pension (employer share)", formato: "moneda" },
    { clave: "riesgo", etiqueta: "NASSCORP Employment Injury Scheme", formato: "moneda" },
    { clave: "anual", etiqueta: "Cost of one employee a year", formato: "moneda" },
    { clave: "total", etiqueta: "Cost of all these employees a month", formato: "moneda" },
    { clave: "totalAnual", etiqueta: "Cost of all these employees a year", formato: "moneda" },
  ],
});
