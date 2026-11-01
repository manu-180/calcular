import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mt.statutory-bonus",
  mercado: "mt",
  concepto: "bono-semestral",
  slug: "statutory-bonus",
  estado: "publicado",
  requiere: { "mt.statutory-bonuses": "mapa" },
  campos: [
    {
      id: "pago",
      tipo: "opcion",
      etiqueta: "Payment",
      opciones: [
        { valor: "june", etiqueta: "Statutory bonus, end of June" },
        { valor: "december", etiqueta: "Statutory bonus, December" },
        { valor: "march", etiqueta: "Weekly allowance, end of March" },
        { valor: "september", etiqueta: "Weekly allowance, end of September" },
      ],
      porDefecto: "december",
    },
    { id: "completo", tipo: "si-no", etiqueta: "You worked the whole six months", porDefecto: true },
    { id: "dias", tipo: "entero", etiqueta: "Calendar days you were employed in the six months", min: 0, max: 184, porDefecto: 92, visibleSi: { completo: [false], pago: ["june", "december"] } },
    { id: "semanas", tipo: "entero", etiqueta: "Working weeks, or part of a week, you were employed in the six months", min: 0, max: 26, porDefecto: 13, visibleSi: { completo: [false], pago: ["march", "september"] } },
    { id: "horas", tipo: "numero", etiqueta: "Hours you work a week", min: 0, max: 48, porDefecto: 40 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.horas <= 0) throw new ErrorEntrada("Enter the hours you work each week.", "horas");
    const b = v["mt.statutory-bonuses"];
    const esBono = entrada.pago === "june" || entrada.pago === "december";
    const completo = esBono ? enMapa(b, "bonus") : enMapa(b, "allowance");
    let base = completo;
    if (!entrada.completo) {
      base = esBono ? Math.min(completo, (entrada.dias ?? 0) * enMapa(b, "bonus-per-day")) : Math.min(completo, (entrada.semanas ?? 0) * enMapa(b, "allowance-per-week"));
    }
    const parte = Math.min(entrada.horas, 40) / 40;
    const observaciones: string[] = [];
    if (parte < 1) observaciones.push("Part-time employees get the payment in proportion to the hours they work compared with a 40-hour week.");
    return { pago: redondear(base * parte), completo, parte: redondear(parte * 100), observaciones };
  },
  resultado: [
    { clave: "pago", etiqueta: "You should receive", formato: "moneda", destacada: true },
    { clave: "completo", etiqueta: "Full payment for a whole-time employee", formato: "moneda" },
    { clave: "parte", etiqueta: "Share for your hours", formato: "porcentaje", decimales: 0 },
  ],
});
