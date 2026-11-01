import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { noNegativo, valorHora } from "../lib/nomina";

export default definirCalculadora({
  id: "na.overtime-calculator",
  mercado: "na",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "na.weeks-per-month": "numero",
    "na.max-weekly-hours": "numero",
    "na.overtime-factor": "numero",
    "na.overtime-sunday-holiday-factor": "numero",
    "na.night-work-rate": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Basic wage a month", min: 0, porDefecto: 12000 },
    { id: "horasSemana", tipo: "numero", etiqueta: "Ordinary hours a week", min: 1, max: 60, porDefecto: 45 },
    { id: "extra", tipo: "numero", etiqueta: "Overtime hours on normal days", min: 0, porDefecto: 10 },
    {
      id: "extraDomingo",
      tipo: "numero",
      etiqueta: "Overtime hours on a Sunday or public holiday you normally work",
      min: 0,
      porDefecto: 0,
    },
    { id: "noche", tipo: "numero", etiqueta: "Ordinary hours worked between 20h00 and 07h00", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("Enter your basic wage.", "salario");
    if (e.horasSemana <= 0) throw new ErrorEntrada("Enter your ordinary hours a week.", "horasSemana");
    noNegativo(e.extra, "extra", "Hours cannot be negative.");
    noNegativo(e.extraDomingo, "extraDomingo", "Hours cannot be negative.");
    noNegativo(e.noche, "noche", "Hours cannot be negative.");
    const horasLey = Math.min(e.horasSemana, v["na.max-weekly-hours"]);
    const hora = redondear(valorHora(e.salario, v["na.weeks-per-month"], horasLey));
    const pagoExtra = redondear(e.extra * hora * v["na.overtime-factor"]);
    const pagoDomingo = redondear(e.extraDomingo * hora * v["na.overtime-sunday-holiday-factor"]);
    const pagoNoche = redondear(e.noche * porcentaje(hora, v["na.night-work-rate"]));
    const total = redondear(pagoExtra + pagoDomingo + pagoNoche);
    const observaciones: string[] = [];
    if (e.horasSemana > v["na.max-weekly-hours"]) {
      observaciones.push("The hourly rate uses 45 ordinary hours, the most the Labour Act allows for most employees. Hours above that are overtime.");
    }
    observaciones.push("Overtime needs your agreement and is limited to 10 hours a week and 3 hours a day, unless the Ministry approves more.");
    return { total, hora, pagoExtra, pagoDomingo, pagoNoche, conSalario: redondear(e.salario + total), observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Extra pay", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Your hourly basic wage", formato: "moneda" },
    { clave: "pagoExtra", etiqueta: "Overtime on normal days", formato: "moneda", ocultarSiCero: true },
    { clave: "pagoDomingo", etiqueta: "Overtime on Sundays and public holidays", formato: "moneda", ocultarSiCero: true },
    { clave: "pagoNoche", etiqueta: "Night work allowance", formato: "moneda", ocultarSiCero: true },
    { clave: "conSalario", etiqueta: "Basic wage plus extra pay", formato: "moneda" },
  ],
});
