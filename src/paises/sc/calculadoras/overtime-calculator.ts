import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sc.overtime-calculator",
  mercado: "sc",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "sc.overtime-weekday-factor": "numero",
    "sc.overtime-holiday-factor": "numero",
    "sc.overtime-shift-public-holiday-factor": "numero",
    "sc.overtime-monthly-cap": "numero",
  },
  campos: [
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "How you are paid",
      opciones: [
        { valor: "hourly", etiqueta: "By the hour" },
        { valor: "monthly", etiqueta: "A monthly wage" },
      ],
      porDefecto: "hourly",
    },
    { id: "hora", tipo: "moneda", etiqueta: "Normal pay for each hour", min: 0, porDefecto: 100, visibleSi: { modo: ["hourly"] } },
    { id: "mensual", tipo: "moneda", etiqueta: "Monthly wage", min: 0, porDefecto: 16000, visibleSi: { modo: ["monthly"] } },
    { id: "horasSemana", tipo: "numero", etiqueta: "Normal hours in your week", min: 1, max: 72, porDefecto: 40, visibleSi: { modo: ["monthly"] } },
    {
      id: "trabajador",
      tipo: "opcion",
      etiqueta: "Type of worker",
      opciones: [
        { valor: "standard", etiqueta: "Standard worker" },
        { valor: "shift", etiqueta: "Shift worker" },
      ],
      porDefecto: "standard",
    },
    {
      id: "dia",
      tipo: "opcion",
      etiqueta: "Day of the overtime",
      opciones: [
        { valor: "weekday", etiqueta: "Week-day" },
        { valor: "sunday", etiqueta: "Sunday" },
        { valor: "public", etiqueta: "Public holiday" },
      ],
      porDefecto: "weekday",
    },
    { id: "horas", tipo: "numero", etiqueta: "Overtime hours", min: 0, porDefecto: 6 },
  ],
  calcular(e, v, { redondear }) {
    let base: number;
    if (e.modo === "hourly") {
      if (e.hora === null || e.hora <= 0) throw new ErrorEntrada("Enter your normal pay for each hour.", "hora");
      base = e.hora;
    } else {
      if (e.mensual === null || e.mensual <= 0) throw new ErrorEntrada("Enter your monthly wage.", "mensual");
      if (e.horasSemana === null || e.horasSemana <= 0) throw new ErrorEntrada("Enter the normal hours in your week.", "horasSemana");
      base = (e.mensual * 12) / (52 * e.horasSemana);
    }
    const semana = v["sc.overtime-weekday-factor"];
    const festivo = v["sc.overtime-holiday-factor"];
    let factor = semana;
    if (e.trabajador === "standard" && e.dia !== "weekday") factor = festivo;
    if (e.trabajador === "shift" && e.dia === "public") factor = v["sc.overtime-shift-public-holiday-factor"];
    const total = redondear(base * factor * e.horas);
    const observaciones: string[] = [];
    if (e.horas > v["sc.overtime-monthly-cap"]) observaciones.push("The regulations allow up to " + v["sc.overtime-monthly-cap"] + " additional hours a month, so check these hours.");
    if (e.modo === "monthly") observaciones.push("The Employment Act sets wages by the hour and fixes no divisor. The hourly rate here is the monthly wage times 12, divided by 52 weeks of normal hours.");
    observaciones.push("An employer may give time off of up to two thirds of the hours worked instead of pay, unless you agree to take cash.");
    return { total, tarifa: redondear(base * factor), base: redondear(base), factor, observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Overtime pay", formato: "moneda", destacada: true },
    { clave: "tarifa", etiqueta: "Pay for each overtime hour", formato: "moneda" },
    { clave: "base", etiqueta: "Normal hourly pay used", formato: "moneda" },
    { clave: "factor", etiqueta: "Hours of pay for each hour worked", formato: "numero", decimales: 1 },
  ],
});
