import { definirCasos } from "@/motor/calculo";
import calculadora from "./illness-benefit";

const SW19 = "https://assets.gov.ie/static/documents/9c18b85f/20260520_Rates_of_Payment_Booklet_-_SW19_-_2026_May.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "€450 a week",
    origen: { tipo: "oficial", url: SW19, detalle: "SW19 2026: average weekly earnings of €300 or more get the personal rate of €254. 4 weeks = €1,016." },
    fecha: "2026-10-14",
    entrada: { semanal: 450, semanas: 4 },
    esperado: { tarifa: 254, total: 1016 },
  },
  {
    nombre: "€250 a week",
    origen: { tipo: "oficial", url: SW19, detalle: "SW19 2026: €220 to €299.99 gets €198.90." },
    fecha: "2026-10-14",
    entrada: { semanal: 250, semanas: 1 },
    esperado: { tarifa: 198.9 },
  },
  {
    nombre: "Exactly €150 a week",
    origen: { tipo: "oficial", url: SW19, detalle: "SW19 2026: €150 to €219.99 gets €163.70." },
    fecha: "2026-10-14",
    entrada: { semanal: 150, semanas: 1 },
    esperado: { tarifa: 163.7 },
  },
  {
    nombre: "€149.99 a week",
    origen: { tipo: "oficial", url: SW19, detalle: "SW19 2026: less than €150 gets €114." },
    fecha: "2026-10-14",
    entrada: { semanal: 149.99, semanas: 2 },
    esperado: { tarifa: 114, total: 228 },
  },
]);
