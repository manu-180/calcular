import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { fjd } from "../lib/nomina";

export default definirCalculadora({
  id: "fj.minimum-wage",
  mercado: "fj",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: { "fj.minimum-wage-hourly": "numero" },
  campos: [
    { id: "horas", tipo: "numero", etiqueta: "Hours you work in a week", min: 1, max: 168, porDefecto: 40 },
    { id: "tarifa", tipo: "moneda", etiqueta: "Your hourly rate (optional, to compare)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.tarifa !== null && e.tarifa < 0) throw new ErrorEntrada("The hourly rate cannot be negative.", "tarifa");
    const hora = v["fj.minimum-wage-hourly"];
    const semana = redondear(hora * e.horas);
    const mes = redondear((hora * e.horas * 52) / 12);
    const observaciones = ["Ten sectoral wage orders set higher minimums for some industries. Check yours with the Ministry of Employment."];
    let diferenciaHora: number | null = null;
    if (e.tarifa !== null) {
      diferenciaHora = redondear(e.tarifa - hora);
      observaciones.push(
        diferenciaHora >= 0 ? `Your rate is ${fjd(diferenciaHora)} an hour above the national minimum.` : `Your rate is ${fjd(-diferenciaHora)} an hour below the national minimum.`,
      );
    }
    return { hora, semana, mes, anio: redondear(hora * e.horas * 52), diferenciaHora, observaciones };
  },
  resultado: [
    { clave: "hora", etiqueta: "National minimum wage per hour", formato: "moneda", destacada: true },
    { clave: "semana", etiqueta: "Minimum for your week", formato: "moneda" },
    { clave: "mes", etiqueta: "Minimum for an average month", formato: "moneda" },
    { clave: "anio", etiqueta: "Minimum over 52 weeks", formato: "moneda" },
    { clave: "diferenciaHora", etiqueta: "Your rate compared with the minimum, per hour", formato: "moneda" },
  ],
});
