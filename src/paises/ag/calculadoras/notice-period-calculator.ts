import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ag.notice-period-calculator",
  mercado: "ag",
  concepto: "preaviso",
  slug: "notice-period-calculator",
  estado: "publicado",
  requiere: {
    "ag.notice-max-days": "numero",
    "ag.probation-max-months": "numero",
  },
  campos: [
    {
      id: "frecuencia",
      tipo: "opcion",
      etiqueta: "How often are you paid?",
      opciones: [
        { valor: "weekly", etiqueta: "Every week" },
        { valor: "fortnightly", etiqueta: "Every two weeks" },
        { valor: "monthly", etiqueta: "Every month" },
      ],
      porDefecto: "monthly",
    },
    { id: "pago", tipo: "moneda", etiqueta: "Pay for one pay period", min: 0, porDefecto: 3300 },
    { id: "prueba", tipo: "si-no", etiqueta: "You are still on probation", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.pago <= 0) throw new ErrorEntrada("Enter your pay for one pay period.", "pago");
    const intervalo = e.frecuencia === "weekly" ? 7 : e.frecuencia === "fortnightly" ? 14 : 30;
    const dias = e.prueba ? 1 : Math.min(intervalo, v["ag.notice-max-days"]);
    const pagoDiario = redondear(e.pago / intervalo);
    return { dias, pagoDiario, pagoSustitutivo: redondear(pagoDiario * dias), maxPrueba: v["ag.probation-max-months"] };
  },
  resultado: [
    { clave: "dias", etiqueta: "Minimum notice (days)", formato: "dias", destacada: true },
    { clave: "pagoSustitutivo", etiqueta: "Pay for the notice period", formato: "moneda" },
    { clave: "pagoDiario", etiqueta: "Pay per calendar day", formato: "moneda" },
    { clave: "maxPrueba", etiqueta: "Longest probation (months)", formato: "meses" },
  ],
});
