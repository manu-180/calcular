import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ls.severance-pay",
  mercado: "ls",
  concepto: "indemnizacion-despido",
  slug: "severance-pay",
  estado: "publicado",
  requiere: {
    "ls.severance-weeks": "numero",
    "ls.hours-divisor": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Your monthly wage when the job ends", min: 0, porDefecto: 6000 },
    { id: "anios", tipo: "entero", etiqueta: "Completed years of continuous service", min: 0, max: 60, porDefecto: 5 },
    { id: "conducta", tipo: "si-no", etiqueta: "I was fairly dismissed for misconduct", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your monthly wage.", "salario");
    // La Ley no define la semana de salario de un mensualizado; se usa su propia proporción (s. 187):
    // salario por hora (mensual / 195) por las 45 horas de una semana normal.
    const semanal = redondear((entrada.salario / v["ls.hours-divisor"]["monthly"]) * v["ls.hours-divisor"]["weekly"]);
    const observaciones: string[] = [];
    let indemnizacion = 0;
    if (entrada.conducta) observaciones.push("A worker fairly dismissed for misconduct is not entitled to severance pay.");
    else if (entrada.anios < 1) observaciones.push("Severance pay starts once you have more than one year of continuous service.");
    else indemnizacion = redondear(semanal * v["ls.severance-weeks"] * entrada.anios);
    return { indemnizacion, semanal, semanas: entrada.conducta || entrada.anios < 1 ? 0 : v["ls.severance-weeks"] * entrada.anios, observaciones };
  },
  resultado: [
    { clave: "indemnizacion", etiqueta: "Severance pay", formato: "moneda", destacada: true },
    { clave: "semanas", etiqueta: "Weeks of wages", formato: "semanas" },
    { clave: "semanal", etiqueta: "One week's wages", formato: "moneda" },
  ],
});
