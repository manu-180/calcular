import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cuotaTabla, rm } from "../lib/impuestos";

export default definirCalculadora({
  id: "my.eis-calculator",
  mercado: "my",
  concepto: "propio",
  slug: "eis-calculator",
  estado: "publicado",
  requiere: {
    "my.eis": "escala",
    "my.socso-wage-ceiling": "numero",
  },
  campos: [{ id: "sueldo", tipo: "moneda", etiqueta: "Monthly wages", min: 0, porDefecto: 3000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada("Enter the monthly wages.", "sueldo");
    const cuota = cuotaTabla(v["my.eis"], entrada.sueldo);
    const techo = v["my.socso-wage-ceiling"];
    return {
      empleado: cuota,
      empleador: cuota,
      total: redondear(cuota * 2),
      anual: redondear(cuota * 12),
      observaciones: entrada.sueldo > techo ? [`Wages above ${rm(techo)} pay the same as ${rm(techo)}.`] : ([] as string[]),
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "EIS deducted from your wages", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "EIS paid by your employer", formato: "moneda" },
    { clave: "total", etiqueta: "Total EIS a month", formato: "moneda" },
    { clave: "anual", etiqueta: "Your EIS in a year", formato: "moneda" },
  ],
});
