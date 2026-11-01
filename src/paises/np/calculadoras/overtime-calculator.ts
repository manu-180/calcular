import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "np.overtime-calculator",
  mercado: "np",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "np.normal-day-hours": "numero",
    "np.normal-week-hours": "numero",
    "np.overtime-factor": "numero",
    "np.overtime-day-cap": "numero",
    "np.overtime-week-cap": "numero",
  },
  campos: [
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "How you are paid",
      opciones: [
        { valor: "monthly", etiqueta: "A monthly wage" },
        { valor: "hourly", etiqueta: "By the hour" },
      ],
      porDefecto: "monthly",
    },
    { id: "mensual", tipo: "moneda", etiqueta: "Basic pay for the month", min: 0, porDefecto: 30000, visibleSi: { modo: ["monthly"] } },
    { id: "diasPagados", tipo: "entero", etiqueta: "Paid days in a month", min: 20, max: 31, porDefecto: 30, visibleSi: { modo: ["monthly"] }, ayuda: "The Labour Act does not fix this number. Use the one in your contract." },
    { id: "hora", tipo: "moneda", etiqueta: "Basic pay for one hour", min: 0, porDefecto: 150, visibleSi: { modo: ["hourly"] } },
    { id: "horas", tipo: "numero", etiqueta: "Overtime hours worked", min: 0, porDefecto: 10 },
    { id: "horasDia", tipo: "numero", etiqueta: "Most overtime hours in one day (optional)", min: 0, requerido: false },
    { id: "horasSemana", tipo: "numero", etiqueta: "Most overtime hours in one week (optional)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    let base: number;
    if (e.modo === "monthly") {
      if (e.mensual === null || e.mensual <= 0) throw new ErrorEntrada("Enter your basic pay for the month.", "mensual");
      base = e.mensual / ((e.diasPagados ?? 30) * v["np.normal-day-hours"]);
    } else {
      if (e.hora === null || e.hora <= 0) throw new ErrorEntrada("Enter your basic pay for one hour.", "hora");
      base = e.hora;
    }
    const tarifa = base * v["np.overtime-factor"];
    const observaciones: string[] = [];
    if (e.horasDia !== null && e.horasDia > v["np.overtime-day-cap"]) observaciones.push("The Labour Act allows at most 4 hours of overtime in a day.");
    if (e.horasSemana !== null && e.horasSemana > v["np.overtime-week-cap"]) observaciones.push("The Labour Act allows at most 24 hours of overtime in a week.");
    return {
      total: redondear(tarifa * e.horas),
      base: redondear(base),
      tarifa: redondear(tarifa),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Overtime pay", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Basic pay for one hour", formato: "moneda" },
    { clave: "tarifa", etiqueta: "Rate per overtime hour", formato: "moneda" },
  ],
});
