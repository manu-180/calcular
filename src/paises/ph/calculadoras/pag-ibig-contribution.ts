import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { pagibig, REQUIERE_PAGIBIG } from "../lib/nomina";

export default definirCalculadora({
  id: "ph.pag-ibig-contribution",
  mercado: "ph",
  concepto: "propio",
  slug: "pag-ibig-contribution",
  estado: "publicado",
  requiere: REQUIERE_PAGIBIG,
  campos: [{ id: "sueldo", tipo: "moneda", etiqueta: "Monthly compensation (fund salary)", min: 0, porDefecto: 20000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada("Enter your monthly compensation.", "sueldo");
    const p = pagibig(entrada.sueldo, v, redondear);
    return {
      empleado: p.empleado,
      empleador: p.empleador,
      total: redondear(p.empleado + p.empleador),
      base: p.base,
      tasaEmpleado: p.tasaEmpleado,
      anual: redondear((p.empleado + p.empleador) * 12),
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Your monthly savings (employee)", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Employer counterpart", formato: "moneda" },
    { clave: "total", etiqueta: "Total credited a month", formato: "moneda" },
    { clave: "base", etiqueta: "Fund salary used", formato: "moneda" },
    { clave: "tasaEmpleado", etiqueta: "Your rate", formato: "porcentaje", decimales: 0 },
    { clave: "anual", etiqueta: "Total credited in a year", formato: "moneda" },
  ],
});
