import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "et.overtime-calculator",
  mercado: "et",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "et.overtime-rates": "mapa",
    "et.daily-hours": "numero",
    "et.weekly-hours": "numero",
    "et.overtime-daily-cap": "numero",
    "et.overtime-weekly-cap": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Monthly salary", min: 0, porDefecto: 10400 },
    { id: "horasMes", tipo: "numero", etiqueta: "Normal hours you work in a month", min: 1, max: 300, porDefecto: 208, ayuda: "48 hours a week over 52 weeks is 208 hours a month. Use your own figure if you work fewer hours." },
    { id: "dia", tipo: "numero", etiqueta: "Overtime hours between 6 a.m. and 10 p.m.", min: 0, max: 400, porDefecto: 4 },
    { id: "noche", tipo: "numero", etiqueta: "Overtime hours between 10 p.m. and 6 a.m.", min: 0, max: 400, porDefecto: 0 },
    { id: "descanso", tipo: "numero", etiqueta: "Hours worked on your weekly rest day", min: 0, max: 400, porDefecto: 0 },
    { id: "feriado", tipo: "numero", etiqueta: "Overtime hours on a public holiday", min: 0, max: 400, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("Enter your monthly salary.", "salario");
    const tasas = v["et.overtime-rates"];
    const hora = e.salario / e.horasMes;
    const pago = (horas: number, clave: string) => redondear(horas * hora * enMapa(tasas, clave));
    const dia = pago(e.dia, "day");
    const noche = pago(e.noche, "night");
    const descanso = pago(e.descanso, "rest-day");
    const feriado = pago(e.feriado, "holiday");
    return {
      total: redondear(dia + noche + descanso + feriado),
      hora: redondear(hora),
      dia,
      noche,
      descanso,
      feriado,
      horas: e.dia + e.noche + e.descanso + e.feriado,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Overtime pay", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Your ordinary hourly rate", formato: "moneda" },
    { clave: "dia", etiqueta: "Daytime overtime", formato: "moneda", ocultarSiCero: true },
    { clave: "noche", etiqueta: "Night overtime", formato: "moneda", ocultarSiCero: true },
    { clave: "descanso", etiqueta: "Weekly rest day work", formato: "moneda", ocultarSiCero: true },
    { clave: "feriado", etiqueta: "Public holiday overtime", formato: "moneda", ocultarSiCero: true },
    { clave: "horas", etiqueta: "Overtime hours in total", formato: "horas", decimales: 1 },
  ],
});
