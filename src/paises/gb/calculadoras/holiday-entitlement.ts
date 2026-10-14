import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "gb.holiday-entitlement",
  mercado: "gb",
  concepto: "vacaciones",
  slug: "holiday-entitlement",
  estado: "publicado",
  requiere: {
    "gb.holiday-weeks": "numero",
    "gb.holiday-max-days": "numero",
    "gb.irregular-hours-accrual": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "How you work",
      opciones: [
        { valor: "days", etiqueta: "A fixed number of days a week" },
        { valor: "hours", etiqueta: "A fixed number of hours a week" },
        { valor: "irregular", etiqueta: "Irregular hours or part of the year" },
      ],
      porDefecto: "days",
    },
    { id: "dias", tipo: "numero", etiqueta: "Days you work a week", min: 0.5, max: 7, porDefecto: 5 },
    { id: "horas", tipo: "numero", etiqueta: "Hours you work a week", min: 0, max: 100, porDefecto: 37.5 },
    { id: "meses", tipo: "entero", etiqueta: "Months of the leave year you work", min: 1, max: 12, porDefecto: 12, ayuda: "Use fewer than 12 if you start or leave part way through the year." },
    { id: "trabajadas", tipo: "numero", etiqueta: "Hours worked in the pay period (irregular hours only)", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, v, { redondear }) {
    const semanas = v["gb.holiday-weeks"];
    const tope = v["gb.holiday-max-days"];
    if (entrada.tipo === "irregular") {
      const horas = (entrada.trabajadas * v["gb.irregular-hours-accrual"]) / 100;
      return {
        dias: null,
        horas: redondear(horas),
        horasRedondeadas: Math.round(horas),
        semanas,
        observaciones: ["Irregular hours and part-year workers build up holiday each pay period. The hours can be rounded to the nearest hour."],
      };
    }
    const proporcion = entrada.meses / 12;
    const diasAnio = Math.min(entrada.dias * semanas, tope);
    const observaciones: string[] = [];
    if (entrada.dias * semanas > tope) observaciones.push(`Statutory paid holiday is capped at ${tope} days, even if you work 6 or 7 days a week.`);
    if (entrada.meses < 12) observaciones.push("If you start or leave part way through the leave year, you get a share of the yearly entitlement for the months you work.");
    if (entrada.tipo === "hours") {
      if (entrada.horas <= 0) throw new ErrorEntrada("Enter the hours you work each week.", "horas");
      const horasAnio = Math.min(entrada.horas * semanas, tope * (entrada.horas / entrada.dias));
      return { dias: redondear(diasAnio * proporcion), horas: redondear(horasAnio * proporcion), horasRedondeadas: null, semanas, observaciones };
    }
    return { dias: redondear(diasAnio * proporcion), horas: null, horasRedondeadas: null, semanas, observaciones };
  },
  resultado: [
    { clave: "dias", etiqueta: "Paid holiday in days", formato: "dias", decimales: 1, destacada: true },
    { clave: "horas", etiqueta: "Paid holiday in hours", formato: "horas", decimales: 2 },
    { clave: "horasRedondeadas", etiqueta: "Rounded to the nearest hour", formato: "horas", decimales: 0 },
    { clave: "semanas", etiqueta: "Statutory entitlement in weeks", formato: "numero", decimales: 1 },
  ],
});
