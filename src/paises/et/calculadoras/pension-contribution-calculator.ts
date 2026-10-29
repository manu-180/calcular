import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "et.pension-contribution-calculator",
  mercado: "et",
  concepto: "aportes-seguridad-social",
  slug: "pension-contribution-calculator",
  estado: "publicado",
  requiere: {
    "et.pension-employee": "numero",
    "et.pension-employer": "numero",
    "et.pension-min-years": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Gross monthly salary", min: 0, porDefecto: 15000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("Enter the gross monthly salary.", "salario");
    const empleado = redondear(porcentaje(e.salario, v["et.pension-employee"]));
    const empleador = redondear(porcentaje(e.salario, v["et.pension-employer"]));
    return {
      total: redondear(empleado + empleador),
      empleado,
      empleador,
      tasaTotal: v["et.pension-employee"] + v["et.pension-employer"],
      anual: redondear((empleado + empleador) * 12),
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total paid into the pension fund each month", formato: "moneda", destacada: true },
    { clave: "empleado", etiqueta: "Taken from your salary", formato: "moneda" },
    { clave: "empleador", etiqueta: "Paid by your employer", formato: "moneda" },
    { clave: "tasaTotal", etiqueta: "Combined rate", formato: "porcentaje", decimales: 0 },
    { clave: "anual", etiqueta: "Total over 12 months", formato: "moneda" },
  ],
});
