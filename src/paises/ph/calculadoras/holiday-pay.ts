import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const OPCIONES = [
  { valor: "regular-holiday", etiqueta: "Regular holiday" },
  { valor: "regular-holiday-rest-day", etiqueta: "Regular holiday on your rest day" },
  { valor: "special", etiqueta: "Special day" },
  { valor: "special-rest-day", etiqueta: "Special day on your rest day" },
  { valor: "rest-day", etiqueta: "Rest day (not a holiday)" },
] as const;

export default definirCalculadora({
  id: "ph.holiday-pay",
  mercado: "ph",
  concepto: "propio",
  slug: "holiday-pay",
  estado: "publicado",
  requiere: {
    "ph.day-rates": "mapa",
  },
  campos: [
    { id: "diario", tipo: "moneda", etiqueta: "Your regular daily wage", min: 0, porDefecto: 755 },
    { id: "dia", tipo: "opcion", etiqueta: "Type of day", opciones: OPCIONES, porDefecto: "regular-holiday" },
    { id: "trabajo", tipo: "si-no", etiqueta: "I worked that day", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.diario <= 0) throw new ErrorEntrada("Enter your daily wage.", "diario");
    const factor = v["ph.day-rates"][entrada.dia];
    const esRegular = entrada.dia === "regular-holiday" || entrada.dia === "regular-holiday-rest-day";
    const observaciones: string[] = [];
    let pago: number | null;
    let tasa: number | null;
    if (entrada.trabajo) {
      tasa = factor;
      pago = redondear((entrada.diario * factor) / 100);
    } else if (esRegular) {
      tasa = v["ph.day-rates"].ordinary;
      pago = redondear(entrada.diario);
      observaciones.push("An unworked regular holiday is paid at your regular daily wage. If you were on leave without pay the day before, your employer may not pay it.");
    } else {
      tasa = null;
      pago = null;
      observaciones.push("The Labor Code rules set pay for working on special days and rest days, not for days off. Check your contract or company policy.");
    }
    return {
      pago,
      tasa,
      extra: pago === null ? null : redondear(pago - entrada.diario),
      observaciones,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Pay for the day (first 8 hours)", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Rate of your daily wage", formato: "porcentaje", decimales: 0 },
    { clave: "extra", etiqueta: "Above your regular daily wage", formato: "moneda" },
  ],
});
