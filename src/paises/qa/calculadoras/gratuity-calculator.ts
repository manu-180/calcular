import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_SEMANAL, salarioSemanal } from "../lib/salarios";

export default definirCalculadora({
  id: "qa.gratuity-calculator",
  mercado: "qa",
  concepto: "indemnizacion-despido",
  slug: "gratuity-calculator",
  estado: "publicado",
  requiere: {
    "qa.gratuity-weeks": "numero",
    "qa.gratuity-min-service": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Last monthly basic salary", ayuda: "Basic salary only, without housing, transport or other allowances.", min: 0, porDefecto: 8000 },
    { id: "anios", tipo: "numero", etiqueta: "Years of continuous service", ayuda: "Use decimals for part of a year: 6 years and 6 months is 6.5.", min: 0, max: 60, porDefecto: 6.5 },
    { id: "semanasContrato", tipo: "numero", etiqueta: "Weeks of basic salary per year in your contract", ayuda: "Leave the legal minimum unless your contract gives more.", min: 0, max: 52, porDefecto: 3 },
    CAMPO_SEMANAL,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.anios <= 0) throw new ErrorEntrada("Enter your years of service.", "anios");
    const minimo = v["qa.gratuity-weeks"];
    const semanal = salarioSemanal(entrada.basico, entrada.metodoSemanal);
    const observaciones: string[] = [];
    if (entrada.anios < v["qa.gratuity-min-service"]) {
      observaciones.push("Gratuity is due only after one full year of service, so nothing is due yet.");
      return { gratuidad: 0, semanas: 0, semanal: redondear(semanal), observaciones };
    }
    const porAnio = Math.max(entrada.semanasContrato, minimo);
    if (entrada.semanasContrato < minimo) observaciones.push("Your contract can't give less than the legal minimum, so the minimum is used.");
    observaciones.push("An employer may deduct money you owe it. Dismissal for one of the serious reasons in Article 61 of the Labour Law loses the gratuity.");
    const semanas = porAnio * entrada.anios;
    return { gratuidad: redondear(semanas * semanal), semanas: redondear(semanas), semanal: redondear(semanal), observaciones };
  },
  resultado: [
    { clave: "gratuidad", etiqueta: "End-of-service gratuity", formato: "moneda", destacada: true },
    { clave: "semanas", etiqueta: "Weeks of basic salary", formato: "semanas", decimales: 2 },
    { clave: "semanal", etiqueta: "Weekly basic salary", formato: "moneda" },
  ],
});
