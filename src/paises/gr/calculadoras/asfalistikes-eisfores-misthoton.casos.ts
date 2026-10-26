import { definirCasos } from "@/motor/calculo";
import asfalistikesEisforesMisthoton from "./asfalistikes-eisfores-misthoton";

const EFKA =
  "https://www.e-efka.gov.gr/sites/default/files/2024-12/%CE%95%CE%93%CE%9A.%2038_2024_%CE%9C%CE%95%CE%99%CE%A9%CE%A3%CE%97%20%CE%91%CE%A3%CE%A6.%20%CE%95%CE%99%CE%A3%CE%A6%CE%9F%CE%A1%CE%A9%CE%9D%20%CE%99%CE%94%CE%99%CE%A9%CE%A4.%20%CE%94%CE%99%CE%9A%CE%91%CE%99%CE%9F%CE%A5%202025%20%28971%CE%A546%CE%9C%CE%91%CE%A0%CE%A3-348%29.pdf";

export default definirCasos(asfalistikesEisforesMisthoton, [
  {
    nombre: "1.500 € μικτά, ΚΠΚ 101",
    origen: {
      tipo: "recalculado",
      url: EFKA,
      detalle: "Εργαζόμενος 13,37% = 200,55: υγεία 2,05% = 30,75, ΔΥΠΑ 1,65% = 24,75, σύνταξη 145,05. Εργοδότης 21,79% = 326,85. Σύνολο 527,40.",
    },
    fecha: "2026-10-24",
    entrada: { miktos: 1500, kpk: "101" },
    esperado: { ergazomenos: 200.55, ygeiaErgazomenou: 30.75, dypaErgazomenou: 24.75, syntaxiErgazomenou: 145.05, ergodotis: 326.85, synolo: 527.4 },
  },
  {
    nombre: "Όριο 2025: 8.000 € τον Ιούνιο του 2025",
    origen: { tipo: "recalculado", url: EFKA, detalle: "Όριο 2025: 7572,62. Εργαζόμενος 13,37% = 1012,46." },
    fecha: "2025-06-15",
    entrada: { miktos: 8000, kpk: "101" },
    esperado: { vasi: 7572.62, ergazomenos: 1012.46 },
  },
  {
    nombre: "Αποδοχές μηδέν",
    origen: { tipo: "recalculado", url: EFKA, detalle: "Χωρίς αποδοχές δεν υπάρχει υπολογισμός." },
    fecha: "2026-10-24",
    entrada: { miktos: 0, kpk: "101" },
    esperaError: true,
  },
]);
