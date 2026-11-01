import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_SEMANAL, salarioSemanal } from "../lib/salarios";

export default definirCalculadora({
  id: "qa.domestic-worker-gratuity",
  mercado: "qa",
  concepto: "trabajo-domestico",
  slug: "domestic-worker-gratuity",
  estado: "publicado",
  requiere: {
    "qa.domestic-worker": "mapa",
    "qa.domestic-worker-hours": "numero",
    "qa.minimum-wage": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Monthly wage", min: 0, porDefecto: 1800 },
    { id: "anios", tipo: "numero", etiqueta: "Years of service that count", ayuda: "Only service from 12 September 2017, when the domestic workers law came into force, counts for the gratuity.", min: 0, max: 50, porDefecto: 4 },
    { id: "semanasContrato", tipo: "numero", etiqueta: "Weeks of wage per year in the contract", ayuda: "Leave the legal minimum unless the contract gives more.", min: 0, max: 52, porDefecto: 3 },
    { ...CAMPO_SEMANAL, ayuda: "The law sets the gratuity in weeks of wage but doesn't say how to convert a monthly wage. Use the method agreed with your employer." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.anios <= 0) throw new ErrorEntrada("Enter the years of service.", "anios");
    const minimo = enMapa(v["qa.domestic-worker"], "gratuity-weeks");
    const semanal = salarioSemanal(entrada.salario, entrada.metodoSemanal, "salario");
    const observaciones: string[] = [];
    let gratuidad = 0;
    if (entrada.anios < 1) observaciones.push("The gratuity is due after one full year of service.");
    else {
      if (entrada.semanasContrato < minimo) observaciones.push("A contract can't give less than the legal minimum, so the minimum is used.");
      gratuidad = redondear(Math.max(entrada.semanasContrato, minimo) * entrada.anios * semanal);
    }
    observaciones.push("The employer can deduct money the worker owes it. A worker who is dismissed for breaching the law or the contract can lose the gratuity for that year.");
    return { gratuidad, semanas: redondear(gratuidad > 0 ? Math.max(entrada.semanasContrato, minimo) * entrada.anios : 0), semanal: redondear(semanal), observaciones };
  },
  resultado: [
    { clave: "gratuidad", etiqueta: "End-of-service gratuity", formato: "moneda", destacada: true },
    { clave: "semanas", etiqueta: "Weeks of wage", formato: "semanas", decimales: 2 },
    { clave: "semanal", etiqueta: "Weekly wage", formato: "moneda" },
  ],
});
