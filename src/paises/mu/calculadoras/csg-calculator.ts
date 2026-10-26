import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { baseNsf, csg, REQUIERE_CSG, REQUIERE_NSF, tasasCsg, topesNsf } from "../lib/nomina";

export default definirCalculadora({
  id: "mu.csg-calculator",
  mercado: "mu",
  concepto: "aportes-seguridad-social",
  slug: "csg-calculator",
  estado: "publicado",
  requiere: { ...REQUIERE_CSG, ...REQUIERE_NSF },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic wage or salary", min: 0, porDefecto: 40000, ayuda: "Salary compensation included. Overtime and allowances are left out." },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter the monthly basic wage.", "basico");
    const c = csg(e.basico, tasasCsg(v));
    const base = baseNsf(e.basico, topesNsf(v));
    const csgEmpleado = redondear(c.empleado);
    const csgEmpleador = redondear(c.empleador);
    const nsfEmpleado = redondear(porcentaje(base, v["mu.nsf-employee"]));
    const nsfEmpleador = redondear(porcentaje(base, v["mu.nsf-employer"]));
    const empleado = redondear(csgEmpleado + nsfEmpleado);
    const empleador = redondear(csgEmpleador + nsfEmpleador);
    return {
      empleado,
      csgEmpleado,
      nsfEmpleado,
      empleador,
      csgEmpleador,
      nsfEmpleador,
      total: redondear(empleado + empleador),
      tasaEmpleado: c.tasaEmpleado,
      tasaEmpleador: c.tasaEmpleador,
      baseNsf: base,
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "You pay (CSG and NSF)", formato: "moneda", destacada: true },
    { clave: "csgEmpleado", etiqueta: "CSG, employee share", formato: "moneda" },
    { clave: "nsfEmpleado", etiqueta: "NSF, employee share", formato: "moneda" },
    { clave: "empleador", etiqueta: "Your employer pays (CSG and NSF)", formato: "moneda" },
    { clave: "csgEmpleador", etiqueta: "CSG, employer share", formato: "moneda" },
    { clave: "nsfEmpleador", etiqueta: "NSF, employer share", formato: "moneda" },
    { clave: "total", etiqueta: "Total paid to MRA", formato: "moneda" },
    { clave: "tasaEmpleado", etiqueta: "CSG rate for the employee", formato: "porcentaje", decimales: 1 },
    { clave: "tasaEmpleador", etiqueta: "CSG rate for the employer", formato: "porcentaje", decimales: 1 },
    { clave: "baseNsf", etiqueta: "Wage used for NSF", formato: "moneda" },
  ],
});
