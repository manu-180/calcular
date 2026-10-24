import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { APORTE_NSSF } from "../lib/nomina";

export default definirCalculadora({
  id: "tz.employer-cost-calculator",
  mercado: "tz",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: {
    "tz.nssf-rate": "numero",
    "tz.sdl-rate": "numero",
    "tz.sdl-min-employees": "numero",
    "tz.wcf-rate": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross monthly salary of the employee", min: 0, porDefecto: 1000000 },
    { id: "aporte", tipo: "opcion", etiqueta: "Employee's share of NSSF", opciones: APORTE_NSSF, porDefecto: "10" },
    { id: "empleados", tipo: "entero", etiqueta: "Total employees in your business", min: 1, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter the gross monthly salary.", "bruto");
    const nssf = redondear(porcentaje(e.bruto, v["tz.nssf-rate"] - Number(e.aporte)));
    const sdl = e.empleados >= v["tz.sdl-min-employees"] ? redondear(porcentaje(e.bruto, v["tz.sdl-rate"])) : 0;
    const wcf = redondear(porcentaje(e.bruto, v["tz.wcf-rate"]));
    const costo = redondear(e.bruto + nssf + sdl + wcf);
    const observaciones = sdl === 0 ? ["SDL applies only to employers with ten or more employees."] : [];
    return { costo, nssf, sdl, wcf, cargas: redondear(nssf + sdl + wcf), anual: redondear(costo * 12), observaciones };
  },
  resultado: [
    { clave: "costo", etiqueta: "Monthly cost of this employee", formato: "moneda", destacada: true },
    { clave: "nssf", etiqueta: "Employer NSSF", formato: "moneda" },
    { clave: "sdl", etiqueta: "Skills Development Levy", formato: "moneda" },
    { clave: "wcf", etiqueta: "Workers Compensation Fund", formato: "moneda" },
    { clave: "cargas", etiqueta: "Statutory costs on top of salary", formato: "moneda" },
    { clave: "anual", etiqueta: "Cost over 12 months", formato: "moneda" },
  ],
});
