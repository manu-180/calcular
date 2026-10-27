import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { nad } from "../lib/nomina";

export default definirCalculadora({
  id: "na.minimum-wage",
  mercado: "na",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "na.minimum-wage": "mapa",
    "na.weeks-per-month": "numero",
  },
  campos: [
    { id: "sector", tipo: "opcion-dato", etiqueta: "Type of work", dato: "na.minimum-wage", porDefecto: "general" },
    { id: "horas", tipo: "numero", etiqueta: "Ordinary hours a week", min: 1, max: 60, porDefecto: 45 },
    { id: "pago", tipo: "moneda", etiqueta: "Your pay a month (optional, to compare)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.horas <= 0) throw new ErrorEntrada("Enter the hours you work in a week.", "horas");
    const hora = enMapa(v["na.minimum-wage"], e.sector);
    const semanal = redondear(hora * e.horas);
    const mensual = redondear(semanal * v["na.weeks-per-month"]);
    let diferencia: number | null = null;
    const observaciones: string[] = [];
    if (e.pago !== null) {
      diferencia = redondear(e.pago - mensual);
      observaciones.push(
        diferencia >= 0
          ? `Your pay is ${nad(diferencia)} above the minimum for these hours.`
          : `Your pay is ${nad(-diferencia)} below the minimum for these hours.`,
      );
    }
    observaciones.push("Allowances, overtime, tips, bonuses and payments in kind such as food or housing do not count towards the minimum wage.");
    return { hora, semanal, mensual, diferencia, observaciones };
  },
  resultado: [
    { clave: "hora", etiqueta: "Minimum wage per hour", formato: "moneda", destacada: true },
    { clave: "semanal", etiqueta: "Minimum for a week", formato: "moneda" },
    { clave: "mensual", etiqueta: "Minimum for a month", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Your pay above (or below) the minimum", formato: "moneda" },
  ],
});
