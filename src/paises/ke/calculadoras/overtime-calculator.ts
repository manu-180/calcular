import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ke.overtime-calculator",
  mercado: "ke",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "ke.normal-week-hours": "numero",
    "ke.overtime-normal-factor": "numero",
    "ke.overtime-rest-day-factor": "numero",
    "ke.overtime-hourly-divisor": "numero",
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
    { id: "mensual", tipo: "moneda", etiqueta: "Basic monthly wage", min: 0, porDefecto: 30000, visibleSi: { modo: ["monthly"] } },
    { id: "hora", tipo: "moneda", etiqueta: "Normal hourly rate", min: 0, porDefecto: 150, visibleSi: { modo: ["hourly"] } },
    { id: "horasNormales", tipo: "numero", etiqueta: "Overtime hours on normal working days", min: 0, porDefecto: 6 },
    { id: "horasDescanso", tipo: "numero", etiqueta: "Hours worked on your rest day or a public holiday", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    let base: number;
    if (e.modo === "monthly") {
      if (e.mensual === null || e.mensual <= 0) throw new ErrorEntrada("Enter your basic monthly wage.", "mensual");
      base = e.mensual / v["ke.overtime-hourly-divisor"];
    } else {
      if (e.hora === null || e.hora <= 0) throw new ErrorEntrada("Enter your normal hourly rate.", "hora");
      base = e.hora;
    }
    const normales = redondear(base * v["ke.overtime-normal-factor"] * e.horasNormales);
    const descanso = redondear(base * v["ke.overtime-rest-day-factor"] * e.horasDescanso);
    return {
      total: redondear(normales + descanso),
      normales,
      descanso,
      base: redondear(base),
      tarifaNormal: redondear(base * v["ke.overtime-normal-factor"]),
      tarifaDescanso: redondear(base * v["ke.overtime-rest-day-factor"]),
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Overtime pay", formato: "moneda", destacada: true },
    { clave: "normales", etiqueta: "Overtime on normal days", formato: "moneda" },
    { clave: "descanso", etiqueta: "Rest day and public holiday work", formato: "moneda", ocultarSiCero: true },
    { clave: "base", etiqueta: "Basic hourly rate used", formato: "moneda" },
    { clave: "tarifaNormal", etiqueta: "Rate per overtime hour", formato: "moneda" },
    { clave: "tarifaDescanso", etiqueta: "Rate per rest day or holiday hour", formato: "moneda" },
  ],
});
