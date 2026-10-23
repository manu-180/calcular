import { definirCasos } from "@/motor/calculo";
import calculadora from "./unemployment-insurance";

const URL = "https://u.ae/en/information-and-services/jobs/Workplace-regulations/insurance/unemployment-insurance-scheme";

export default definirCasos(calculadora, [
  {
    nombre: "AED 12,000 basic: first category",
    origen: { tipo: "oficial", url: URL, detalle: "Below 16,000: premium up to 5 a month. Compensation 60% x 12,000 = 7,200 a month (under the 10,000 cap) for 3 months = 21,600." },
    fecha: "2026-10-18",
    entrada: { basico: 12000, meses: 12 },
    esperado: { prima: 5, mensual: 7200, total: 21600 },
  },
  {
    nombre: "AED 40,000 basic: capped at 20,000",
    origen: { tipo: "oficial", url: URL, detalle: "Above 16,000: premium up to 10. 60% x 40,000 = 24,000, capped at 20,000 a month." },
    fecha: "2026-10-18",
    entrada: { basico: 40000, meses: 24 },
    esperado: { prima: 10, mensual: 20000, total: 60000 },
  },
  {
    nombre: "Less than 12 months subscribed: no compensation yet",
    origen: { tipo: "oficial", url: URL, detalle: "At least 12 continuous months of subscription." },
    fecha: "2026-10-18",
    entrada: { basico: 12000, meses: 8 },
    esperado: { mensual: 0, prima: 5 },
  },
]);
