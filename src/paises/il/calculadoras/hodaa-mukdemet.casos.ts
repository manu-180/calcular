import { definirCasos } from "@/motor/calculo";
import calculadora from "./hodaa-mukdemet";

const URL = "https://www.gov.il/he/pages/notice-of-dismissal-and-resignation" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Mensual, 8 meses",
    origen: { tipo: "oficial", url: URL, detalle: "Un día por cada uno de los primeros 6 meses y 2,5 por cada mes siguiente: 6 + 5 = 11." },
    fecha: "2026-10-24",
    entrada: { sug: "maskoret", chodashim: 8 },
    esperado: { yamim: 11 },
  },
  {
    nombre: "Mensual, 11 meses",
    origen: { tipo: "oficial", url: URL, detalle: "6 + 5 x 2,5 = 18,5 (tope de tres semanas)." },
    fecha: "2026-10-24",
    entrada: { sug: "maskoret", chodashim: 11 },
    esperado: { yamim: 18.5 },
  },
  {
    nombre: "Mensual, un año",
    origen: { tipo: "oficial", url: URL, detalle: "Con 12 meses o más: un mes." },
    fecha: "2026-10-24",
    entrada: { sug: "maskoret", chodashim: 12 },
    esperado: { yamim: null, tkufa: "חודש ימים" },
  },
  {
    nombre: "Por hora, 15 meses",
    origen: { tipo: "oficial", url: URL, detalle: "Tabla del ministerio: mes 15 = 15 días." },
    fecha: "2026-10-24",
    entrada: { sug: "sachar", chodashim: 15 },
    esperado: { yamim: 15 },
  },
  {
    nombre: "Por hora, 36 meses",
    origen: { tipo: "oficial", url: URL, detalle: "Tabla del ministerio: mes 36 = 26 días." },
    fecha: "2026-10-24",
    entrada: { sug: "sachar", chodashim: 36 },
    esperado: { yamim: 26 },
  },
  {
    nombre: "Por hora, más de tres años",
    origen: { tipo: "oficial", url: URL, detalle: "Después del tercer año: un mes." },
    fecha: "2026-10-24",
    entrada: { sug: "sachar", chodashim: 40 },
    esperado: { yamim: null },
  },
]);
