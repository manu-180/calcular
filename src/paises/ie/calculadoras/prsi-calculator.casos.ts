import { definirCasos } from "@/motor/calculo";
import calculadora from "./prsi-calculator";

const SW14 = "https://assets.gov.ie/static/documents/cb168977/PRSI_C20260116_Contribution_Rates_and_User_Guide_-_SW_14_-_English_Version_-_January_2026_.pdf-web.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "€377 a week (SW14 example)",
    origen: { tipo: "oficial", url: SW14, detalle: "PRSI at 4.2% = 15.83. Credit 12.00 − (24.99 ÷ 6 = 4.17) = 7.83. Weekly charge 8.00." },
    fecha: "2026-06-15",
    entrada: { importe: 377, periodo: "week" },
    esperado: { bruto: 15.83, credito: 7.83, semana: 8 },
  },
  {
    nombre: "€355 a week (SW14 table)",
    origen: { tipo: "oficial", url: SW14, detalle: "One-sixth of 2.99 = 0.50, credit 11.50, PRSI at 4.2% 14.91, charge 3.41." },
    fecha: "2026-06-15",
    entrada: { importe: 355, periodo: "week" },
    esperado: { credito: 11.5, bruto: 14.91, semana: 3.41 },
  },
  {
    nombre: "€400 a week after 1 October 2026",
    origen: { tipo: "recalculado", detalle: "4.35% of 400 = 17.40. Credit 12 − (47.99 ÷ 6 = 8.00) = 4.00. Charge 13.40." },
    fecha: "2026-10-14",
    entrada: { importe: 400, periodo: "week" },
    esperado: { bruto: 17.4, credito: 4, semana: 13.4 },
  },
  {
    nombre: "€300 a week pays no employee PRSI",
    origen: { tipo: "recalculado", detalle: "Weekly pay up to €352 is subclass A0: no employee PRSI." },
    fecha: "2026-06-15",
    entrada: { importe: 300, periodo: "week" },
    esperado: { semana: 0, anio: 0 },
  },
  {
    nombre: "€4,000 a month after 1 October 2026",
    origen: { tipo: "recalculado", detalle: "4,000 × 12 ÷ 52 = 923.08 a week × 4.35% = 40.15. A year 40.15 × 52 = 2,087.80." },
    fecha: "2026-10-14",
    entrada: { importe: 4000, periodo: "month" },
    esperado: { semanal: 923.08, semana: 40.15, anio: 2087.8 },
  },
]);
