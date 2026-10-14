import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { JURISDICCIONES } from "../lib/laboral";

export default definirCalculadora({
  id: "ca.overtime-calculator",
  mercado: "ca",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "ca.overtime-on": "mapa",
    "ca.overtime-bc": "mapa",
    "ca.overtime-ab": "mapa",
    "ca.overtime-federal": "mapa",
  },
  campos: [
    { id: "jurisdiccion", tipo: "opcion", etiqueta: "Rules that cover your job", opciones: JURISDICCIONES, porDefecto: "on" },
    { id: "tarifa", tipo: "moneda", etiqueta: "Regular hourly wage", min: 0, porDefecto: 25 },
    { id: "dias", tipo: "entero", etiqueta: "Days worked this week", min: 1, max: 7, porDefecto: 5 },
    { id: "horasDia", tipo: "numero", etiqueta: "Hours worked each day", min: 0, max: 24, porDefecto: 10 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.tarifa <= 0) throw new ErrorEntrada("Enter your hourly wage.", "tarifa");
    const r = v[`ca.overtime-${entrada.jurisdiccion}`];
    const { dias, horasDia } = entrada;
    const totales = dias * horasDia;
    let extra = 0;
    let doble = 0;
    if (entrada.jurisdiccion === "bc") {
      const diarias15 = dias * Math.max(0, Math.min(horasDia, r["daily-double"]) - r.daily);
      doble = dias * Math.max(0, horasDia - r["daily-double"]);
      const semanales = Math.max(0, dias * Math.min(horasDia, r.daily) - r.weekly);
      extra = diarias15 + semanales;
    } else if (r.daily !== undefined) {
      extra = Math.max(dias * Math.max(0, horasDia - r.daily), Math.max(0, totales - r.weekly));
    } else {
      extra = Math.max(0, totales - r.weekly);
    }
    const regulares = totales - extra - doble;
    const pagoRegular = redondear(regulares * entrada.tarifa);
    const pagoExtra = redondear(extra * entrada.tarifa * r.factor + doble * entrada.tarifa * (r["factor-double"] ?? 2));
    return {
      total: redondear(pagoRegular + pagoExtra),
      pagoExtra,
      pagoRegular,
      regulares,
      extra,
      doble,
      tarifaExtra: redondear(entrada.tarifa * r.factor),
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Pay for the week", formato: "moneda", destacada: true },
    { clave: "pagoExtra", etiqueta: "Overtime pay", formato: "moneda" },
    { clave: "pagoRegular", etiqueta: "Regular pay", formato: "moneda" },
    { clave: "regulares", etiqueta: "Regular hours", formato: "horas", decimales: 2 },
    { clave: "extra", etiqueta: "Overtime hours at time and a half", formato: "horas", decimales: 2 },
    { clave: "doble", etiqueta: "Overtime hours at double time", formato: "horas", decimales: 2, ocultarSiCero: true },
    { clave: "tarifaExtra", etiqueta: "Overtime rate per hour", formato: "moneda" },
  ],
});
