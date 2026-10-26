import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ug.employer-cost-calculator",
  mercado: "ug",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: {
    "ug.paye-bands": "escala",
    "ug.nssf-employee": "numero",
    "ug.nssf-employer": "numero",
  },
  campos: [
    { id: "mensual", tipo: "moneda", etiqueta: "Employee's monthly gross pay", min: 0, porDefecto: 1500000 },
    { id: "personas", tipo: "entero", etiqueta: "Number of employees on this pay", min: 1, max: 10000, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.mensual <= 0) throw new ErrorEntrada("Enter the monthly gross pay.", "mensual");
    const nssfEmpleador = redondear(porcentaje(e.mensual, v["ug.nssf-employer"]));
    const nssfEmpleado = redondear(porcentaje(e.mensual, v["ug.nssf-employee"]));
    const paye = redondear(aplicarEscalaMarginal(v["ug.paye-bands"], e.mensual));
    const costo = redondear(e.mensual + nssfEmpleador);
    return {
      costo,
      nssfEmpleador,
      remesa: redondear(paye + nssfEmpleado + nssfEmpleador),
      neto: redondear(e.mensual - paye - nssfEmpleado),
      total: redondear(costo * e.personas),
      anual: redondear(costo * e.personas * 12),
    };
  },
  resultado: [
    { clave: "costo", etiqueta: "Monthly cost of one employee", formato: "moneda", destacada: true },
    { clave: "nssfEmpleador", etiqueta: "Employer NSSF (10%)", formato: "moneda" },
    { clave: "remesa", etiqueta: "PAYE and NSSF to remit for one employee", formato: "moneda" },
    { clave: "neto", etiqueta: "Employee's take-home pay", formato: "moneda" },
    { clave: "total", etiqueta: "Monthly cost for all employees entered", formato: "moneda" },
    { clave: "anual", etiqueta: "Cost a year for all employees entered", formato: "moneda" },
  ],
});
