import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { euros } from "../lib/malta";

export default definirCalculadora({
  id: "mt.minimum-wage",
  mercado: "mt",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "mt.minimum-wage": "mapa",
    "mt.statutory-bonuses": "mapa",
  },
  campos: [
    { id: "edad", tipo: "opcion-dato", dato: "mt.minimum-wage", etiqueta: "Your age", porDefecto: "age-18-plus" },
    { id: "horas", tipo: "numero", etiqueta: "Hours you work a week", min: 0, max: 48, porDefecto: 40 },
    { id: "tuPaga", tipo: "moneda", etiqueta: "Your hourly pay (optional, to compare)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.horas <= 0) throw new ErrorEntrada("Enter the hours you work each week.", "horas");
    const semanalCompleto = enMapa(v["mt.minimum-wage"], entrada.edad);
    const hora = redondear(semanalCompleto / 40);
    const semanal = entrada.horas >= 40 ? semanalCompleto : redondear(hora * entrada.horas);
    const b = v["mt.statutory-bonuses"];
    const parte = Math.min(entrada.horas, 40) / 40;
    const bonos = redondear((2 * enMapa(b, "bonus") + 2 * enMapa(b, "allowance")) * parte);
    const anual = redondear(semanal * 52 + bonos);
    const observaciones: string[] = [];
    let diferencia: number | null = null;
    if (entrada.tuPaga !== null) {
      diferencia = redondear(entrada.tuPaga - hora);
      observaciones.push(
        diferencia < 0
          ? `You are paid ${euros(-diferencia)} an hour less than the national minimum for your age. You can raise it with your employer or with the Department for Industrial and Employment Relations.`
          : "Your pay is at or above the national minimum for your age.",
      );
    }
    if (entrada.horas > 40) observaciones.push("Hours above 40 a week are overtime and are paid at a higher rate, which is not included here.");
    observaciones.push("A Wage Regulation Order for your sector can set a higher minimum.");
    return { semanal, hora, mensual: redondear((semanal * 52) / 12), bonos, anual, diferencia, observaciones };
  },
  resultado: [
    { clave: "semanal", etiqueta: "Minimum wage a week", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Minimum hourly rate", formato: "moneda" },
    { clave: "mensual", etiqueta: "A month (52 weeks / 12)", formato: "moneda" },
    { clave: "bonos", etiqueta: "Statutory bonuses and weekly allowance a year", formato: "moneda" },
    { clave: "anual", etiqueta: "A year, with bonuses", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Your pay compared with the minimum, per hour", formato: "moneda" },
  ],
});
