import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ie.public-holiday-pay",
  mercado: "ie",
  concepto: "propio",
  slug: "public-holiday-pay",
  estado: "publicado",
  requiere: {
    "ie.public-holiday-part-time-hours": "numero",
    "ie.public-holiday-weekly-share": "numero",
  },
  campos: [
    { id: "semanal", tipo: "moneda", etiqueta: "Your normal weekly pay", min: 0, porDefecto: 700 },
    { id: "diasSemana", tipo: "numero", etiqueta: "Days you normally work a week", min: 0, max: 7, porDefecto: 5 },
    {
      id: "situacion",
      tipo: "opcion",
      etiqueta: "On the public holiday",
      opciones: [
        { valor: "worked", etiqueta: "I work that day" },
        { valor: "day-off", etiqueta: "It is one of my working days and I am off" },
        { valor: "not-rostered", etiqueta: "I am not normally rostered that day" },
      ],
      porDefecto: "day-off",
    },
    { id: "parcial", tipo: "si-no", etiqueta: "You work part-time", porDefecto: false },
    {
      id: "horas5",
      tipo: "numero",
      etiqueta: "Hours you worked in the 5 weeks before the holiday",
      min: 0,
      porDefecto: 0,
      ayuda: "Only needed if you work part-time.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.diasSemana <= 0) throw new ErrorEntrada("Enter the days you normally work each week.", "diasSemana");
    const minimoHoras = v["ie.public-holiday-part-time-hours"];
    if (entrada.parcial && entrada.horas5 < minimoHoras) {
      return {
        beneficio: 0,
        diario: redondear(entrada.semanal / entrada.diasSemana),
        tipo: "No public holiday benefit yet",
        observaciones: [`Part-time workers qualify once they have worked ${minimoHoras} hours in total in the 5 weeks before the public holiday.`],
      };
    }
    const diario = redondear(entrada.semanal / entrada.diasSemana);
    const observaciones: string[] = [];
    let beneficio: number;
    let tipo: string;
    if (entrada.situacion === "not-rostered") {
      beneficio = redondear((entrada.semanal * v["ie.public-holiday-weekly-share"]) / 100);
      tipo = "One-fifth of your weekly pay";
      observaciones.push("You are not rostered that day, so you get one-fifth of your normal weekly pay on top of your wages.");
    } else if (entrada.situacion === "worked") {
      beneficio = diario;
      tipo = "An extra day's pay, or paid time off";
      observaciones.push("You are paid as normal for working the day. On top of that your employer chooses between a paid day off within a month, an extra day of annual leave or an extra day's pay.");
      observaciones.push("The extra day's pay is what you were paid for your normal daily hours on the last day you worked before the holiday. Here it is estimated as weekly pay divided by working days.");
    } else {
      beneficio = diario;
      tipo = "Your normal day's pay";
      observaciones.push("If the business is closed and you would normally work that day, you get your normal day's pay.");
    }
    return { beneficio, diario, tipo, observaciones };
  },
  resultado: [
    { clave: "beneficio", etiqueta: "Public holiday benefit", formato: "moneda", destacada: true },
    { clave: "tipo", etiqueta: "What you are owed", formato: "texto" },
    { clave: "diario", etiqueta: "Your daily pay", formato: "moneda" },
  ],
});
