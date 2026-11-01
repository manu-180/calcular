import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "jm.sick-leave-calculator",
  mercado: "jm",
  concepto: "propio",
  slug: "sick-leave-calculator",
  estado: "publicado",
  requiere: {
    "jm.leave-days-per": "numero",
    "jm.sick-leave-weeks": "numero",
    "jm.sick-leave-first-months": "numero",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Full months you have worked for this employer", min: 0, max: 720, porDefecto: 18 },
    {
      id: "dias",
      tipo: "entero",
      etiqueta: "Days you have worked so far",
      min: 0,
      max: 366,
      porDefecto: 120,
      ayuda: "Only needed in your first 12 months, when sick leave builds up day by day.",
    },
    { id: "diasSemana", tipo: "entero", etiqueta: "Days in your normal working week", min: 1, max: 7, porDefecto: 5 },
    { id: "semanal", tipo: "moneda", etiqueta: "Your normal pay for a week", min: 0, porDefecto: 40000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.diasSemana < 1 || e.diasSemana > 7) throw new ErrorEntrada("A working week has between 1 and 7 days.", "diasSemana");
    const primerAnio = e.meses < v["jm.sick-leave-first-months"];
    const dias = primerAnio ? Math.floor(e.dias / v["jm.leave-days-per"]) : v["jm.sick-leave-weeks"] * e.diasSemana;
    const pago = primerAnio ? redondear((e.semanal / e.diasSemana) * dias) : redondear(v["jm.sick-leave-weeks"] * e.semanal);
    const observaciones: string[] = [];
    if (primerAnio) observaciones.push(`In your first ${v["jm.sick-leave-first-months"]} months you earn one day of paid sick leave for every ${v["jm.leave-days-per"]} days worked.`);
    return {
      dias,
      pago,
      regla: primerAnio ? `First ${v["jm.sick-leave-first-months"]} months: one day for every ${v["jm.leave-days-per"]} days worked` : `After ${v["jm.sick-leave-first-months"]} months: ${v["jm.sick-leave-weeks"]} normal working weeks a year`,
      observaciones,
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Paid sick leave", formato: "dias", destacada: true },
    { clave: "pago", etiqueta: "Pay for those days", formato: "moneda" },
    { clave: "regla", etiqueta: "Rule that applies", formato: "texto" },
  ],
});
