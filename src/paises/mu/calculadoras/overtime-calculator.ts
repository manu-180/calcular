import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mu.overtime-calculator",
  mercado: "mu",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "mu.hours-per-month": "numero",
    "mu.normal-week-hours": "numero",
    "mu.overtime-weekday": "numero",
    "mu.overtime-holiday-normal": "numero",
    "mu.overtime-holiday-extra": "numero",
    "mu.worker-wage-ceiling": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly basic wage", min: 0, porDefecto: 25000 },
    { id: "horasExtra", tipo: "numero", etiqueta: "Hours worked beyond normal hours on week days", min: 0, porDefecto: 10 },
    { id: "horasFeriado", tipo: "numero", etiqueta: "Hours worked on a public holiday, within normal hours", min: 0, porDefecto: 0 },
    { id: "horasFeriadoExtra", tipo: "numero", etiqueta: "Hours worked on a public holiday, after normal hours", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.sueldo <= 0) throw new ErrorEntrada("Enter your monthly basic wage.", "sueldo");
    const hora = e.sueldo / v["mu.hours-per-month"];
    const extra = redondear(hora * v["mu.overtime-weekday"] * e.horasExtra);
    const feriado = redondear(hora * v["mu.overtime-holiday-normal"] * e.horasFeriado);
    const feriadoExtra = redondear(hora * v["mu.overtime-holiday-extra"] * e.horasFeriadoExtra);
    const observaciones: string[] = [];
    if (e.sueldo * 12 > v["mu.worker-wage-ceiling"]) {
      observaciones.push(`With a basic wage above Rs ${v["mu.worker-wage-ceiling"].toLocaleString("en-MU")} a year, the overtime rates of the Act do not apply to you. Your contract decides.`);
    }
    return {
      total: redondear(extra + feriado + feriadoExtra),
      hora: redondear(hora),
      tasaExtra: redondear(hora * v["mu.overtime-weekday"]),
      extra,
      feriado,
      feriadoExtra,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Overtime pay", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Basic hourly rate", formato: "moneda" },
    { clave: "tasaExtra", etiqueta: "Rate for a week day overtime hour", formato: "moneda" },
    { clave: "extra", etiqueta: "Week day overtime", formato: "moneda" },
    { clave: "feriado", etiqueta: "Public holiday, normal hours", formato: "moneda", ocultarSiCero: true },
    { clave: "feriadoExtra", etiqueta: "Public holiday, after normal hours", formato: "moneda", ocultarSiCero: true },
  ],
});
