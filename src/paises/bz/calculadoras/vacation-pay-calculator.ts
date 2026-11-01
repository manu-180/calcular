import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { semanalDesdeMensual } from "../lib/pago";

export default definirCalculadora({
  id: "bz.vacation-pay-calculator",
  mercado: "bz",
  concepto: "vacaciones",
  slug: "vacation-pay-calculator",
  estado: "publicado",
  requiere: {
    "bz.annual-leave-weeks": "numero",
    "bz.average-pay-divisor": "numero",
    "bz.holiday-pay-minimum-months": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Basic monthly pay", min: 0, porDefecto: 2000, ayuda: "Basic wages only. Overtime, commission and bonuses are left out." },
    { id: "meses", tipo: "entero", etiqueta: "Months you worked in the holiday year", min: 0, max: 12, porDefecto: 12 },
    {
      id: "situacion",
      tipo: "opcion",
      etiqueta: "Your situation",
      opciones: [
        { valor: "vacaciones", etiqueta: "I am taking my annual holiday" },
        { valor: "salida", etiqueta: "My job has ended and I did not take the holiday" },
      ],
      porDefecto: "vacaciones",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.sueldo <= 0) throw new ErrorEntrada("Enter your basic monthly pay.", "sueldo");
    const minimo = v["bz.holiday-pay-minimum-months"];
    if (e.situacion === "vacaciones" && e.meses < 12) throw new ErrorEntrada("An annual holiday is earned after a full year of employment.", "meses");
    const remuneracion = redondear(e.sueldo * e.meses);
    // Sección 126: el pago medio es un veintiseisavo de la remuneración total del período.
    const pago = e.meses < minimo && e.meses < 12 ? 0 : redondear(remuneracion / v["bz.average-pay-divisor"]);
    const observaciones: string[] = [];
    if (e.situacion === "salida" && e.meses < minimo) observaciones.push(`Holiday pay on leaving needs at least ${minimo} months with the same employer.`);
    if (e.situacion === "vacaciones") observaciones.push("Your employer must give you seven days' notice of the start date, and you must take the holiday within six months of earning it.");
    observaciones.push("If a Sunday, rest day or public holiday falls inside the holiday, the holiday is extended by one day for each.");
    return {
      pago,
      semanas: e.meses >= 12 ? v["bz.annual-leave-weeks"] : null,
      semanal: redondear(semanalDesdeMensual(e.sueldo)),
      remuneracion,
      observaciones,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Holiday pay (average pay)", formato: "moneda", destacada: true },
    { clave: "semanas", etiqueta: "Length of the annual holiday", formato: "semanas", ocultarSiCero: true },
    { clave: "semanal", etiqueta: "One week of your basic pay", formato: "moneda" },
    { clave: "remuneracion", etiqueta: "Total remuneration for the period", formato: "moneda" },
  ],
});
