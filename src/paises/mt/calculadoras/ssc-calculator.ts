import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { sscSemanal } from "../lib/ssc";

export default definirCalculadora({
  id: "mt.ssc-calculator",
  mercado: "mt",
  concepto: "aportes-seguridad-social",
  slug: "ssc-calculator",
  estado: "borrador",
  requiere: {
    "mt.ssc-rate": "numero",
    "mt.ssc-weekly": "mapa",
    "mt.minimum-wage": "mapa",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic weekly wage", min: 0, porDefecto: 600 },
    { id: "mayor18", tipo: "si-no", etiqueta: "You are 18 or over", porDefecto: true },
    { id: "desde1962", tipo: "si-no", etiqueta: "You were born on or after 1 January 1962", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("Enter a weekly wage above zero.", "basico");
    const ssc = sscSemanal(
      entrada.basico,
      entrada.mayor18,
      entrada.desde1962,
      { tasa: v["mt.ssc-rate"], semanal: v["mt.ssc-weekly"], minimo: enMapa(v["mt.minimum-wage"], "age-18-plus") },
      redondear,
    );
    return {
      empleado: ssc.semanal,
      empleador: ssc.semanal,
      estado: redondear(ssc.semanal),
      anual: redondear(ssc.semanal * 52),
      mensual: redondear((ssc.semanal * 52) / 12),
      categoria: ssc.categoria,
    };
  },
  resultado: [
    { clave: "empleado", etiqueta: "You pay a week", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Your employer pays a week", formato: "moneda" },
    { clave: "estado", etiqueta: "The State adds a week (half of both)", formato: "moneda" },
    { clave: "mensual", etiqueta: "You pay a month (average)", formato: "moneda" },
    { clave: "anual", etiqueta: "You pay a year (52 weeks)", formato: "moneda" },
    { clave: "categoria", etiqueta: "Category", formato: "texto" },
  ],
});
