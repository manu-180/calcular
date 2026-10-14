import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ie.annual-leave",
  mercado: "ie",
  concepto: "vacaciones",
  slug: "annual-leave",
  estado: "publicado",
  requiere: {
    "ie.annual-leave-percent": "numero",
    "ie.annual-leave-full-year-hours": "numero",
    "ie.annual-leave-monthly-hours": "numero",
    "ie.annual-leave-max-weeks": "numero",
  },
  campos: [
    { id: "horasAnio", tipo: "numero", etiqueta: "Hours you worked in the leave year", min: 0, max: 5000, porDefecto: 1560 },
    { id: "horasSemana", tipo: "numero", etiqueta: "Your normal hours a week", min: 0, max: 100, porDefecto: 39 },
    { id: "diasSemana", tipo: "numero", etiqueta: "Days you normally work a week", min: 0, max: 7, porDefecto: 5 },
    {
      id: "meses",
      tipo: "entero",
      etiqueta: "Months in which you worked at least 117 hours",
      min: 0,
      max: 12,
      porDefecto: 0,
      ayuda: "Leave it at 0 if you are not sure. It only matters when it gives you more leave.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.horasSemana <= 0) throw new ErrorEntrada("Enter your normal weekly hours.", "horasSemana");
    if (entrada.diasSemana <= 0) throw new ErrorEntrada("Enter the days you normally work each week.", "diasSemana");
    const maximo = v["ie.annual-leave-max-weeks"];
    const anual = entrada.horasAnio >= v["ie.annual-leave-full-year-hours"] ? maximo : 0;
    const mensual = entrada.meses / 3;
    const porHoras = (entrada.horasAnio * v["ie.annual-leave-percent"]) / 100 / entrada.horasSemana;
    const mejor = Math.max(anual, mensual, porHoras);
    const semanas = Math.min(maximo, mejor);
    const horasAnio = v["ie.annual-leave-full-year-hours"].toLocaleString("en-IE");
    const metodo =
      mejor === anual && anual > 0
        ? `${maximo} working weeks (at least ${horasAnio} hours in the year)`
        : mejor === mensual && mensual > 0
          ? `A third of a week for each month with ${v["ie.annual-leave-monthly-hours"]} hours or more`
          : `${v["ie.annual-leave-percent"]}% of the hours you worked`;
    const observaciones: string[] = [];
    if (anual > 0) observaciones.push(`The ${maximo} weeks for working ${horasAnio} hours do not apply in a leave year in which you change job.`);
    if (mejor > maximo) observaciones.push(`The legal maximum is ${maximo} of your normal working weeks, so your entitlement is capped.`);
    return {
      semanas: redondear(semanas),
      horas: redondear(semanas * entrada.horasSemana),
      dias: redondear(semanas * entrada.diasSemana),
      metodo,
      observaciones,
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Paid annual leave in days", formato: "numero", decimales: 2, destacada: true },
    { clave: "horas", etiqueta: "Paid annual leave in hours", formato: "numero", decimales: 2 },
    { clave: "semanas", etiqueta: "Working weeks of leave", formato: "numero", decimales: 2 },
    { clave: "metodo", etiqueta: "Method that gives you the most", formato: "texto" },
  ],
});
