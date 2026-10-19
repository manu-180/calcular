import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tz.wcf-contribution-calculator",
  mercado: "tz",
  concepto: "propio",
  slug: "wcf-contribution-calculator",
  estado: "publicado",
  requiere: {
    "tz.wcf-rate": "numero",
  },
  campos: [{ id: "nomina", tipo: "moneda", etiqueta: "Monthly gross earnings of all employees", min: 0, porDefecto: 20000000 }],
  calcular(e, v, { redondear }) {
    if (e.nomina < 0) throw new ErrorEntrada("Earnings cannot be negative.", "nomina");
    const wcf = redondear(porcentaje(e.nomina, v["tz.wcf-rate"]));
    return { wcf, anual: redondear(wcf * 12) };
  },
  resultado: [
    { clave: "wcf", etiqueta: "WCF contribution for the month", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "WCF contribution over 12 months", formato: "moneda" },
  ],
});
