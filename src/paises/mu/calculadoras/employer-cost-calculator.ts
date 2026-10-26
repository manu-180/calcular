import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { baseNsf, csg, REQUIERE_CSG, REQUIERE_NSF, tasasCsg, topesNsf } from "../lib/nomina";

export default definirCalculadora({
  id: "mu.employer-cost-calculator",
  mercado: "mu",
  concepto: "costo-empleador",
  slug: "employer-cost-calculator",
  estado: "publicado",
  requiere: {
    ...REQUIERE_CSG,
    ...REQUIERE_NSF,
    "mu.training-levy": "numero",
    "mu.prgf-rate": "numero",
    "mu.prgf-wage-ceiling": "numero",
    "mu.bonus-wage-ceiling": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic wage", min: 0, porDefecto: 30000, ayuda: "Salary compensation included." },
    { id: "extras", tipo: "moneda", etiqueta: "Overtime and allowances in a normal month", min: 0, porDefecto: 0 },
    { id: "pensionPrivada", tipo: "si-no", etiqueta: "The company has its own private pension scheme", porDefecto: false, ayuda: "Then PRGF contributions are not due." },
    { id: "bono", tipo: "si-no", etiqueta: "Set aside the end of year bonus each month", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter the monthly basic wage.", "basico");
    const c = csg(e.basico, tasasCsg(v));
    const csgEmpleador = redondear(c.empleador);
    const nsf = redondear(porcentaje(baseNsf(e.basico, topesNsf(v)), v["mu.nsf-employer"]));
    const levy = redondear(porcentaje(e.basico, v["mu.training-levy"]));
    const prgf = !e.pensionPrivada && e.basico <= v["mu.prgf-wage-ceiling"] ? redondear(porcentaje(e.basico, v["mu.prgf-rate"])) : 0;
    const conBono = e.bono && e.basico <= v["mu.bonus-wage-ceiling"];
    const bonoMes = conBono ? (e.basico + e.extras) / 12 : 0;
    const bono = redondear(bonoMes + porcentaje(bonoMes, c.tasaEmpleador));
    const sueldo = redondear(e.basico + e.extras);
    const contribuciones = redondear(csgEmpleador + nsf + levy + prgf);
    const costoMensual = redondear(sueldo + contribuciones + bono);
    const observaciones: string[] = [];
    if (e.bono && !conBono) observaciones.push(`The statutory end of year bonus covers workers with a basic wage up to Rs ${v["mu.bonus-wage-ceiling"].toLocaleString("en-MU")}, so it is left out here.`);
    return {
      costoMensual,
      sueldo,
      csg: csgEmpleador,
      nsf,
      levy,
      prgf,
      bono,
      contribuciones,
      costoAnual: redondear(costoMensual * 12),
      sobreSueldo: ((costoMensual - sueldo) / sueldo) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "costoMensual", etiqueta: "Monthly cost of the employee", formato: "moneda", destacada: true },
    { clave: "sueldo", etiqueta: "Gross pay", formato: "moneda" },
    { clave: "csg", etiqueta: "CSG, employer share", formato: "moneda" },
    { clave: "nsf", etiqueta: "NSF, employer share", formato: "moneda" },
    { clave: "levy", etiqueta: "Training levy", formato: "moneda" },
    { clave: "prgf", etiqueta: "PRGF contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "bono", etiqueta: "End of year bonus set aside, with its CSG", formato: "moneda", ocultarSiCero: true },
    { clave: "contribuciones", etiqueta: "Contributions and levy", formato: "moneda" },
    { clave: "costoAnual", etiqueta: "Cost over 12 months", formato: "moneda" },
    { clave: "sobreSueldo", etiqueta: "Cost on top of gross pay", formato: "porcentaje", decimales: 1 },
  ],
});
