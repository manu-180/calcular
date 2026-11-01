import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bb.employer-cost-calculator",
  mercado: "bb",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: {
    "bb.nis-employer-rate": "numero",
    "bb.rrf-employer-rate": "numero",
    "bb.nis-ceiling-monthly": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross monthly salary of the employee", min: 0, porDefecto: 4500 },
    { id: "empleados", tipo: "entero", etiqueta: "Number of employees on this salary", min: 1, max: 1000, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter the gross monthly salary.", "bruto");
    if (e.empleados < 1) throw new ErrorEntrada("Enter at least one employee.", "empleados");
    const nis = redondear(porcentaje(Math.min(e.bruto, v["bb.nis-ceiling-monthly"]), v["bb.nis-employer-rate"]));
    const rrf = redondear(porcentaje(e.bruto, v["bb.rrf-employer-rate"]));
    const costoMes = redondear(e.bruto + nis + rrf);
    return {
      costoMes,
      nis,
      rrf,
      costoAnual: redondear(costoMes * 12),
      equipoMes: redondear(costoMes * e.empleados),
      equipoAnual: redondear(costoMes * e.empleados * 12),
      recargo: ((nis + rrf) / e.bruto) * 100,
    };
  },
  resultado: [
    { clave: "costoMes", etiqueta: "Monthly cost of one employee", formato: "moneda", destacada: true },
    { clave: "nis", etiqueta: "Employer NIS", formato: "moneda" },
    { clave: "rrf", etiqueta: "Employer Resilience and Regeneration Fund", formato: "moneda" },
    { clave: "costoAnual", etiqueta: "Yearly cost of one employee", formato: "moneda" },
    { clave: "equipoMes", etiqueta: "Monthly cost for all of them", formato: "moneda" },
    { clave: "equipoAnual", etiqueta: "Yearly cost for all of them", formato: "moneda" },
    { clave: "recargo", etiqueta: "On top of the salary", formato: "porcentaje", decimales: 2 },
  ],
});
