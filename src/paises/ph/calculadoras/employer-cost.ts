import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { pagibig, philhealth, REQUIERE_PAGIBIG, REQUIERE_PHILHEALTH, REQUIERE_SSS, sss } from "../lib/nomina";

export default definirCalculadora({
  id: "ph.employer-cost",
  mercado: "ph",
  concepto: "costo-empleador",
  slug: "employer-cost",
  estado: "publicado",
  requiere: {
    ...REQUIERE_SSS,
    ...REQUIERE_PHILHEALTH,
    ...REQUIERE_PAGIBIG,
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Employee's monthly basic salary", min: 0, porDefecto: 25000 },
    { id: "empleados", tipo: "entero", etiqueta: "Number of employees on this salary", min: 1, max: 10000, porDefecto: 1 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada("Enter a salary above zero.", "sueldo");
    const s = sss(entrada.sueldo, v);
    const sssEmpleador = redondear(s.empleador + s.ec);
    const ph = philhealth(entrada.sueldo, v, redondear).empleador;
    const pi = pagibig(entrada.sueldo, v, redondear).empleador;
    const cargas = redondear(sssEmpleador + ph + pi);
    const mensual = redondear(entrada.sueldo + cargas);
    return {
      mensual,
      sss: sssEmpleador,
      philhealth: ph,
      pagibig: pi,
      cargas,
      porcentaje: (cargas / entrada.sueldo) * 100,
      total: redondear(mensual * entrada.empleados),
      observaciones: ["This covers the salary and the employer's share of SSS (with EC), PhilHealth and Pag-IBIG. It does not include the 13th month pay or other benefits."],
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Monthly cost of one employee", formato: "moneda", destacada: true },
    { clave: "sss", etiqueta: "SSS employer share and EC", formato: "moneda" },
    { clave: "philhealth", etiqueta: "PhilHealth employer share", formato: "moneda" },
    { clave: "pagibig", etiqueta: "Pag-IBIG employer counterpart", formato: "moneda" },
    { clave: "cargas", etiqueta: "Total employer contributions", formato: "moneda" },
    { clave: "porcentaje", etiqueta: "Contributions as a share of salary", formato: "porcentaje", decimales: 1 },
    { clave: "total", etiqueta: "Monthly cost for all employees", formato: "moneda" },
  ],
});
