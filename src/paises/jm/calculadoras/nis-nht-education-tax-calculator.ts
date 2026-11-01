import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { nisMes } from "../lib/nomina";

export default definirCalculadora({
  id: "jm.nis-nht-education-tax-calculator",
  mercado: "jm",
  concepto: "aportes-seguridad-social",
  slug: "nis-nht-education-tax-calculator",
  estado: "publicado",
  requiere: {
    "jm.nis-employee-rate": "numero",
    "jm.nis-employer-rate": "numero",
    "jm.nis-ceiling": "numero",
    "jm.nht-employee-rate": "numero",
    "jm.nht-employer-rate": "numero",
    "jm.education-tax-employee-rate": "numero",
    "jm.education-tax-employer-rate": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay for the month", min: 0, porDefecto: 250000 },
    { id: "pension", tipo: "moneda", etiqueta: "Approved pension contribution for the month", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the month.", "bruto");
    if (e.pension > e.bruto) throw new ErrorEntrada("The pension contribution cannot be more than your pay.", "pension");
    const nisEmpleado = redondear(nisMes(e.bruto, v["jm.nis-employee-rate"], v["jm.nis-ceiling"]));
    const nisEmpleador = redondear(nisMes(e.bruto, v["jm.nis-employer-rate"], v["jm.nis-ceiling"]));
    const nhtEmpleado = redondear(porcentaje(e.bruto, v["jm.nht-employee-rate"]));
    const nhtEmpleador = redondear(porcentaje(e.bruto, v["jm.nht-employer-rate"]));
    const ingresoEstatutario = redondear(Math.max(0, e.bruto - nisEmpleado - e.pension));
    const edEmpleado = redondear(porcentaje(ingresoEstatutario, v["jm.education-tax-employee-rate"]));
    const edEmpleador = redondear(porcentaje(ingresoEstatutario, v["jm.education-tax-employer-rate"]));
    const totalEmpleado = redondear(nisEmpleado + nhtEmpleado + edEmpleado);
    const totalEmpleador = redondear(nisEmpleador + nhtEmpleador + edEmpleador);
    const observaciones: string[] = [];
    if (nisEmpleado < porcentaje(e.bruto, v["jm.nis-employee-rate"])) observaciones.push("Your pay is above the NIS wage ceiling, so NIS stays at the monthly maximum.");
    return {
      totalEmpleado,
      nisEmpleado,
      nhtEmpleado,
      edEmpleado,
      ingresoEstatutario,
      totalEmpleador,
      nisEmpleador,
      nhtEmpleador,
      edEmpleador,
      total: redondear(totalEmpleado + totalEmpleador),
      observaciones,
    };
  },
  resultado: [
    { clave: "totalEmpleado", etiqueta: "Taken from your pay", formato: "moneda", destacada: true },
    { clave: "nisEmpleado", etiqueta: "NIS, your share", formato: "moneda" },
    { clave: "nhtEmpleado", etiqueta: "NHT, your share", formato: "moneda" },
    { clave: "edEmpleado", etiqueta: "Education Tax, your share", formato: "moneda" },
    { clave: "ingresoEstatutario", etiqueta: "Statutory income used for Education Tax", formato: "moneda" },
    { clave: "totalEmpleador", etiqueta: "Paid by your employer", formato: "moneda" },
    { clave: "nisEmpleador", etiqueta: "NIS, employer share", formato: "moneda" },
    { clave: "nhtEmpleador", etiqueta: "NHT, employer share", formato: "moneda" },
    { clave: "edEmpleador", etiqueta: "Education Tax, employer share", formato: "moneda" },
    { clave: "total", etiqueta: "Total sent to TAJ for these three", formato: "moneda" },
  ],
});
