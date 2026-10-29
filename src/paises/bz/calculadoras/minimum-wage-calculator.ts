import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { BASES_PAGO, MESES_POR_ANIO, SEMANAS_POR_ANIO, semanalDesde } from "../lib/pago";

export default definirCalculadora({
  id: "bz.minimum-wage-calculator",
  mercado: "bz",
  concepto: "salario-minimo",
  slug: "minimum-wage-calculator",
  estado: "publicado",
  requiere: {
    "bz.minimum-wage-hourly": "numero",
    "bz.normal-week-hours": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "What you are paid", min: 0, porDefecto: 900 },
    { id: "base", tipo: "opcion", etiqueta: "Paid", opciones: BASES_PAGO, porDefecto: "mes" },
    { id: "horas", tipo: "numero", etiqueta: "Hours you work in a normal week", min: 1, max: 60, porDefecto: 45 },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const minimoHora = v["bz.minimum-wage-hourly"];
    const minimoSemana = redondear(minimoHora * e.horas);
    const minimoMes = redondear((minimoSemana * SEMANAS_POR_ANIO) / MESES_POR_ANIO);
    const semanal = semanalDesde(e.monto, e.base, e.horas);
    const tuHora = redondear(semanal / e.horas);
    const tuMes = redondear((semanal * SEMANAS_POR_ANIO) / MESES_POR_ANIO);
    const cumple = tuHora >= minimoHora;
    const faltaMes = cumple ? 0 : redondear(minimoMes - tuMes);
    const observaciones = [
      cumple ? "Your pay is at or above the national minimum wage." : "Your pay is below the national minimum wage. Your employer owes at least the difference shown.",
      "A month is counted as 52 weeks divided by 12.",
    ];
    return { minimoHora, minimoSemana, minimoMes, tuHora, cumple: cumple ? "Yes" : "No", faltaMes, observaciones };
  },
  resultado: [
    { clave: "minimoHora", etiqueta: "Minimum wage per hour", formato: "moneda", destacada: true },
    { clave: "minimoSemana", etiqueta: "Minimum for your week", formato: "moneda" },
    { clave: "minimoMes", etiqueta: "Minimum for your month", formato: "moneda" },
    { clave: "tuHora", etiqueta: "Your pay per hour", formato: "moneda" },
    { clave: "cumple", etiqueta: "Your pay meets the minimum", formato: "texto" },
    { clave: "faltaMes", etiqueta: "Shortfall each month", formato: "moneda", ocultarSiCero: true },
  ],
});
