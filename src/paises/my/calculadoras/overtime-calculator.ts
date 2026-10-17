import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { sueldoValido } from "../lib/empleo";

export default definirCalculadora({
  id: "my.overtime-calculator",
  mercado: "my",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "my.overtime-multipliers": "mapa",
    "my.ordinary-rate-divisor": "numero",
    "my.max-normal-hours-week": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly wages", min: 0, porDefecto: 3000 },
    { id: "horasDia", tipo: "numero", etiqueta: "Normal hours of work a day", min: 1, max: 8, porDefecto: 8 },
    { id: "extra", tipo: "numero", etiqueta: "Overtime hours on normal working days", min: 0, porDefecto: 10 },
    { id: "descansoCompleto", tipo: "entero", etiqueta: "Rest days worked for more than half your normal hours", min: 0, porDefecto: 0 },
    { id: "descansoMedio", tipo: "entero", etiqueta: "Rest days worked for half your normal hours or less", min: 0, porDefecto: 0 },
    { id: "descansoExtra", tipo: "numero", etiqueta: "Hours beyond your normal hours on rest days", min: 0, porDefecto: 0 },
    { id: "feriados", tipo: "entero", etiqueta: "Paid public holidays worked", min: 0, porDefecto: 0 },
    { id: "feriadoExtra", tipo: "numero", etiqueta: "Hours beyond your normal hours on public holidays", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    sueldoValido(entrada.sueldo);
    if (entrada.horasDia <= 0 || entrada.horasDia > 8) throw new ErrorEntrada("Normal hours are between 1 and 8 a day.", "horasDia");
    const m = v["my.overtime-multipliers"];
    const diario = redondear(entrada.sueldo / v["my.ordinary-rate-divisor"]);
    const hora = redondear(diario / entrada.horasDia);
    const pagoExtra = redondear(entrada.extra * hora * enMapa(m, "overtime"));
    const pagoDescanso = redondear(entrada.descansoCompleto * diario + entrada.descansoMedio * diario * 0.5 + entrada.descansoExtra * hora * enMapa(m, "rest-day-overtime"));
    const pagoFeriado = redondear(entrada.feriados * diario * enMapa(m, "public-holiday") + entrada.feriadoExtra * hora * enMapa(m, "public-holiday-overtime"));
    return {
      total: redondear(pagoExtra + pagoDescanso + pagoFeriado),
      diario,
      hora,
      pagoExtra,
      pagoDescanso,
      pagoFeriado,
      observaciones:
        entrada.feriados > 0 ? ["Pay for public holidays worked is on top of the holiday pay already included in your monthly wages."] : ([] as string[]),
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Extra pay for these hours", formato: "moneda", destacada: true },
    { clave: "diario", etiqueta: "Ordinary rate of pay (a day)", formato: "moneda" },
    { clave: "hora", etiqueta: "Hourly rate of pay", formato: "moneda" },
    { clave: "pagoExtra", etiqueta: "Overtime on normal days", formato: "moneda", ocultarSiCero: true },
    { clave: "pagoDescanso", etiqueta: "Rest day pay", formato: "moneda", ocultarSiCero: true },
    { clave: "pagoFeriado", etiqueta: "Public holiday pay", formato: "moneda", ocultarSiCero: true },
  ],
});
