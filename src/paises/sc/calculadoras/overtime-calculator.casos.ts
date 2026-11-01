import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

const ORIGEN = "https://www.employment.gov.sc/e-library/acts-and-regulations/employment-acts-and-regulations/employment-conditions-of-employment-regulations-1991-si-34-of-1991/download";

export default definirCasos(calculadora, [
  {
    nombre: "Week-day overtime, standard worker",
    origen: { tipo: "oficial", url: ORIGEN, detalle: "Regulation 6(2)(a)(i): 1½ hours' pay for 1 hour's work on a week-day. 100 × 1.5 × 10 = 1,500." },
    fecha: "2026-10-29",
    entrada: { modo: "hourly", hora: 100, mensual: null, horasSemana: null, trabajador: "standard", dia: "weekday", horas: 10 },
    esperado: { total: 1500, tarifa: 150, factor: 1.5 },
  },
  {
    nombre: "Sunday overtime, standard worker",
    origen: { tipo: "oficial", url: ORIGEN, detalle: "Regulation 6(2)(a)(ii): 2 hours' pay for 1 hour's work on a holiday. 100 × 2 × 4 = 800." },
    fecha: "2026-10-29",
    entrada: { modo: "hourly", hora: 100, mensual: null, horasSemana: null, trabajador: "standard", dia: "sunday", horas: 4 },
    esperado: { total: 800, factor: 2 },
  },
  {
    nombre: "Public holiday, shift worker",
    origen: { tipo: "oficial", url: ORIGEN, detalle: "Regulation 6(2)(c)(ii): 3 hours' pay for 1 hour's work on a public holiday. 80 × 3 × 2 = 480." },
    fecha: "2026-10-29",
    entrada: { modo: "hourly", hora: 80, mensual: null, horasSemana: null, trabajador: "shift", dia: "public", horas: 2 },
    esperado: { total: 480, factor: 3 },
  },
  {
    nombre: "Monthly wage of SCR 8,000 on a 40 hour week",
    origen: { tipo: "recalculado", detalle: "Hourly pay 8,000 × 12 ÷ (52 × 40) = 46.1538. Rate 46.1538 × 1.5 × 5 hours = 346.15." },
    fecha: "2026-10-29",
    entrada: { modo: "monthly", hora: null, mensual: 8000, horasSemana: 40, trabajador: "standard", dia: "weekday", horas: 5 },
    esperado: { total: 346.15, base: 46.15 },
  },
]);
