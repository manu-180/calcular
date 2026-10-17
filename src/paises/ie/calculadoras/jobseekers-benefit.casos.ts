import { definirCasos } from "@/motor/calculo";
import calculadora from "./jobseekers-benefit";

export default definirCasos(calculadora, [
  {
    nombre: "€800 a week, 5+ years of PRSI",
    origen: { tipo: "recalculado", detalle: "60% = 480 capped at 450; 55% = 440 capped at 375; 50% = 400 capped at 300. 13 × (450 + 375 + 300) = 14,625." },
    fecha: "2026-10-14",
    entrada: { semanal: 800, contribuciones: "long" },
    esperado: { primeras: 450, segundas: 375, terceras: 300, total: 14625, semanas: 39 },
  },
  {
    nombre: "€500 a week, 5+ years of PRSI",
    origen: { tipo: "recalculado", detalle: "60% = 300, 55% = 275, 50% = 250. 13 × 825 = 10,725." },
    fecha: "2026-10-14",
    entrada: { semanal: 500, contribuciones: "long" },
    esperado: { primeras: 300, segundas: 275, terceras: 250, total: 10725 },
  },
  {
    nombre: "€200 a week gets the minimum",
    origen: { tipo: "recalculado", detalle: "60% = 120, 55% = 110, 50% = 100, all below the €125 minimum. 13 × 375 = 4,875." },
    fecha: "2026-10-14",
    entrada: { semanal: 200, contribuciones: "long" },
    esperado: { primeras: 125, segundas: 125, terceras: 125, total: 4875 },
  },
  {
    nombre: "€700 a week, 2 to 5 years of PRSI",
    origen: { tipo: "recalculado", detalle: "50% = 350 capped at 300 for 26 weeks = 7,800." },
    fecha: "2026-10-14",
    entrada: { semanal: 700, contribuciones: "short" },
    esperado: { primeras: 300, segundas: null, total: 7800, semanas: 26 },
  },
]);
