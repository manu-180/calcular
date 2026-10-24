import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ke.housing-levy-calculator",
  mercado: "ke",
  concepto: "propio",
  slug: "housing-levy-calculator",
  estado: "publicado",
  requiere: {
    "ke.housing-levy-rate": "numero",
  },
  campos: [{ id: "bruto", tipo: "moneda", etiqueta: "Gross salary for the month", min: 0, porDefecto: 80000 }],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross salary for the month.", "bruto");
    const empleado = redondear(porcentaje(e.bruto, v["ke.housing-levy-rate"]));
    return {
      empleado,
      empleador: empleado,
      total: redondear(empleado * 2),
      anualEmpleado: redondear(empleado * 12),
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Deducted from your pay", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Paid by your employer", formato: "moneda" },
    { clave: "total", etiqueta: "Total remitted for the month", formato: "moneda" },
    { clave: "anualEmpleado", etiqueta: "Your deductions over 12 months", formato: "moneda" },
  ],
});
